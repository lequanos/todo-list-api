import 'dotenv/config.js'
import express, { json } from 'express';

const app = express();

app.use(json());

app.use('/', async (req, res) => {
    res.send('Hedzllo')
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});