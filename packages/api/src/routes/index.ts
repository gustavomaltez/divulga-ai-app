import express from 'express';

import { authenticationRouter } from './authentication.route';
import { advertisingRouter } from './advertising.route';

const routes = express.Router();

routes.use('/auth', authenticationRouter);
routes.use('/advertising', advertisingRouter);

export { routes };