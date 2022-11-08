import Teams from '../models/teamsModel';

export default class TeamService {
  getAllTeams = async () => {
    const result = await Teams.findAll();
    return result;
  };
}
