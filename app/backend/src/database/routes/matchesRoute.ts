import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import Token from '../middlewares/tokenValidate';

const matchesRoute = Router();
const matchesController = new MatchesController();
const token = new Token();

matchesRoute.get('/', matchesController.getMatches, matchesController.getMatchesInProgress);
matchesRoute.post('/', token.tokenValidate, matchesController.saveMatchesInProgress);
matchesRoute.patch('/:id/finish', matchesController.saveMatchFinished);

export default matchesRoute;
