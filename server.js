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
});
