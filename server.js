const dotenv = require('dotenv');
const path = require('path');

// Load environment variables dynamically
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

console.log(`Running in ${process.env.NODE_ENV} mode`);
console.log(`Server is running on port ${PORT}`);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
