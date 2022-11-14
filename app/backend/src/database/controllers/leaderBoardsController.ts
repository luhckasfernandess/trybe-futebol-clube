import { Response, Request } from 'express';
import LeaderBoardService from '../services/leaderBoardService';

export default class LeaderBoardsController {
  private leaderBoardService: LeaderBoardService;
  constructor() {
    this.leaderBoardService = new LeaderBoardService();
  }

  leaderBoardHome = async (_req: Request, res: Response) => {
    try {
      const result = await this.leaderBoardService.leaderBoardHome();
      return res.status(200).json(result);
    } catch (error) {
      return error;
    }
  };

  leaderBoardAway = async (_req: Request, res: Response) => {
    try {
      const result = await this.leaderBoardService.leaderBoardAway();
      return res.status(200).json(result);
    } catch (error) {
      return error;
    }
  };

  leaderBoard = async (_req: Request, res: Response) => {
    try {
      const result = await this.leaderBoardService.leaderBoard();
      return res.status(200).json(result);
    } catch (error) {
      return error;
    }
  };
}
