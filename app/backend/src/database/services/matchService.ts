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
    const saveMatch = { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress };
    const result = await Matches.create(saveMatch);
    return result;
  };
}
