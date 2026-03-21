/**
 * Script to safely wipe dummy content from the database.
 * Preserves the Admin user structure.
 * Run: node db/clean_dummy_data.js
 */
require('dotenv').config();
const pool = require('./pool');

async function cleanData() {
    console.log('🧹 Preparing to wipe dummy data...');

    try {
        // We use CASCADE to delete related rows (e.g. collection_songs, song_votes, favorites)
        await pool.query('TRUNCATE TABLE songs, collections, mariachis, blog_posts, courses CASCADE;');
        
        console.log('✅ Success! The database has been purged of dummy content.');
        console.log('✅ Admin users and auth tables remain intact.');
    } catch (err) {
        console.error('❌ Error cleaning data:', err.message);
    } finally {
        pool.end();
    }
}

cleanData();
