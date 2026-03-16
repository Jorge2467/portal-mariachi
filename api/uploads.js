const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const pool = require('../db/pool');
const { authMiddleware, adminMiddleware } = require('./auth');

const router = express.Router();

// Upload directory - Railway volume mounts here
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');

// Ensure upload directories exist
['audio', 'scores', 'video', 'images'].forEach(dir => {
    const fullPath = path.join(UPLOAD_DIR, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

// Allowed file types
const ALLOWED_TYPES = {
    audio: {
        mimes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/m4a', 'audio/x-m4a'],
        maxSize: 50 * 1024 * 1024, // 50MB
        dir: 'audio'
    },
    scores: {
        mimes: ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'],
        maxSize: 20 * 1024 * 1024, // 20MB
        dir: 'scores'
    },
    video: {
        mimes: ['video/mp4', 'video/webm', 'video/ogg'],
        maxSize: 100 * 1024 * 1024, // 100MB
        dir: 'video'
    },
    images: {
        mimes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
        maxSize: 10 * 1024 * 1024, // 10MB
        dir: 'images'
    }
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = req.params.type || 'images';
        const config = ALLOWED_TYPES[type];
        if (!config) return cb(new Error('Invalid upload type'));
        cb(null, path.join(UPLOAD_DIR, config.dir));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const name = crypto.randomBytes(16).toString('hex');
        cb(null, name + ext);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Max 100MB
    fileFilter: (req, file, cb) => {
        const type = req.params.type || 'images';
        const config = ALLOWED_TYPES[type];
        if (!config) return cb(new Error('Invalid upload type'));
        if (!config.mimes.includes(file.mimetype)) {
            return cb(new Error('File type not allowed. Accepted: ' + config.mimes.join(', ')));
        }
        if (file.size > config.maxSize) {
            return cb(new Error('File too large. Max: ' + (config.maxSize / 1024 / 1024) + 'MB'));
        }
        cb(null, true);
    }
});

// POST /api/uploads/:type (auth required)
// type = audio | scores | video | images
router.post('/:type', authMiddleware, (req, res) => {
    const type = req.params.type;
    if (!ALLOWED_TYPES[type]) {
        return res.status(400).json({ error: 'Invalid type. Use: audio, scores, video, images' });
    }

    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileUrl = `/uploads/${ALLOWED_TYPES[type].dir}/${req.file.filename}`;

        try {
            // Save record to DB
            const result = await pool.query(
                `INSERT INTO uploads (filename, original_name, mime_type, size_bytes, url, upload_type, uploaded_by)
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [req.file.filename, req.file.originalname, req.file.mimetype,
                 req.file.size, fileUrl, type, req.user.id]
            );

            res.status(201).json({
                upload: result.rows[0],
                url: fileUrl
            });
        } catch (dbErr) {
            console.error('Upload DB error:', dbErr.message);
            res.status(500).json({ error: 'Upload saved but DB record failed', url: fileUrl });
        }
    });
});

// GET /api/uploads - List uploads (admin)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
    const { type, limit = 50, offset = 0 } = req.query;
    let where = '';
    let params = [];

    if (type) { where = 'WHERE upload_type = $1'; params.push(type); }

    try {
        const result = await pool.query(
            `SELECT u.*, usr.name as uploader_name FROM uploads u 
             LEFT JOIN users usr ON u.uploaded_by = usr.id 
             ${where} ORDER BY u.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
            [...params, Math.min(parseInt(limit), 100), parseInt(offset)]
        );
        const count = await pool.query(`SELECT COUNT(*) FROM uploads ${where}`, params);
        res.json({ uploads: result.rows, total: parseInt(count.rows[0].count) });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// DELETE /api/uploads/:id (admin)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM uploads WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });

        const upload = result.rows[0];

        // Delete file from disk
        const filePath = path.join(UPLOAD_DIR, upload.upload_type, upload.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete from DB
        await pool.query('DELETE FROM uploads WHERE id = $1', [req.params.id]);
        res.json({ deleted: true });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

// GET /api/uploads/stats
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT upload_type, COUNT(*) as count, SUM(size_bytes) as total_bytes
             FROM uploads GROUP BY upload_type`
        );
        res.json({ stats: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Internal error' });
    }
});

module.exports = router;
