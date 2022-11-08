import { Response, Request } from 'express';
import TeamService from '../services/teamService';

export default class TeamsController {
  private teamService: TeamService;
  constructor() {
    this.teamService = new TeamService();
  }

  getAllTeams = async (_req: Request, res: Response) => {
    try {
      const allTeams = await this.teamService.getAllTeams();
      return res.status(200).json(allTeams);
    } catch (error) {
      return error;
    }
  };
}
