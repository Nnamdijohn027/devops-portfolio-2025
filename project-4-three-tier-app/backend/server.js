const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Initialize database
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        count INTEGER DEFAULT 1,
        last_visited TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert initial data if empty
    const result = await pool.query('SELECT COUNT(*) FROM visitors');
    if (parseInt(result.rows[0].count) === 0) {
      await pool.query('INSERT INTO visitors (count) VALUES (1)');
    }
  } catch (err) {
    console.log('Database initialization error:', err.message);
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'backend' });
});

app.get('/api/visitors', async (req, res) => {
  try {
    const result = await pool.query(`
      UPDATE visitors SET count = count + 1, last_visited = CURRENT_TIMESTAMP 
      WHERE id = 1 
      RETURNING count
    `);
    res.json({ visitors: result.rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/info', (req, res) => {
  res.json({
    service: 'Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Initialize and start server
initDB().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend API running on port ${port}`);
  });
});
