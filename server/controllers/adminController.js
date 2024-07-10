const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.pool.query('SELECT * FROM admin WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const admin = rows[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

exports.createFourball = async (req, res) => {
    const { fourballId, password, player1, player2, player3, player4 } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.pool.query(
            'INSERT INTO fourballs (fourball_id, password, player1_name, player2_name, player3_name, player4_name) VALUES (?, ?, ?, ?, ?, ?)',
            [fourballId, hashedPassword, player1, player2, player3, player4]
        );
        res.status(201).json({ message: 'Fourball created successfully', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating fourball', error: error.message });
    }
};

exports.viewFourballs = async (req, res) => {
    try {
        const [rows] = await db.pool.query('SELECT * FROM fourballs');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fourballs', error: error.message });
    }
};

exports.viewScores = async (req, res) => {
    const { fourballId } = req.params;
    try {
        const [rows] = await db.query(`
      SELECT player_name, hole_number, score
      FROM scores s
      JOIN fourballs f ON s.fourball_id = f.id
      WHERE f.fourball_id = ?
      ORDER BY player_name, hole_number
    `, [fourballId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scores', error: error.message });
    }
};

exports.archiveFlush = async (req, res) => {
    const connection = db.pool.getConnection();
    try {
        await connection.query('SET FOREIGN_KEY_CHECKS = 0');

        // Get all table names
        const [tables] = await connection.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = ?`,
            [process.env.DB_NAME]
        );

        // Drop all tables except 'admin'
        for (let table of tables) {
            const tableName = table.TABLE_NAME;
            if (tableName !== 'admin') {
                await connection.query(`DROP TABLE IF EXISTS ${tableName}`);
            }
        }

        await connection.query('SET FOREIGN_KEY_CHECKS = 1');

        // Re-initialize the database (create tables)
        await db.initDb();

        res.status(200).json({ message: 'Archive flush completed successfully' });
    } catch (error) {
        console.error('Error during archive flush:', error);
        res.status(500).json({ message: 'Error during archive flush', error: error.message });
    } finally {
        connection.release();
    }
};