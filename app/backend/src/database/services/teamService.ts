import Teams from '../models/teamsModel';

export default class TeamService {
  getAllTeams = async () => {
    const result = await Teams.findAll();
    return result;
  };

  getTeamById = async (id: number) => {
    const result = await Teams.findByPk(id);
    return result;
  };
}
