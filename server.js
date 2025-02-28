
// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {


// PUT: Update a user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
  }

  try {
      const updatedUser = await pool.query(
          "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
          [name, email, id]
      );

      if (updatedUser.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(updatedUser.rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
  }

// GET: Fetch all users
app.get('/users', async (req, res) => {
  try {
      const users = await pool.query("SELECT * FROM users");
      res.status(200).json(users.rows);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
  }
});

// GET: Fetch a single user by ID
app.get('/users/:id', async (req, res) => {

  const { id } = req.params;

  try {
      const deletedUser = await pool.query(
          "DELETE FROM users WHERE id = $1 RETURNING *",
          [id]
      );

      if (deletedUser.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully", user: deletedUser.rows[0] });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
  }
});


const dotenv = require('dotenv');
const path = require('path');

const express = require('express');
const pool = require('./db');

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });


// Load environment variables dynamically
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

const express = require('express');

const app = express();


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

const PORT = process.env.PORT || 5000;

console.log(`Running in ${process.env.NODE_ENV} mode`);
console.log(`Server is running on port ${PORT}`);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

