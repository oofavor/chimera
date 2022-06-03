import { Router } from 'express';
import * as controller from '@controllers/user.controller';

export const userRouter = Router();

userRouter.get('/:username', controller.getUserRequest);
userRouter.post('/', controller.createUserRequest);
userRouter.get('/:id/messages', controller.getMessagesRequest);
