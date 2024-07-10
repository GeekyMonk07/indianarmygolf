// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const db = require('./db')

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());
// db.initialize();

// // Import routes
// const adminRoutes = require('./routes/admin');
// const userRoutes = require('./routes/user');

// // Use routes
// app.use('/api/admin', adminRoutes);
// app.use('/api/user', userRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const { pool, initialize } = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize the database
initialize();

// // Import routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Example route using the database
app.get('/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ time: result.rows[0].now });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));