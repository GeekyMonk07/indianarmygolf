// // const mysql = require('mysql2/promise');
// // const dotenv = require('dotenv');
// // const bcrypt = require('bcryptjs');

// // dotenv.config();

// // const pool = mysql.createPool({
// //   host: process.env.DB_HOST,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// //   database: process.env.DB_NAME,
// //   waitForConnections: true,
// //   connectionLimit: 10,
// //   queueLimit: 0
// // });

// // async function initDb() {
// //   const connection = await mysql.createConnection({
// //     host: process.env.DB_HOST,
// //     user: process.env.DB_USER,
// //     password: process.env.DB_PASSWORD,
// //   });

// //   await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
// //   await connection.query(`USE ${process.env.DB_NAME}`);

// //   await connection.query(`
// //     CREATE TABLE IF NOT EXISTS admin (
// //       id INT AUTO_INCREMENT PRIMARY KEY,
// //       username VARCHAR(50) UNIQUE NOT NULL,
// //       password VARCHAR(255) NOT NULL
// //     )
// //   `);

// //   await connection.query(`
// //     CREATE TABLE IF NOT EXISTS fourballs (
// //       id INT AUTO_INCREMENT PRIMARY KEY,
// //       fourball_id VARCHAR(10) UNIQUE NOT NULL,
// //       password VARCHAR(255) NOT NULL,
// //       player1_name VARCHAR(50) NOT NULL,
// //       player2_name VARCHAR(50) NOT NULL,
// //       player3_name VARCHAR(50) NOT NULL,
// //       player4_name VARCHAR(50) NOT NULL
// //     )
// //   `);

// //   await connection.query(`
// //     CREATE TABLE IF NOT EXISTS scores (
// //       id INT AUTO_INCREMENT PRIMARY KEY,
// //       fourball_id INT,
// //       player_name VARCHAR(50),
// //       hole_number INT CHECK (hole_number BETWEEN 1 AND 18),
// //       score INT,
// //       FOREIGN KEY (fourball_id) REFERENCES fourballs(id),
// //       UNIQUE (fourball_id, player_name, hole_number)
// //     )
// //   `);

// //   console.log('Database initialized');
// //   await connection.end();
// // }

// // initDb().catch(console.error);

// // // async function registerUser(username, password) {
// // //   try {
// // //     // Hash the password
// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     // Insert user into database with hashed password
// // //     const connection = await pool.getConnection();
// // //     await connection.execute('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hashedPassword]);
// // //     connection.release();

// // //     console.log('User registered successfully');
// // //   } catch (error) {
// // //     console.error('Error registering user:', error);
// // //   }
// // // }

// // // registerUser('navneet', '123456');  

// // // module.exports = {
// // //   pool,
// // //   initDb
// // // };

// // module.exports = pool;

// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');

// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// async function initDb() {
//   let connection;
//   try {
//     console.log('Attempting to connect to the database...');
//     connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       ssl: {
//         rejectUnauthorized: true
//       },
//       connectTimeout: 10000
//     });
//     console.log('Connected to the database server');

//     await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
//     console.log(`Ensured database ${process.env.DB_NAME} exists`);

//     await connection.query(`USE ${process.env.DB_NAME}`);
//     console.log(`Using database ${process.env.DB_NAME}`);

//     // ... (rest of your table creation queries)
//     await connection.query(`
//           CREATE TABLE IF NOT EXISTS admin (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL
//           )
//         `);

//     await connection.query(`
//           CREATE TABLE IF NOT EXISTS fourballs (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             fourball_id VARCHAR(10) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             player1_name VARCHAR(50) NOT NULL,
//             player2_name VARCHAR(50) NOT NULL,
//             player3_name VARCHAR(50) NOT NULL,
//             player4_name VARCHAR(50) NOT NULL
//           )
//         `);

//     await connection.query(`
//           CREATE TABLE IF NOT EXISTS scores (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             fourball_id INT,
//             player_name VARCHAR(50),
//             hole_number INT CHECK (hole_number BETWEEN 1 AND 18),
//             score INT,
//             FOREIGN KEY (fourball_id) REFERENCES fourballs(id),
//             UNIQUE (fourball_id, player_name, hole_number)
//           )
//         `);

//     console.log('Database initialized successfully');
//   } catch (error) {
//     console.error('Error initializing database:', error);
//     console.error('Error details:', error.message, error.code, error.errno, error.sqlState);
//     throw error;
//   }
//   // finally {
//   //   if (connection) {
//   //     await connection.end();
//   //     console.log('Database connection closed');
//   //   }
//   // }
// }

// // Wrap the initDb call in a function that we can call after we export the module
// const initialize = () => {
//   initDb().catch(error => {
//     console.error('Failed to initialize database:', error);
//     process.exit(1);
//   });
// };

// module.log = console.log;

// module.exports = {
//   pool,
//   initDb,
//   initialize
// };

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