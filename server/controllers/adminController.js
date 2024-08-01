const { pool } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const admin = result.rows[0];
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

// exports.createFourball = async (req, res) => {
//     const { fourballId, password, player1, player2, player3, player4 } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await pool.query(
//             'INSERT INTO fourballs (fourball_id, password, player1_name, player2_name, player3_name, player4_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
//             [fourballId, hashedPassword, player1, player2, player3, player4]
//         );
//         res.status(201).json({ message: 'Fourball created successfully', id: result.rows[0].id });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating fourball', error: error.message });
//     }
// };

// exports.createFourball = async (req, res) => {
//     const { fourballId, password, player1, player1Handicap, player2, player2Handicap, player3, player3Handicap, player4, player4Handicap } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await pool.query(
//             'INSERT INTO fourballs (fourball_id, password, player1_name, player1_handicap, player2_name, player2_handicap, player3_name, player3_handicap, player4_name, player4_handicap) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
//             [fourballId, hashedPassword, player1, player1Handicap, player2, player2Handicap, player3, player3Handicap, player4, player4Handicap]
//         );
//         res.status(201).json({ message: 'Fourball created successfully', id: result.rows[0].id });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating fourball', error: error.message });
//     }
// };

// exports.viewFourballs = async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM fourballs');
//         res.json(result.rows);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching fourballs', error: error.message });
//     }
// };

// exports.viewScores = async (req, res) => {
//     const { fourballId } = req.params;
//     try {
//         const result = await pool.query(`
//             SELECT player_name, hole_number, score
//             FROM scores s
//             JOIN fourballs f ON s.fourball_id = f.id
//             WHERE f.fourball_id = $1
//             ORDER BY player_name, hole_number
//         `, [fourballId]);
//         res.json(result.rows);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching scores', error: error.message });
//     }
// };

exports.createFourball = async (req, res) => {
    const { fourballId, password, player1, player1Handicap, player2, player2Handicap, player3, player3Handicap, player4, player4Handicap } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO fourballs (fourball_id, password, player1_name, player1_handicap, player2_name, player2_handicap, player3_name, player3_handicap, player4_name, player4_handicap) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
            [fourballId, hashedPassword, player1, player1Handicap, player2, player2Handicap, player3, player3Handicap, player4, player4Handicap]
        );
        res.status(201).json({ message: 'Fourball created successfully', id: result.rows[0].id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating fourball', error: error.message });
    }
};

exports.viewFourballs = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM fourballs');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fourballs', error: error.message });
    }
};

exports.viewScores = async (req, res) => {
    const { fourballId } = req.params;
    try {
        const scoresResult = await pool.query(`
            SELECT player_name, hole_number, score
            FROM scores s
            JOIN fourballs f ON s.fourball_id = f.id
            WHERE f.fourball_id = $1
            ORDER BY player_name, hole_number
        `, [fourballId]);

        const totalsResult = await pool.query(`
            SELECT player_name, gross_score, net_score
            FROM player_totals pt
            JOIN fourballs f ON pt.fourball_id = f.id
            WHERE f.fourball_id = $1
        `, [fourballId]);

        res.json({
            scores: scoresResult.rows,
            totals: totalsResult.rows
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scores', error: error.message });
    }
};

exports.addHallOfFameEntry = async (req, res) => {
    const { golfer, achievement, year } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO hall_of_fame (golfer, achievement, year) VALUES ($1, $2, $3) RETURNING id',
            [golfer, achievement, year]
        );
        res.status(201).json({ message: 'Hall of Fame entry added successfully', id: result.rows[0].id });
    } catch (error) {
        res.status(500).json({ message: 'Error adding Hall of Fame entry', error: error.message });
    }
};

exports.getHallOfFameEntries = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM hall_of_fame ORDER BY year DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Hall of Fame entries', error: error.message });
    }
};

exports.updateNewsFlash = async (req, res) => {
    const { tournamentName, date, venue, entryFees, registrationDeadline, contactInfo } = req.body;

    try {
        // First, delete any existing news flash
        await pool.query('DELETE FROM news_flash');

        // Then, insert the new news flash
        const result = await pool.query(
            'INSERT INTO news_flash (tournament_name, date, venue, entry_fees, registration_deadline, contact_info) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [tournamentName, date, venue, JSON.stringify(entryFees), registrationDeadline, contactInfo]
        );

        res.status(201).json({ message: 'News flash updated successfully', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error updating news flash', error: error.message });
    }
};

exports.getNewsFlash = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news_flash LIMIT 1');
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'No news flash found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news flash', error: error.message });
    }
};

exports.archiveFlush = async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Get all table names except 'admin'
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' AND table_name != 'admin'
        `);

        // Delete all data from tables except 'admin'
        for (let table of tablesResult.rows) {
            await client.query(`TRUNCATE TABLE ${table.table_name} RESTART IDENTITY CASCADE`);
        }

        await client.query('COMMIT');

        res.status(200).json({ message: 'Archive flush completed successfully. All data has been deleted from tables.' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during archive flush:', error);
        res.status(500).json({ message: 'Error during archive flush', error: error.message });
    } finally {
        client.release();
    }
};

exports.updatePassword = async (req, res) => {
    const { username, currentPassword, newPassword, confirmPassword } = req.body;
    const client = await pool.connect();

    try {
        // Check if all required fields are present
        if (!username || !currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New password and confirm password do not match' });
        }

        // Check if user exists
        const userCheck = await client.query('SELECT * FROM admin WHERE username = $1', [username]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userCheck.rows[0];

        // Verify current password
        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the password in the database
        await client.query('UPDATE admin SET password = $1 WHERE username = $2', [hashedNewPassword, username]);

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Error updating password', error: error.message });
    } finally {
        client.release();
    }
};