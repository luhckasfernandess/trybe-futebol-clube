import { Router } from 'express';
import UserController from '../controllers/usersController';

const userRoute = Router();
const userController = new UserController();

userRoute.post('/', userController.login);

export default userRoute;
