const { pool } = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { fourballId, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM fourballs WHERE fourball_id = $1', [fourballId]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const fourball = result.rows[0];
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
        await pool.query(
            `INSERT INTO scores (fourball_id, player_name, hole_number, score) 
             VALUES ($1, $2, $3, $4) 
             ON CONFLICT (fourball_id, player_name, hole_number) 
             DO UPDATE SET score = $4`,
            [fourballId, playerName, holeNumber, score]
        );
        res.status(201).json({ message: 'Score entered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error entering score', error: error.message });
    }
};

exports.viewScores = async (req, res) => {
    const fourballId = req.fourball.id;
    try {
        const result = await pool.query(`
            SELECT player_name, hole_number, score
            FROM scores
            WHERE fourball_id = $1
            ORDER BY player_name, hole_number
        `, [fourballId]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scores', error: error.message });
    }
};