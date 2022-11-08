import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRoute = Router();
const teamsController = new TeamsController();

teamsRoute.get('/', teamsController.getAllTeams);
teamsRoute.get('/:id', teamsController.getTeamById);

export default teamsRoute;
