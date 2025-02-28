const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const pool = require('./db');

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 

console.log(`Running in ${process.env.NODE_ENV} mode`);
console.log(`Server is running on port ${PORT}`);


app.post('/users', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required" });
    }

    try {
        const newUser = await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
