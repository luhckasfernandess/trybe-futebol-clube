import { Router } from 'express';
import UserController from '../controllers/usersController';
import Login from '../middlewares/loginValidate';

const userRoute = Router();
const userController = new UserController();
const login = new Login();

userRoute.post('/', login.validate, userController.login);

export default userRoute;
