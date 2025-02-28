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
      const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

      if (user.rows.length === 0) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user.rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
  }
});
