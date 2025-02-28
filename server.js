// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
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
