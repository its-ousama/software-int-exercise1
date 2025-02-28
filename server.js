require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Running in ${process.env.NODE_ENV} mode`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
