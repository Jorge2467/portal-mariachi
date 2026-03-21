const express = require('express');
const pool = require('../db/pool');
const { authMiddleware, adminMiddleware } = require('./auth');

const router = express.Router();

// ===================================
// SONGS
// ===================================

// GET /api/content/songs - List songs (public)
router.get('/songs', async (req, res) => {
    const { style, featured, search, sort = 'score_rating', order = 'DESC', limit = 50, offset = 0, hasVideo, hasAudio } = req.query;

    let where = [];
    let params = [];
    let i = 1;

    if (style) { where.push(`style = $${i++}`); params.push(style); }
    if (featured === 'true') { where.push('is_featured = true'); }
    if (search) { where.push(`(title ILIKE $${i++} OR composer ILIKE $${i++})`); params.push(`%${search}%`, `%${search}%`); }
    if (hasVideo === 'true') { where.push("video_url IS NOT NULL AND video_url != ''"); }
    if (hasAudio === 'true') { where.push("audio_url IS NOT NULL AND audio_url != ''"); }

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

// ===================================
// WIKI & COMMENTS (Blog)
// ===================================

// Get comments for a post
router.get('/blog/:slug/comments', async (req, res) => {
    try {
        const postRes = await pool.query('SELECT id FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (postRes.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
        
        const result = await pool.query(
            `SELECT c.*, u.name as user_name FROM blog_comments c 
             JOIN users u ON c.user_id = u.id 
             WHERE c.post_id = $1 AND c.status = 'approved' 
             ORDER BY c.created_at DESC`,
            [postRes.rows[0].id]
        );
        res.json({ comments: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// Post a comment
router.post('/blog/:slug/comments', authMiddleware, async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Content required' });
    
    try {
        const postRes = await pool.query('SELECT id FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (postRes.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
        
        // --- AI Moderation ---
        if (process.env.GEMINI_API_KEY) {
            const { GoogleGenAI } = require('@google/genai');
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
            const moderationPrompt = `Eres un moderador estricto para un foro de cultura mariachi y música tradicional.
Analiza este comentario de un usuario. Si contiene groserías, palabras altisonantes explícitas (ej: "coño", "mierda", "puto", etc.), insultos directos, discursos de odio o spam malicioso, DEBES rechazarlo.
Si es un comentario respetuoso, neutro o una crítica constructiva sin palabras tóxicas, aprúebalo.
Devuelve EXACTAMENTE Y ÚNICAMENTE un JSON con este formato: { "decision": "approved" | "rejected" }`;

            const modRes = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                config: {
                    systemInstruction: moderationPrompt,
                    temperature: 0.1,
                    responseMimeType: 'application/json'
                },
                contents: content
            });

            const rawText = modRes.text || '';
            try {
                const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                const evalData = JSON.parse(cleaned);
                if (evalData.decision === 'rejected') {
                    return res.status(400).json({ error: 'Comentario rechazado por lenguaje inapropiado u ofensivo. Por favor, mantén el respeto en la comunidad.' });
                }
            } catch (e) {
                console.error('Moderation JSON fail:', rawText);
                // Si falla la moderación IA por parseo, por seguridad lo omitimos o lo marcamos como pendiente.
                // En este caso lo dejamos pasar para no bloquear la app si Gemini falla, 
                // pero lo ideal es tener 'pending_moderation'. Lo dejaremos pasar por ahora.
            }
        }
        // ---------------------

        const result = await pool.query(
            `INSERT INTO blog_comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *`,
            [postRes.rows[0].id, req.user.id, content]
        );
        res.json({ success: true, comment: result.rows[0] });
    } catch (err) {
        console.error('Comment error:', err);
        res.status(500).json({ error: 'Internal error' });
    }
});

// Admin ONLY: Get all pending corrections
router.get('/admin/corrections', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT c.*, p.title as post_title, p.slug as post_slug, u.name as user_name 
             FROM blog_corrections c
             JOIN blog_posts p ON c.post_id = p.id
             JOIN users u ON c.user_id = u.id
             WHERE c.admin_status = 'pending'
             ORDER BY c.created_at DESC`
        );
        res.json({ corrections: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// Admin ONLY: Approve a wiki correction
router.put('/admin/corrections/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await pool.query('BEGIN');
        const cRes = await pool.query(
            `UPDATE blog_corrections SET admin_status = 'approved', updated_at = NOW() 
             WHERE id = $1 AND admin_status = 'pending' RETURNING *`, 
            [req.params.id]
        );
        if (cRes.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ error: 'Correction not found or already processed' });
        }
        
        const correction = cRes.rows[0];
        // Apply the edit to the blog post
        await pool.query(
            `UPDATE blog_posts SET content = $1, updated_at = NOW() WHERE id = $2`,
            [correction.proposed_content, correction.post_id]
        );
        await pool.query('COMMIT');
        
        res.json({ success: true });
    } catch (err) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: 'Internal error' });
    }
});


// Admin ONLY: get all blog posts regardless of status
router.get('/admin/blog', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, title, slug, excerpt, icon, author_name, status, is_ai_generated, published_at, created_at
             FROM blog_posts ORDER BY created_at DESC LIMIT 100`
        );
        res.json({ posts: result.rows, total: result.rows.length });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// Admin ONLY: toggle post status (draft <-> published)
router.put('/blog/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
    const { status } = req.body;
    if (status !== 'published' && status !== 'draft') {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const published_at = status === 'published' ? new Date() : null;
        const result = await pool.query(
            `UPDATE blog_posts SET status = $1, published_at = $2 WHERE id = $3 RETURNING *`,
            [status, published_at, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json({ success: true, post: result.rows[0] });
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

// ===================================
// RECOMMENDATIONS
// ===================================

router.get('/recommendations', async (req, res) => {
    try {
        if (!req.user) {
            // No auth, fallback to top rated
            const fallback = await pool.query('SELECT * FROM songs ORDER BY score_rating DESC LIMIT 5');
            return res.json({ recommendations: fallback.rows });
        }

        // 1. Obtener el promedio de los embeddings de las canciones favoritas del usuario
        const userVectorResult = await pool.query(`
            SELECT avg(s.embedding) as user_profile_embedding
            FROM songs s
            JOIN favorites f ON s.id = f.song_id
            WHERE f.user_id = $1 AND s.embedding IS NOT NULL
        `, [req.user.id]);

        const userProfileEmbedding = userVectorResult.rows[0]?.user_profile_embedding;

        let sql;
        let params = [req.user.id];

        if (userProfileEmbedding) {
            // 2a. Si tiene preferencias con embeddings, buscar basándose en similitud de coseno + popularidad
            // <=> es la distancia coseno en pgvector (0 es idéntico, 2 es opuesto)
            sql = `
                SELECT s.*,
                (
                    (1.0 - (s.embedding <=> $2::vector)) * 5.0 + 
                    (s.score_rating * 0.3) + 
                    (s.play_count * 0.05) + 
                    (s.vote_count * 0.15)
                ) as recommendation_score
                FROM songs s
                WHERE s.id NOT IN (
                    SELECT song_id FROM favorites WHERE user_id = $1
                ) AND s.embedding IS NOT NULL
                ORDER BY recommendation_score DESC LIMIT 5
            `;
            // userProfileEmbedding can be passed directly as string format '[0.1, 0.2, ...]'
            // pgvector's avg() returns it in the correct string format automatically
            params.push(userProfileEmbedding);
        } else {
            // 2b. Si no tiene favoritos o no tienen embeddings, usar el score de popularidad general
            sql = `
                SELECT s.*, 
                (s.score_rating * 0.5 + s.play_count * 0.1 + s.vote_count * 0.4) as recommendation_score
                FROM songs s
                WHERE s.id NOT IN (
                    SELECT song_id FROM favorites WHERE user_id = $1
                )
                ORDER BY recommendation_score DESC LIMIT 5
            `;
        }

        const result = await pool.query(sql, params);
        
        // Fallback por si la query no devuelve nada (ej. el usuario ha marcado como favoritas todas las canciones)
        if (result.rows.length === 0) {
            const fallback = await pool.query('SELECT * FROM songs ORDER BY score_rating DESC LIMIT 5');
            return res.json({ recommendations: fallback.rows });
        }

        res.json({ recommendations: result.rows });
    } catch (err) {
        console.error('Recommendations error:', err);
        // Fallback robusto en caso de error
        try {
            const fallback = await pool.query('SELECT * FROM songs ORDER BY score_rating DESC LIMIT 5');
            res.json({ recommendations: fallback.rows });
        } catch (e) {
            res.status(500).json({ error: 'Internal error on recommendations' });
        }
    }
});

// ===================================
// SECURE MARIACHI DIRECTORY (Anti-Scraping)
// ===================================
const rateLimit = require('express-rate-limit');

// Rate limiter specifically for revealing contact info
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 contact reveals per 15 minutes per IP
    message: { error: 'Por seguridad anti-scraping, has alcanzado el límite de consultas de contacto. Intenta de nuevo en 15 minutos.' }
});

// 1. Get Public Directory (No contact info exposed)
router.get('/directory', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, group_name, members_count, location, image_url, video_url, bio, repertoire, technical_requirements, created_at
             FROM mariachi_directory 
             WHERE status = 'approved' 
             ORDER BY created_at DESC`
        );
        res.json({ directory: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// 2. Register Group (Public form but needs user account)
router.post('/directory', authMiddleware, async (req, res) => {
    const { group_name, members_count, location, image_url, video_url, bio, repertoire, technical_requirements, contact_name, whatsapp, email } = req.body;
    if (!group_name || !whatsapp) return res.status(400).json({ error: 'Nombre de agrupación y WhatsApp son obligatorios' });

    try {
        const result = await pool.query(
            `INSERT INTO mariachi_directory 
             (user_id, group_name, members_count, location, image_url, video_url, bio, repertoire, technical_requirements, contact_name, whatsapp, email, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'pending') RETURNING id`,
            [req.user.id, group_name, members_count || 1, location, image_url, video_url, bio, repertoire, technical_requirements, contact_name, whatsapp, email]
        );
        res.status(201).json({ success: true, message: 'Registro enviado. Pendiente de aprobación del Congreso.' });
    } catch (err) {
        console.error('Directory register error:', err);
        res.status(500).json({ error: 'Error al procesar el registro' });
    }
});

// 3. SECURE REVEAL: Get Contact Info (Authenticated + Rate Limited)
router.get('/directory/:id/contact', authMiddleware, contactLimiter, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT contact_name, whatsapp, email 
             FROM mariachi_directory 
             WHERE id = $1 AND status = 'approved'`,
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Mariachi no encontrado o no aprobado' });
        
        res.json({ contact: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// 4. ADMIN ONLY: Get all grouped (pending/approved) with full info
router.get('/admin/directory', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM mariachi_directory ORDER BY created_at DESC`);
        res.json({ directory: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// 5. ADMIN ONLY: Create new entry directly (bypasses pending queue)
router.post('/admin/directory', authMiddleware, adminMiddleware, async (req, res) => {
    const { group_name, members_count, location, image_url, video_url, bio, repertoire, technical_requirements, contact_name, whatsapp, email, status } = req.body;
    if (!group_name) return res.status(400).json({ error: 'Nombre de agrupación es obligatorio' });

    try {
        const result = await pool.query(
            `INSERT INTO mariachi_directory 
             (user_id, group_name, members_count, location, image_url, video_url, bio, repertoire, technical_requirements, contact_name, whatsapp, email, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
            [req.user.id, group_name, members_count || 1, location, image_url, video_url, bio, repertoire, technical_requirements, contact_name, whatsapp, email, status || 'approved']
        );
        res.status(201).json({ success: true, id: result.rows[0].id });
    } catch (err) {
        console.error('Admin directory create error:', err);
        res.status(500).json({ error: 'Error al crear el registro' });
    }
});

// 6. ADMIN ONLY: Full edit of any directory entry
router.put('/admin/directory/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { group_name, members_count, location, image_url, video_url, bio, repertoire, technical_requirements, contact_name, whatsapp, email, status } = req.body;
    if (!group_name) return res.status(400).json({ error: 'Nombre de agrupación es obligatorio' });

    try {
        const result = await pool.query(
            `UPDATE mariachi_directory SET
             group_name = $1, members_count = $2, location = $3, image_url = $4, video_url = $5,
             bio = $6, repertoire = $7, technical_requirements = $8, contact_name = $9,
             whatsapp = $10, email = $11, status = $12, updated_at = NOW()
             WHERE id = $13 RETURNING id`,
            [group_name, members_count || 1, location, image_url, video_url, bio, repertoire, technical_requirements, contact_name, whatsapp, email, status || 'approved', req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
        res.json({ success: true });
    } catch (err) {
        console.error('Admin directory edit error:', err);
        res.status(500).json({ error: 'Error al editar el registro' });
    }
});

// 7. ADMIN ONLY: Status-only update (approve/reject)
router.put('/admin/directory/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
    const { status } = req.body; // 'approved' or 'rejected'
    if (!['approved', 'rejected', 'pending'].includes(status)) return res.status(400).json({ error: 'Invalid status' });

    try {
        const result = await pool.query(
            `UPDATE mariachi_directory SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id`,
            [status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
        res.json({ success: true, status });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// ===================================
// PARTITURAS
// ===================================

// GET /api/content/partituras
router.get('/partituras', async (req, res) => {
    const { search, style, file_type, sort = 'title', order = 'ASC', limit = 50, offset = 0 } = req.query;
    let where = [];
    let params = [];
    let i = 1;

    if (search) {
        where.push(`(LOWER(title) LIKE $${i++} OR LOWER(composer) LIKE $${i++})`);
        params.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`);
    }
    if (style) { where.push(`style = $${i++}`); params.push(style); }
    if (file_type) { where.push(`file_type = $${i++}`); params.push(file_type); }

    const allowed = ['title', 'composer', 'style', 'created_at', 'file_type'];
    const sortCol = allowed.includes(sort) ? sort : 'title';
    const sortOrd = order === 'DESC' ? 'DESC' : 'ASC';
    const wClause = where.length ? 'WHERE ' + where.join(' AND ') : '';

    try {
        const cnt = await pool.query(`SELECT COUNT(*) FROM partituras ${wClause}`, params);
        const rows = await pool.query(
            `SELECT * FROM partituras ${wClause} ORDER BY LOWER(${sortCol}) ${sortOrd} LIMIT $${i++} OFFSET $${i++}`,
            [...params, Math.min(parseInt(limit), 100), parseInt(offset)]
        );
        res.json({ partituras: rows.rows, total: parseInt(cnt.rows[0].count) });
    } catch (err) {
        console.error('Partituras list error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// GET /api/content/partituras/:id
router.get('/partituras/:id', async (req, res) => {
    try {
        const r = await pool.query('SELECT * FROM partituras WHERE id=$1', [req.params.id]);
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        res.json({ partitura: r.rows[0] });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// PUT /api/content/partituras/:id (admin)
router.put('/partituras/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const fields = ['title', 'composer', 'style', 'instrument', 'tonality', 'description'];
    const updates = [];
    const params = [];
    let i = 1;
    for (const f of fields) {
        if (req.body[f] !== undefined) { updates.push(`${f} = $${i++}`); params.push(req.body[f]); }
    }
    if (!updates.length) return res.status(400).json({ error: 'No fields to update' });
    params.push(req.params.id);
    try {
        const r = await pool.query(
            `UPDATE partituras SET ${updates.join(', ')} WHERE id=$${i} RETURNING *`, params
        );
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        res.json({ partitura: r.rows[0] });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// DELETE /api/content/partituras/:id (admin)
const fs = require('fs');
const path = require('path');
router.delete('/partituras/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const r = await pool.query('SELECT * FROM partituras WHERE id=$1', [req.params.id]);
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        const partitura = r.rows[0];
        // Delete physical file
        const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');
        const filePath = path.join(UPLOAD_DIR, partitura.file_url.replace(/^\/uploads\//, ''));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        await pool.query('DELETE FROM partituras WHERE id=$1', [req.params.id]);
        res.json({ deleted: true });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// ===================================
// GALLERY
// ===================================
const fsG = require('fs');
const pathG = require('path');

// GET /api/content/gallery
router.get('/gallery', async (req, res) => {
    const { search, category, sort = 'created_at', order = 'DESC', limit = 50, offset = 0 } = req.query;
    let where = [];
    let params = [];
    let i = 1;

    if (search) { where.push(`LOWER(title) LIKE $${i++}`); params.push(`%${search.toLowerCase()}%`); }
    if (category && category !== 'all') { where.push(`category = $${i++}`); params.push(category); }

    const allowed = ['title', 'created_at', 'category'];
    const sortCol = allowed.includes(sort) ? sort : 'created_at';
    const sortOrd = order === 'ASC' ? 'ASC' : 'DESC';
    const wClause = where.length ? 'WHERE ' + where.join(' AND ') : '';

    try {
        const cnt = await pool.query(`SELECT COUNT(*) FROM gallery ${wClause}`, params);
        const rows = await pool.query(
            `SELECT g.*, u.name as uploader_name FROM gallery g
             LEFT JOIN users u ON g.uploaded_by = u.id
             ${wClause} ORDER BY g.${sortCol} ${sortOrd} LIMIT $${i++} OFFSET $${i++}`,
            [...params, Math.min(parseInt(limit), 100), parseInt(offset)]
        );
        res.json({ images: rows.rows, total: parseInt(cnt.rows[0].count) });
    } catch (err) {
        console.error('Gallery list error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// GET /api/content/gallery/categories
router.get('/gallery/categories', async (req, res) => {
    try {
        const r = await pool.query(`SELECT DISTINCT category, COUNT(*) as count FROM gallery WHERE category IS NOT NULL GROUP BY category ORDER BY count DESC`);
        res.json({ categories: r.rows });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// PUT /api/content/gallery/:id (auth, own image or admin)
router.put('/gallery/:id', authMiddleware, async (req, res) => {
    const { title, category, description } = req.body;
    const updates = [];
    const params = [];
    let i = 1;
    if (title !== undefined) { updates.push(`title=$${i++}`); params.push(title); }
    if (category !== undefined) { updates.push(`category=$${i++}`); params.push(category); }
    if (description !== undefined) { updates.push(`description=$${i++}`); params.push(description); }
    if (!updates.length) return res.status(400).json({ error: 'Nothing to update' });
    params.push(req.params.id);
    try {
        const check = await pool.query('SELECT uploaded_by FROM gallery WHERE id=$1', [req.params.id]);
        if (!check.rows.length) return res.status(404).json({ error: 'Not found' });
        const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';
        if (!isAdmin && check.rows[0].uploaded_by !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
        const r = await pool.query(`UPDATE gallery SET ${updates.join(', ')} WHERE id=$${i} RETURNING *`, params);
        res.json({ image: r.rows[0] });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// DELETE /api/content/gallery/:id (own image or admin)
router.delete('/gallery/:id', authMiddleware, async (req, res) => {
    try {
        const r = await pool.query('SELECT * FROM gallery WHERE id=$1', [req.params.id]);
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        const img = r.rows[0];
        const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';
        if (!isAdmin && img.uploaded_by !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
        const UPLOAD_DIR = process.env.UPLOAD_DIR || pathG.join(__dirname, '..', 'uploads');
        const filePath = pathG.join(UPLOAD_DIR, img.image_url.replace(/^\/uploads\//, ''));
        if (fsG.existsSync(filePath)) fsG.unlinkSync(filePath);
        await pool.query('DELETE FROM gallery WHERE id=$1', [req.params.id]);
        res.json({ deleted: true });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// ===================================
// ALBUMS  (Gallery Albums with Admin Approval)
// ===================================

// GET /api/content/albums  (public: approved only | auth: own pending albums too | admin: all)
router.get('/albums', async (req, res) => {
    const { status, limit = 20, offset = 0 } = req.query;
    let where = [];
    let params = [];
    let i = 1;

    try {
        const isReq = req.headers.authorization;
        let userId = null;
        let isAdmin = false;
        if (isReq) {
            try {
                const jwt = require('jsonwebtoken');
                const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
                userId = decoded.id || decoded.userId;
                isAdmin = decoded.role === 'admin' || decoded.role === 'superadmin';
            } catch {}
        }

        if (isAdmin && status) {
            where.push(`a.status = $${i++}`); params.push(status);
        } else if (isAdmin) {
            // admin sees all
        } else if (userId) {
            // auth user: approved OR own
            where.push(`(a.status = 'approved' OR a.created_by = $${i++})`); params.push(userId);
        } else {
            where.push(`a.status = 'approved'`);
        }

        const wClause = where.length ? 'WHERE ' + where.join(' AND ') : '';
        const cnt = await pool.query(`SELECT COUNT(*) FROM albums a ${wClause}`, params);
        const rows = await pool.query(
            `SELECT a.*, u.name as creator_name,
                (SELECT COUNT(*) FROM album_photos ap WHERE ap.album_id = a.id) as photo_count
             FROM albums a LEFT JOIN users u ON a.created_by = u.id
             ${wClause} ORDER BY a.created_at DESC LIMIT $${i++} OFFSET $${i++}`,
            [...params, Math.min(parseInt(limit), 100), parseInt(offset)]
        );
        res.json({ albums: rows.rows, total: parseInt(cnt.rows[0].count) });
    } catch (err) {
        console.error('Albums list error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// GET /api/content/albums/:id  (with photos, public if approved)
router.get('/albums/:id', async (req, res) => {
    try {
        const r = await pool.query(
            `SELECT a.*, u.name as creator_name FROM albums a
             LEFT JOIN users u ON a.created_by = u.id WHERE a.id=$1`, [req.params.id]
        );
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        const album = r.rows[0];
        const photos = await pool.query(
            `SELECT g.* FROM gallery g
             INNER JOIN album_photos ap ON ap.photo_id = g.id
             WHERE ap.album_id = $1 ORDER BY ap.position ASC, ap.added_at ASC`,
            [req.params.id]
        );
        res.json({ album, photos: photos.rows });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// POST /api/content/albums  (auth users — creates as pending)
router.post('/albums', authMiddleware, async (req, res) => {
    const { title, description, cover_url } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ error: 'Title is required' });
    try {
        const r = await pool.query(
            `INSERT INTO albums (title, description, cover_url, status, created_by)
             VALUES ($1,$2,$3,'pending',$4) RETURNING *`,
            [title.trim(), description || null, cover_url || null, req.user.id]
        );
        res.status(201).json({ album: r.rows[0], message: 'Álbum enviado para aprobación' });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// PUT /api/content/albums/:id  — edit metadata (owner or admin)
router.put('/albums/:id', authMiddleware, async (req, res) => {
    try {
        const check = await pool.query('SELECT * FROM albums WHERE id=$1', [req.params.id]);
        if (!check.rows.length) return res.status(404).json({ error: 'Not found' });
        const album = check.rows[0];
        const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';
        if (!isAdmin && album.created_by !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

        const { title, description, cover_url } = req.body;
        const updates = [];
        const params = [];
        let i = 1;
        if (title) { updates.push(`title=$${i++}`); params.push(title); }
        if (description !== undefined) { updates.push(`description=$${i++}`); params.push(description); }
        if (cover_url !== undefined) { updates.push(`cover_url=$${i++}`); params.push(cover_url); }
        updates.push(`updated_at=NOW()`);
        params.push(req.params.id);
        const r = await pool.query(`UPDATE albums SET ${updates.join(',')} WHERE id=$${i} RETURNING *`, params);
        res.json({ album: r.rows[0] });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// POST /api/content/albums/:id/review  — admin approve/reject
router.post('/albums/:id/review', authMiddleware, adminMiddleware, async (req, res) => {
    const { action, reason } = req.body;  // action: 'approve' | 'reject'
    if (!['approve', 'reject'].includes(action)) return res.status(400).json({ error: 'action must be approve or reject' });
    try {
        const status = action === 'approve' ? 'approved' : 'rejected';
        const r = await pool.query(
            `UPDATE albums SET status=$1, reject_reason=$2, reviewed_by=$3, reviewed_at=NOW(), updated_at=NOW()
             WHERE id=$4 RETURNING *`,
            [status, reason || null, req.user.id, req.params.id]
        );
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        res.json({ album: r.rows[0] });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// DELETE /api/content/albums/:id  (owner or admin)
router.delete('/albums/:id', authMiddleware, async (req, res) => {
    try {
        const r = await pool.query('SELECT * FROM albums WHERE id=$1', [req.params.id]);
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';
        if (!isAdmin && r.rows[0].created_by !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
        await pool.query('DELETE FROM albums WHERE id=$1', [req.params.id]);
        res.json({ deleted: true });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// POST /api/content/albums/:id/photos  — add photos to album (owner or admin)
router.post('/albums/:id/photos', authMiddleware, async (req, res) => {
    const { photo_ids } = req.body;  // array of gallery IDs
    if (!Array.isArray(photo_ids) || !photo_ids.length) return res.status(400).json({ error: 'photo_ids array required' });
    try {
        const check = await pool.query('SELECT created_by FROM albums WHERE id=$1', [req.params.id]);
        if (!check.rows.length) return res.status(404).json({ error: 'Album not found' });
        const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';
        if (!isAdmin && check.rows[0].created_by !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
        let added = 0;
        for (const pid of photo_ids) {
            try {
                await pool.query(
                    `INSERT INTO album_photos (album_id, photo_id) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
                    [req.params.id, pid]
                );
                added++;
            } catch {}
        }
        res.json({ added });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});

// DELETE /api/content/albums/:id/photos/:photoId  — remove photo from album
router.delete('/albums/:id/photos/:photoId', authMiddleware, async (req, res) => {
    try {
        const check = await pool.query('SELECT created_by FROM albums WHERE id=$1', [req.params.id]);
        if (!check.rows.length) return res.status(404).json({ error: 'Album not found' });
        const isAdmin = req.user.role === 'admin' || req.user.role === 'superadmin';
        if (!isAdmin && check.rows[0].created_by !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
        await pool.query('DELETE FROM album_photos WHERE album_id=$1 AND photo_id=$2', [req.params.id, req.params.photoId]);
        res.json({ removed: true });
    } catch (err) { res.status(500).json({ error: 'Internal error' }); }
});


// ===================================
// ANUNCIOS CRUD
// ===================================
router.get('/anuncios', async (req, res) => {
    try {
        const { category, status = 'approved', limit = 20, offset = 0, search = '' } = req.query;
        const session = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;
        let userRole = null; let userId = null;
        if (session) {
            try {
                const { verifyToken } = require('./auth');
                const dec = verifyToken(session);
                userRole = dec.role; userId = dec.userId;
            } catch(_) {}
        }
        const isAdmin = userRole === 'super_admin' || userRole === 'admin';
        let whereStatus = isAdmin ? (status && status !== 'all' ? ` AND a.status = $1` : `` ) : ` AND a.status = 'approved'`;
        const params = [];
        if (isAdmin && status && status !== 'all') params.push(status);
        const catClause  = category ? ` AND a.category = $${params.length + 1}` : ''  ; if (category) params.push(category);
        const srchClause = search   ? ` AND (a.title ILIKE $${params.length + 1} OR a.description ILIKE $${params.length + 1})` : ''; if (search) params.push('%' + search + '%');
        const limitClause = ` LIMIT $${params.length + 1}`; params.push(parseInt(limit) || 20);
        const offsetClause = ` OFFSET $${params.length + 1}`; params.push(parseInt(offset) || 0);
        const sql = `SELECT a.*, u.name as creator_name FROM anuncios a LEFT JOIN users u ON a.created_by = u.id WHERE 1=1 ${whereStatus} ${catClause} ${srchClause} ORDER BY a.created_at DESC ${limitClause} ${offsetClause}`;
        const countSql = `SELECT COUNT(*) FROM anuncios a WHERE 1=1 ${whereStatus} ${catClause}`;
        const [rows, count] = await Promise.all([
            pool.query(sql, params),
            pool.query(countSql, params.slice(0, params.length - 2))
        ]);
        res.json({ anuncios: rows.rows, total: parseInt(count.rows[0].count) });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/anuncios/:id', async (req, res) => {
    try {
        const r = await pool.query('SELECT a.*, u.name as creator_name, u.avatar_url as creator_avatar FROM anuncios a LEFT JOIN users u ON a.created_by = u.id WHERE a.id = $1', [req.params.id]);
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        res.json({ anuncio: r.rows[0] });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/anuncios', authMiddleware, async (req, res) => {
    try {
        const { category, title, description, price, currency, contact_name, contact_email, contact_phone, contact_whatsapp, image_url, location, expires_days } = req.body;
        if (!category || !title) return res.status(400).json({ error: 'category y title son requeridos' });
        const expires_at = expires_days ? new Date(Date.now() + expires_days * 24 * 3600000) : null;
        const r = await pool.query(
            `INSERT INTO anuncios (category,title,description,price,currency,contact_name,contact_email,contact_phone,contact_whatsapp,image_url,location,expires_at,created_by,status)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'pending') RETURNING *`,
            [category,title,description,price||null,currency||'EUR',contact_name,contact_email,contact_phone,contact_whatsapp,image_url||null,location,expires_at,req.user.userId]
        );
        res.status(201).json({ anuncio: r.rows[0] });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/anuncios/:id', authMiddleware, async (req, res) => {
    try {
        const existing = await pool.query('SELECT * FROM anuncios WHERE id=$1', [req.params.id]);
        if (!existing.rows.length) return res.status(404).json({ error: 'Not found' });
        const a = existing.rows[0];
        const isAdmin = req.user.role === 'super_admin' || req.user.role === 'admin';
        if (a.created_by !== req.user.userId && !isAdmin) return res.status(403).json({ error: 'Forbidden' });
        const flds = ['title','description','price','currency','contact_name','contact_email','contact_phone','contact_whatsapp','image_url','location'];
        const sets = []; const vals = [];
        flds.forEach(k => { if (req.body[k] !== undefined) { vals.push(req.body[k]); sets.push(`${k}=$${vals.length}`); } });
        if (!sets.length) return res.json({ anuncio: a });
        vals.push(req.params.id);
        const r = await pool.query(`UPDATE anuncios SET ${sets.join(',')},updated_at=NOW() WHERE id=$${vals.length} RETURNING *`, vals);
        res.json({ anuncio: r.rows[0] });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/anuncios/:id/review', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { action, reason } = req.body;
        if (!['approve','reject'].includes(action)) return res.status(400).json({ error: 'action must be approve or reject' });
        const status = action === 'approve' ? 'approved' : 'rejected';
        const r = await pool.query(
            `UPDATE anuncios SET status=$1, reject_reason=$2, reviewed_by=$3, reviewed_at=NOW(), updated_at=NOW() WHERE id=$4 RETURNING *`,
            [status, reason||null, req.user.userId, req.params.id]
        );
        if (!r.rows.length) return res.status(404).json({ error: 'Not found' });
        res.json({ anuncio: r.rows[0] });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/anuncios/:id', authMiddleware, async (req, res) => {
    try {
        const existing = await pool.query('SELECT * FROM anuncios WHERE id=$1', [req.params.id]);
        if (!existing.rows.length) return res.status(404).json({ error: 'Not found' });
        const isAdmin = req.user.role === 'super_admin' || req.user.role === 'admin';
        if (existing.rows[0].created_by !== req.user.userId && !isAdmin) return res.status(403).json({ error: 'Forbidden' });
        await pool.query('DELETE FROM anuncios WHERE id=$1', [req.params.id]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
