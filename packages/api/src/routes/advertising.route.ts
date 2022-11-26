import { AdvertisingController } from '@controllers';
import { database } from '@database';
import { ensureUserAuthentication } from '@middlewares';
import { DefaultAdvertisingService } from '@services';
import express from 'express';

// Controller instantiation ----------------------------------------------------

const service = new DefaultAdvertisingService(database);
const controller = new AdvertisingController(service);

// Routing ---------------------------------------------------------------------

const advertisingRouter = express.Router();

advertisingRouter.get('/:id?', controller.list);
advertisingRouter.post('/rate/:id', controller.rate);
advertisingRouter.use(ensureUserAuthentication);
advertisingRouter.post('/', controller.create);
advertisingRouter.put('/:id', controller.update);
advertisingRouter.delete('/:id', controller.delete);

export { advertisingRouter };