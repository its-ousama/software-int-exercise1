const { Pool } = require('pg');
const pool = require('../db');

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL
    );
  `;
  await pool.query(query);
  console.log("Users table created");
};

createTable();

module.exports = pool;
