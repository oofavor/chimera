import { Router } from 'express';
import * as controller from '@controllers/message.controller';

export const messageRouter = Router();

messageRouter.get('/:id', controller.getMessageRequest);
messageRouter.post('/', controller.createMessageRequest);
