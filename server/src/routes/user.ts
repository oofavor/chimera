import { Router } from 'express';
import * as controller from '@controllers/user.controller';

export const userRouter = Router();

userRouter.get('/:username', controller.getUserRequest);
userRouter.post('/current', controller.currentUser);
userRouter.post('/register', controller.registerUser);
userRouter.post('/login', controller.loginUser);
