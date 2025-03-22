const { Pool } = require("pg"); 
require("dotenv").config(); 

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase Cloud
});

pool.connect()
    .then(() => console.log('✅ Connected to Supabase Database'))
    .catch(err => console.error('❌ Database connection error:', err));

module.exports = pool; // Export the pool for use in other files
