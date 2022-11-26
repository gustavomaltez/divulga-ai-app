import { AuthenticationController } from '@controllers';
import { database } from '@database';
import { DefaultAuthenticationService } from '@services';
import express from 'express';

// Controller instantiation ----------------------------------------------------

const service = new DefaultAuthenticationService(database);
const controller = new AuthenticationController(service);

// Routing ---------------------------------------------------------------------

const authenticationRouter = express.Router();

authenticationRouter.post('/register', controller.register);
authenticationRouter.post('/login', controller.login);

export { authenticationRouter };