/**
 * Database initialization script
 * Run: npm run db:init
 * Or: node db/init.js
 */
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error('DATABASE_URL not set');
    process.exit(1);
}

async function init() {
    const pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        // Run schema
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await pool.query(schema);
        console.log('Schema created');

        // Create admin user if not exists
        const adminEmail = 'admin@portalmariachi.com';
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail]);

        if (existing.rows.length === 0) {
            const hash = await bcrypt.hash('admin2026!', 12);
            await pool.query(
                `INSERT INTO users (email, password_hash, name, role, avatar_url) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [adminEmail, hash, 'Administrador', 'super_admin',
                 'https://ui-avatars.com/api/?name=Admin&background=FFB800&color=0F0F0F']
            );
            console.log('Admin user created: admin@portalmariachi.com');
        } else {
            console.log('Admin user already exists');
        }

        console.log('Database initialized successfully');
    } catch (err) {
        console.error('Init error:', err.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

init();
