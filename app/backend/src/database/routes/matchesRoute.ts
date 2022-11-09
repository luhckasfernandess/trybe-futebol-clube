import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRoute = Router();
const matchesController = new MatchesController();

matchesRoute.get('/', matchesController.getMatches, matchesController.getMatchesInProgress);

export default matchesRoute;
