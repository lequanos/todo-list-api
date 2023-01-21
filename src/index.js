require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req, res) => res.send('hpsallo'))

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});