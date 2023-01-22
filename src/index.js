import 'dotenv/config.js'
import express, { json } from 'express';
import router from './routers/routers.js';
import connect from './db/index.js';

const app = express();

app.use(json());
app.use(router);

app.listen(process.env.PORT || 3000, async () => {
    await connect();
    console.log('Server running on :', process.env.PORT);
});