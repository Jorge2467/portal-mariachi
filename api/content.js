const express = require('express');
const pool = require('../db/pool');
const { authMiddleware, adminMiddleware } = require('./auth');

const router = express.Router();

// ===================================
// SONGS
// ===================================

// GET /api/content/songs - List songs (public)
router.get('/songs', async (req, res) => {
    const { style, featured, search, sort = 'score_rating', order = 'DESC', limit = 50, offset = 0 } = req.query;

    let where = [];
    let params = [];
    let i = 1;

    if (style) { where.push(`style = $${i++}`); params.push(style); }
    if (featured === 'true') { where.push('is_featured = true'); }
    if (search) { where.push(`(title ILIKE $${i++} OR composer ILIKE $${i++})`); params.push(`%${search}%`, `%${search}%`); }

    const allowedSorts = ['score_rating', 'title', 'created_at', 'play_count', 'vote_count'];
    const sortCol = allowedSorts.includes(sort) ? sort : 'score_rating';
    const sortOrder = order === 'ASC' ? 'ASC' : 'DESC';

    const whereClause = where.length > 0 ? 'WHERE ' + where.join(' AND ') : '';

    try {
        const countResult = await pool.query(`SELECT COUNT(*) FROM songs ${whereClause}`, params);
        const total = parseInt(countResult.rows[0].count);

        const result = await pool.query(
            `SELECT * FROM songs ${whereClause} ORDER BY ${sortCol} ${sortOrder} LIMIT $${i++} OFFSET $${i++}`,
            [...params, Math.min(parseInt(limit), 100), parseInt(offset)]
        );

        res.json({ songs: result.rows, total, limit: parseInt(limit), offset: parseInt(offset) });
    } catch (err) {
        console.error('Songs list error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// GET /api/content/songs/:id
router.get('/songs/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM songs WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Song not found' });
        res.json({ song: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// POST /api/content/songs (auth required)
router.post('/songs', authMiddleware, async (req, res) => {
    const { title, composer, style, year, description, lyrics, audio_url, score_url, video_url, badge } = req.body;

    if (!title) return res.status(400).json({ error: 'Title is required' });

    try {
        const result = await pool.query(
            `INSERT INTO songs (title, composer, style, year, description, lyrics, audio_url, score_url, video_url, badge, created_by)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
            [title, composer, style, year, description, lyrics, audio_url, score_url, video_url, badge, req.user.id]
        );
        res.status(201).json({ song: result.rows[0] });
    } catch (err) {
        console.error('Song create error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// PUT /api/content/songs/:id (admin)
router.put('/songs/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const fields = ['title','composer','style','year','description','lyrics','audio_url','score_url','video_url','badge','is_featured','thumbnail_url'];
    const updates = [];
    const params = [];
    let i = 1;

    for (const f of fields) {
        if (req.body[f] !== undefined) { updates.push(`${f} = $${i++}`); params.push(req.body[f]); }
    }

    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

    params.push(req.params.id);
    try {
        const result = await pool.query(
            `UPDATE songs SET ${updates.join(', ')} WHERE id = $${i} RETURNING *`, params
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Song not found' });
        res.json({ song: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// DELETE /api/content/songs/:id (admin)
router.delete('/songs/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM songs WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Song not found' });
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// POST /api/content/songs/:id/vote (auth)
router.post('/songs/:id/vote', authMiddleware, async (req, res) => {
    const { score } = req.body;
    if (!score || score < 1 || score > 10) return res.status(400).json({ error: 'Score must be 1-10' });

    try {
        await pool.query(
            `INSERT INTO song_votes (user_id, song_id, score) VALUES ($1, $2, $3)
             ON CONFLICT (user_id, song_id) DO UPDATE SET score = $3`,
            [req.user.id, req.params.id, score]
        );

        // Update aggregate score
        const avg = await pool.query(
            'SELECT AVG(score)::DECIMAL(3,1) as avg_score, COUNT(*) as count FROM song_votes WHERE song_id = $1',
            [req.params.id]
        );
        await pool.query(
            'UPDATE songs SET score_rating = $1, vote_count = $2 WHERE id = $3',
            [avg.rows[0].avg_score, avg.rows[0].count, req.params.id]
        );

        res.json({ score_rating: parseFloat(avg.rows[0].avg_score), vote_count: parseInt(avg.rows[0].count) });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// POST /api/content/songs/:id/favorite (auth)
router.post('/songs/:id/favorite', authMiddleware, async (req, res) => {
    try {
        const existing = await pool.query(
            'SELECT 1 FROM favorites WHERE user_id = $1 AND song_id = $2', [req.user.id, req.params.id]
        );

        if (existing.rows.length > 0) {
            await pool.query('DELETE FROM favorites WHERE user_id = $1 AND song_id = $2', [req.user.id, req.params.id]);
            res.json({ favorited: false });
        } else {
            await pool.query('INSERT INTO favorites (user_id, song_id) VALUES ($1, $2)', [req.user.id, req.params.id]);
            res.json({ favorited: true });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// ===================================
// COLLECTIONS
// ===================================

router.get('/collections', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT c.*, COUNT(cs.song_id) as song_count,
             (SELECT COUNT(*) FROM favorites f JOIN collection_songs cs2 ON f.song_id = cs2.song_id WHERE cs2.collection_id = c.id) as fav_count
             FROM collections c LEFT JOIN collection_songs cs ON c.id = cs.collection_id
             WHERE c.is_public = true GROUP BY c.id ORDER BY c.created_at DESC`
        );
        res.json({ collections: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

router.get('/collections/:id', async (req, res) => {
    try {
        const col = await pool.query('SELECT * FROM collections WHERE id = $1', [req.params.id]);
        if (col.rows.length === 0) return res.status(404).json({ error: 'Collection not found' });

        const songs = await pool.query(
            `SELECT s.* FROM songs s JOIN collection_songs cs ON s.id = cs.song_id
             WHERE cs.collection_id = $1 ORDER BY cs.position`, [req.params.id]
        );

        res.json({ collection: col.rows[0], songs: songs.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

router.post('/collections', authMiddleware, adminMiddleware, async (req, res) => {
    const { title, category, description, icon } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });

    try {
        const result = await pool.query(
            'INSERT INTO collections (title, category, description, icon, created_by) VALUES ($1,$2,$3,$4,$5) RETURNING *',
            [title, category, description, icon || '🎵', req.user.id]
        );
        res.status(201).json({ collection: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// ===================================
// MARIACHIS
// ===================================

router.get('/mariachis', async (req, res) => {
    const { search, limit = 50, offset = 0 } = req.query;
    let where = '';
    let params = [];

    if (search) { where = 'WHERE name ILIKE $1 OR location ILIKE $1'; params.push(`%${search}%`); }

    try {
        const result = await pool.query(
            `SELECT * FROM mariachis ${where} ORDER BY awards DESC, name ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
            [...params, Math.min(parseInt(limit), 100), parseInt(offset)]
        );
        const count = await pool.query(`SELECT COUNT(*) FROM mariachis ${where}`, params);
        res.json({ mariachis: result.rows, total: parseInt(count.rows[0].count) });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

router.post('/mariachis', authMiddleware, async (req, res) => {
    const { name, type, location, description, website, phone, email } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });

    try {
        const result = await pool.query(
            'INSERT INTO mariachis (name, type, location, description, website, phone, email, created_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
            [name, type, location, description, website, phone, email, req.user.id]
        );
        res.status(201).json({ mariachi: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// DELETE /api/content/mariachis/:id (admin)
router.delete('/mariachis/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM mariachis WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// ===================================
// BLOG
// ===================================

router.get('/blog', async (req, res) => {
    const { status = 'published', limit = 20, offset = 0 } = req.query;
    try {
        const result = await pool.query(
            `SELECT id, title, slug, excerpt, icon, author_name, cover_url, published_at, created_at
             FROM blog_posts WHERE status = $1 ORDER BY published_at DESC NULLS LAST LIMIT $2 OFFSET $3`,
            [status, Math.min(parseInt(limit), 50), parseInt(offset)]
        );
        const count = await pool.query('SELECT COUNT(*) FROM blog_posts WHERE status = $1', [status]);
        res.json({ posts: result.rows, total: parseInt(count.rows[0].count) });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

router.get('/blog/:slug', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1 AND status = $2', [req.params.slug, 'published']);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json({ post: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

router.post('/blog', authMiddleware, adminMiddleware, async (req, res) => {
    const { title, excerpt, content, icon, status = 'draft' } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    try {
        const result = await pool.query(
            `INSERT INTO blog_posts (title, slug, excerpt, content, icon, author_id, author_name, status, published_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
            [title, slug, excerpt, content, icon || '📖', req.user.id, req.user.name,
             status, status === 'published' ? new Date() : null]
        );
        res.status(201).json({ post: result.rows[0] });
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ error: 'Slug already exists' });
        res.status(500).json({ error: 'Internal error' });
    }
});

// ===================================
// COURSES
// ===================================

router.get('/courses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses ORDER BY rating DESC, student_count DESC');
        res.json({ courses: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

router.post('/courses', authMiddleware, adminMiddleware, async (req, res) => {
    const { title, instructor_name, description, icon, lessons, hours, is_free, price } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });

    try {
        const result = await pool.query(
            `INSERT INTO courses (title, instructor_name, description, icon, lessons, hours, is_free, price, created_by)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
            [title, instructor_name, description, icon || '🎵', lessons || 0, hours || 0, is_free !== false, price || 0, req.user.id]
        );
        res.status(201).json({ course: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// ===================================
// STATS (public)
// ===================================

router.get('/stats', async (req, res) => {
    try {
        const [songs, collections, mariachis, courses, users] = await Promise.all([
            pool.query('SELECT COUNT(*) FROM songs'),
            pool.query('SELECT COUNT(*) FROM collections'),
            pool.query('SELECT COUNT(*) FROM mariachis'),
            pool.query('SELECT COUNT(*) FROM courses'),
            pool.query('SELECT COUNT(*) FROM users')
        ]);

        res.json({
            songs: parseInt(songs.rows[0].count),
            collections: parseInt(collections.rows[0].count),
            mariachis: parseInt(mariachis.rows[0].count),
            courses: parseInt(courses.rows[0].count),
            users: parseInt(users.rows[0].count)
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

module.exports = router;
