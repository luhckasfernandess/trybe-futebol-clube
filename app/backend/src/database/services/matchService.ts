import Matches from '../models/matchesModel';
import Teams from '../models/teamsModel';

export default class MatchService {
  getMatches = async () => {
    const result = await Matches.findAll({
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] }],
    });
    console.log(result);
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
}
