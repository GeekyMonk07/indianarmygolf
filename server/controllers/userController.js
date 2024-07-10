// const db = require('../db');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//     const { fourballId, password } = req.body;
//     try {
//         const [rows] = await db.query('SELECT * FROM fourballs WHERE fourball_id = ?', [fourballId]);
//         if (rows.length === 0) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const fourball = rows[0];
//         const isMatch = await bcrypt.compare(password, fourball.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const token = jwt.sign({ id: fourball.id, fourballId: fourball.fourball_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token, players: [fourball.player1_name, fourball.player2_name, fourball.player3_name, fourball.player4_name] });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error: error.message });
//     }
// };

// exports.enterScore = async (req, res) => {
//     const { playerName, holeNumber, score } = req.body;
//     const fourballId = req.fourball.id;
//     try {
//         await db.query(
//             'INSERT INTO scores (fourball_id, player_name, hole_number, score) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE score = ?',
//             [fourballId, playerName, holeNumber, score, score]
//         );
//         res.status(201).json({ message: 'Score entered successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error entering score', error: error.message });
//     }
// };

// exports.viewScores = async (req, res) => {
//     const fourballId = req.fourball.id;
//     const { playerName } = req.query;
//     try {
//         const [rows] = await db.query(`
//       SELECT hole_number, score
//       FROM scores
//       WHERE fourball_id = ? AND player_name = ?
//       ORDER BY hole_number
//     `, [fourballId, playerName]);
//         res.json(rows);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching scores', error: error.message });
//     }
// };

const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { fourballId, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM fourballs WHERE fourball_id = ?', [fourballId]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const fourball = rows[0];
        const isMatch = await bcrypt.compare(password, fourball.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: fourball.id, fourballId: fourball.fourball_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            fourballId: fourball.fourball_id,
            players: [
                fourball.player1_name,
                fourball.player2_name,
                fourball.player3_name,
                fourball.player4_name
            ]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

exports.enterScore = async (req, res) => {
    const { playerName, holeNumber, score } = req.body;
    const fourballId = req.fourball.id;
    try {
        await db.query(
            'INSERT INTO scores (fourball_id, player_name, hole_number, score) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE score = ?',
            [fourballId, playerName, holeNumber, score, score]
        );
        res.status(201).json({ message: 'Score entered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error entering score', error: error.message });
    }
};

exports.viewScores = async (req, res) => {
    const fourballId = req.fourball.id;
    try {
        const [rows] = await db.query(`
            SELECT player_name, hole_number, score
            FROM scores
            WHERE fourball_id = ?
            ORDER BY player_name, hole_number
        `, [fourballId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scores', error: error.message });
    }
};