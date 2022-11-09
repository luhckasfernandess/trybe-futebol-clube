import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRoute = Router();
const matchesController = new MatchesController();

matchesRoute.get('/', matchesController.getMatches);

export default matchesRoute;
