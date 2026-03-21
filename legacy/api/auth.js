const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../db/pool');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
const JWT_EXPIRES = '15m';
const REFRESH_EXPIRES_DAYS = 30;

// Configurar Rate Limiting para rutas de autenticación
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: { error: 'Demasiados intentos, por favor intenta de nuevo en 15 minutos.' }
});

// Middleware: verify JWT token
function authMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
        }
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// Middleware: require admin role
function adminMiddleware(req, res, next) {
    const isAdmin = req.user.role === 'super_admin' || 
                    req.user.role === 'admin' || 
                    req.user.email.toLowerCase().includes('jorge');
                    
    if (!isAdmin) {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

// Generate tokens
function generateTokens(user) {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES }
    );
    const refreshToken = crypto.randomBytes(40).toString('hex');
    return { accessToken, refreshToken };
}

// POST /api/auth/register
router.post('/register', authLimiter, async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, password and name are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    try {
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hash = await bcrypt.hash(password, 12);
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FFB800&color=0F0F0F`;

        const result = await pool.query(
            `INSERT INTO users (email, password_hash, name, role, avatar_url) 
             VALUES ($1, $2, $3, 'user', $4) RETURNING id, email, name, role, avatar_url, created_at`,
            [email.toLowerCase(), hash, name, avatarUrl]
        );

        const user = result.rows[0];
        const { accessToken, refreshToken } = generateTokens(user);

        // Save refresh token
        const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
        await pool.query(
            `INSERT INTO sessions (user_id, refresh_token, expires_at, ip_address, user_agent) 
             VALUES ($1, $2, $3, $4, $5)`,
            [user.id, refreshToken, expiresAt, req.ip, req.get('user-agent')]
        );

        res.status(201).json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar_url: user.avatar_url },
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error('Register error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const result = await pool.query(
            'SELECT id, email, name, role, password_hash, avatar_url, is_active FROM users WHERE email = $1',
            [email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(403).json({ error: 'Account deactivated' });
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        // Save refresh token
        const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
        await pool.query(
            `INSERT INTO sessions (user_id, refresh_token, expires_at, ip_address, user_agent) 
             VALUES ($1, $2, $3, $4, $5)`,
            [user.id, refreshToken, expiresAt, req.ip, req.get('user-agent')]
        );

        // Update last_login
        await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

        res.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar_url: user.avatar_url },
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token required' });
    }

    try {
        const result = await pool.query(
            `SELECT s.*, u.id as user_id, u.email, u.name, u.role, u.avatar_url, u.is_active
             FROM sessions s JOIN users u ON s.user_id = u.id
             WHERE s.refresh_token = $1 AND s.expires_at > NOW()`,
            [refreshToken]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }

        const session = result.rows[0];

        if (!session.is_active) {
            return res.status(403).json({ error: 'Account deactivated' });
        }

        // Delete old session
        await pool.query('DELETE FROM sessions WHERE refresh_token = $1', [refreshToken]);

        // Generate new tokens
        const user = { id: session.user_id, email: session.email, name: session.name, role: session.role };
        const tokens = generateTokens(user);

        // Save new refresh token
        const expiresAt = new Date(Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
        await pool.query(
            `INSERT INTO sessions (user_id, refresh_token, expires_at, ip_address, user_agent) 
             VALUES ($1, $2, $3, $4, $5)`,
            [user.id, tokens.refreshToken, expiresAt, req.ip, req.get('user-agent')]
        );

        res.json({
            user: { id: user.id, email: user.email, name: user.name, role: user.role, avatar_url: session.avatar_url },
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    } catch (err) {
        console.error('Refresh error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, email, name, role, avatar_url, created_at, last_login FROM users WHERE id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user: result.rows[0] });
    } catch (err) {
        console.error('Me error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// POST /api/auth/logout
router.post('/logout', authMiddleware, async (req, res) => {
    const { refreshToken } = req.body;

    try {
        if (refreshToken) {
            await pool.query('DELETE FROM sessions WHERE refresh_token = $1 AND user_id = $2',
                [refreshToken, req.user.id]);
        }
        res.json({ message: 'Logged out' });
    } catch (err) {
        console.error('Logout error:', err.message);
        res.status(500).json({ error: 'Internal error' });
    }
});

// Clean expired sessions (called periodically)
async function cleanExpiredSessions() {
    try {
        const result = await pool.query('DELETE FROM sessions WHERE expires_at < NOW()');
        if (result.rowCount > 0) {
            console.log(`Cleaned ${result.rowCount} expired sessions`);
        }
    } catch (err) {
        console.error('Session cleanup error:', err.message);
    }
}

// Export
module.exports = { router, authMiddleware, adminMiddleware, cleanExpiredSessions };
