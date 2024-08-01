const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDb() {
  const client = await pool.connect();
  try {
    console.log('Connected to the database. Initializing...');

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    // await client.query(`
    //   CREATE TABLE IF NOT EXISTS fourballs (
    //     id SERIAL PRIMARY KEY,
    //     fourball_id VARCHAR(10) UNIQUE NOT NULL,
    //     password VARCHAR(255) NOT NULL,
    //     player1_name VARCHAR(50) NOT NULL,
    //     player2_name VARCHAR(50) NOT NULL,
    //     player3_name VARCHAR(50) NOT NULL,
    //     player4_name VARCHAR(50) NOT NULL
    //   )
    // `);

    // await client.query(`
    //   CREATE TABLE IF NOT EXISTS scores (
    //     id SERIAL PRIMARY KEY,
    //     fourball_id INTEGER,
    //     player_name VARCHAR(50),
    //     hole_number INTEGER CHECK (hole_number BETWEEN 1 AND 18),
    //     score INTEGER,
    //     FOREIGN KEY (fourball_id) REFERENCES fourballs(id),
    //     UNIQUE (fourball_id, player_name, hole_number)
    //   )
    // `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS fourballs (
        id SERIAL PRIMARY KEY,
        fourball_id VARCHAR(10) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        player1_name VARCHAR(50) NOT NULL,
        player1_handicap INTEGER NOT NULL,
        player2_name VARCHAR(50) NOT NULL,
        player2_handicap INTEGER NOT NULL,
        player3_name VARCHAR(50) NOT NULL,
        player3_handicap INTEGER NOT NULL,
        player4_name VARCHAR(50) NOT NULL,
        player4_handicap INTEGER NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS scores (
        id SERIAL PRIMARY KEY,
        fourball_id INTEGER,
        player_name VARCHAR(50),
        hole_number INTEGER CHECK (hole_number BETWEEN 1 AND 18),
        score INTEGER,
        FOREIGN KEY (fourball_id) REFERENCES fourballs(id),
        UNIQUE (fourball_id, player_name, hole_number)
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS player_totals (
        id SERIAL PRIMARY KEY,
        fourball_id INTEGER,
        player_name VARCHAR(50),
        gross_score INTEGER,
        net_score INTEGER,
        FOREIGN KEY (fourball_id) REFERENCES fourballs(id),
        UNIQUE (fourball_id, player_name)
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS hall_of_fame (
        id SERIAL PRIMARY KEY,
        golfer VARCHAR(100) NOT NULL,
        achievement VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS news_flash (
        id SERIAL PRIMARY KEY,
        tournament_name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        venue VARCHAR(255) NOT NULL,
        entry_fees JSONB NOT NULL,
        registration_deadline DATE NOT NULL,
        contact_info VARCHAR(255) NOT NULL
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

const initialize = () => {
  initDb().catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });
};

module.exports = {
  pool,
  initDb,
  initialize,
};