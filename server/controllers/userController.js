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
                { name: fourball.player1_name, handicap: fourball.player1_handicap },
                { name: fourball.player2_name, handicap: fourball.player2_handicap },
                { name: fourball.player3_name, handicap: fourball.player3_handicap },
                { name: fourball.player4_name, handicap: fourball.player4_handicap }
            ]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

exports.enterScore = async (req, res) => {
    const { playerName, holeNumber, score } = req.body;
    const fourballId = req.fourball.id;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(
            `INSERT INTO scores (fourball_id, player_name, hole_number, score) 
             VALUES ($1, $2, $3, $4) 
             ON CONFLICT (fourball_id, player_name, hole_number) 
             DO UPDATE SET score = $4`,
            [fourballId, playerName, holeNumber, score]
        );

        // Calculate gross score
        const grossScoreResult = await client.query(
            `SELECT COALESCE(SUM(score), 0) as gross_score
             FROM scores
             WHERE fourball_id = $1 AND player_name = $2`,
            [fourballId, playerName]
        );
        const grossScore = grossScoreResult.rows[0].gross_score;

        // Get player's handicap
        const handicapResult = await client.query(
            `SELECT player1_handicap AS handicap FROM fourballs WHERE id = $1 AND player1_name = $2
             UNION ALL
             SELECT player2_handicap FROM fourballs WHERE id = $1 AND player2_name = $2
             UNION ALL
             SELECT player3_handicap FROM fourballs WHERE id = $1 AND player3_name = $2
             UNION ALL
             SELECT player4_handicap FROM fourballs WHERE id = $1 AND player4_name = $2`,
            [fourballId, playerName]
        );
        const handicap = handicapResult.rows[0].handicap;

        // Calculate net score
        const netScore = grossScore - handicap;

        // Update player_totals
        await client.query(
            `INSERT INTO player_totals (fourball_id, player_name, gross_score, net_score)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (fourball_id, player_name)
             DO UPDATE SET gross_score = $3, net_score = $4`,
            [fourballId, playerName, grossScore, netScore]
        );

        await client.query('COMMIT');
        res.status(201).json({ message: 'Score entered successfully', grossScore, netScore });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ message: 'Error entering score', error: error.message });
    } finally {
        client.release();
    }
};

exports.viewScores = async (req, res) => {
    const fourballId = req.fourball.id;
    try {
        const scoresResult = await pool.query(`
            SELECT player_name, hole_number, score
            FROM scores
            WHERE fourball_id = $1
            ORDER BY player_name, hole_number
        `, [fourballId]);

        const totalsResult = await pool.query(`
            SELECT player_name, gross_score, net_score
            FROM player_totals
            WHERE fourball_id = $1
        `, [fourballId]);

        res.json({
            scores: scoresResult.rows,
            totals: totalsResult.rows
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scores', error: error.message });
    }
};