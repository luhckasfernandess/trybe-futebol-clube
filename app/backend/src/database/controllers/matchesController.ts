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

  saveMatchesInProgress = async (req: Request, res: Response) => {
    try {
      const match = req.body;
      if (match.homeTeam === match.awayTeam) {
        return res.status(422).json({
          message: 'It is not possible to create a match with two equal teams' });
      }
      const result = await this.matchService.saveMatchesInProgress(match);
      return res.status(201).json(result);
    } catch (error) {
      return error;
    }
  };

  saveMatchFinished = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.matchService.saveMatchFinished(Number(id));
      if (result) return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return error;
    }
  };
}
