import { Router } from 'express';
import LeaderBoardsController from '../controllers/leaderBoardsController';

const leaderBoardsRoute = Router();
const leaderBoardsController = new LeaderBoardsController();

leaderBoardsRoute.get('/home', leaderBoardsController.leaderBoardHome);

export default leaderBoardsRoute;
