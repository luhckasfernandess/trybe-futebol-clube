import IMatches from '../interfaces/IMatches';
import Matches from '../models/matchesModel';
import Teams from '../models/teamsModel';

export default class MatchService {
  getMatches = async () => {
    const result = await Matches.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }],
    });
    return result;
  };

  getMatchesInProgress = async (inProgress: boolean) => {
    const result = await Matches.findAll({ where: { inProgress },
      include: [{
        model: Teams, as: 'teamHome', attributes: ['teamName'],
      },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] }],
    });
    return result;
  };

  saveMatchesInProgress = async (match: IMatches) => {
    const tempMatch = match;
    tempMatch.inProgress = true;
    const { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = tempMatch;
    const verifyTeam1 = await Teams.findByPk(homeTeam);
    const verifyTeam2 = await Teams.findByPk(awayTeam);
    if (!verifyTeam1 || !verifyTeam2) return null;
    const saveMatch = { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress };
    const result = await Matches.create(saveMatch);
    return result;
  };

  saveMatchFinish = async (id: number) => {
    const [result] = await Matches.update({ inProgress: false }, { where: { id } });
    return result;
  };

  saveMatchesById = async (id: number, teams: object) => {
    const [result] = await Matches.update(teams, { where: { id } });
    return result;
  };
}
