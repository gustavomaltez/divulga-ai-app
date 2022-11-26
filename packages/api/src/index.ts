import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import { handleServerError } from '@middlewares';
import { routes } from '@routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

// App initialization ----------------------------------------------------------

const app = express();

// App configuration -----------------------------------------------------------

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use(handleServerError);

// App launch ------------------------------------------------------------------

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));