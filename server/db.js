const { Pool } = require('pg');
const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');

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

    await client.query(`
      CREATE TABLE IF NOT EXISTS fourballs (
        id SERIAL PRIMARY KEY,
        fourball_id VARCHAR(10) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        player1_name VARCHAR(50) NOT NULL,
        player2_name VARCHAR(50) NOT NULL,
        player3_name VARCHAR(50) NOT NULL,
        player4_name VARCHAR(50) NOT NULL
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
      CREATE TABLE IF NOT EXISTS hall_of_fame (
        id SERIAL PRIMARY KEY,
        golfer VARCHAR(100) NOT NULL,
        achievement VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL
      )
    `);

    console.log('Database initialized successfully');

    // Register default admin user
    // await registerUser('navneet', '123456');

  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// async function registerUser(username, password) {
//   const client = await pool.connect();
//   try {
//     // Check if user already exists
//     const userCheck = await client.query('SELECT * FROM admin WHERE username = $1', [username]);
//     if (userCheck.rows.length > 0) {
//       console.log('User already exists');
//       return;
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user into database with hashed password
//     await client.query('INSERT INTO admin (username, password) VALUES ($1, $2)', [username, hashedPassword]);

//     console.log('User registered successfully');
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error;
//   } finally {
//     client.release();
//   }
// }

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
  // registerUser
};