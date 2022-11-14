import { Router } from 'express';
import LeaderBoardsController from '../controllers/leaderBoardsController';

const leaderBoardsRoute = Router();
const leaderBoardsController = new LeaderBoardsController();

leaderBoardsRoute.get('/home', leaderBoardsController.leaderBoardHome);
leaderBoardsRoute.get('/away', leaderBoardsController.leaderBoardAway);
leaderBoardsRoute.get('/', leaderBoardsController.leaderBoard);

export default leaderBoardsRoute;
