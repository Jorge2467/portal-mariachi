const { Client } = require('pg');

async function inspectDB() {
  const client = new Client({ connectionString: 'postgresql://postgres:cwMYlQxayIilPZEqtGtwTTAKBgSoLouy@crossover.proxy.rlwy.net:27464/railway' });
  try {
    await client.connect();
    
    // Get all tables
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = res.rows.map(r => r.table_name);
    console.log('--- TABLES IN DATABASE ---');
    console.log(tables.join('\n'));
    
    // Check specific tables
    for (const t of ['uploads', 'partituras', 'gallery', 'songs', 'mariachi_directory', 'users', 'courses', 'blog_posts', 'mariachis']) {
      if (tables.includes(t)) {
        console.log('\n--- SCHEMA FOR ' + t.toUpperCase() + ' ---');
        const colRes = await client.query(`
          SELECT column_name, data_type, character_maximum_length, is_nullable
          FROM information_schema.columns
          WHERE table_name = $1
        `, [t]);
        
        colRes.rows.forEach(c => {
          console.log(`- ${c.column_name}: ${c.data_type} (Nullable: ${c.is_nullable})`);
        });
      }
    }
  } catch(e) {
    console.error('DB Connection Error:', e);
  } finally {
    await client.end();
  }
}
inspectDB();
