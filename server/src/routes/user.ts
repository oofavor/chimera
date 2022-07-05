import { Router } from 'express';
import * as controller from '@controllers/user.controller';

export const userRouter = Router();

userRouter.get('/:username', controller.getUser);
userRouter.get('/search/:username', controller.getUsers);
userRouter.post('/current', controller.currentUser);
userRouter.post('/register', controller.registerUser);
userRouter.post('/login', controller.loginUser);