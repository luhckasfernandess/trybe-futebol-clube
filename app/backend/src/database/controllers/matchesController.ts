import { Response, Request } from 'express';
import MatchService from '../services/matchService';

export default class MatchesController {
  private matchService: MatchService;
  constructor() {
    this.matchService = new MatchService();
  }

  getMatches = async (_req: Request, res: Response) => {
    try {
      const matches = await this.matchService.getMatches();
      return res.status(200).json(matches);
    } catch (error) {
      return error;
    }
  };
}
