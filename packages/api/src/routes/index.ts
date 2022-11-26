import express from 'express';

import { authenticationRouter } from './authentication.route';

const routes = express.Router();

routes.use('/auth', authenticationRouter);

export { routes };