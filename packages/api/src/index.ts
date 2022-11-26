import express from 'express';
import 'dotenv/config';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));