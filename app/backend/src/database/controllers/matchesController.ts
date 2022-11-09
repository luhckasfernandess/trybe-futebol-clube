import { Response, Request, NextFunction } from 'express';
import MatchService from '../services/matchService';

export default class MatchesController {
  private matchService: MatchService;
  constructor() {
    this.matchService = new MatchService();
  }

  getMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.query.inProgress) return next();
      const matches = await this.matchService.getMatches();
      return res.status(200).json(matches);
    } catch (error) {
      return error;
    }
  };

  getMatchesInProgress = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      const matchesInProgress = await this.matchService.getMatchesInProgress(inProgress === 'true');
      return res.status(200).json(matchesInProgress);
    } catch (error) {
      return error;
    }
  };
}
