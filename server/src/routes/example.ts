import { Router } from 'express';
import * as controller from '../controllers/example';

const exampleRouter = Router();

exampleRouter.get('/', controller.get);

export default exampleRouter;
