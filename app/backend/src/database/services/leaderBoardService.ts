import BusinessRuleCalc from '../helpers/businessRulesCalc';
import IMatchesWithTeamName from '../interfaces/IMatchesWithTeamName';
import MatchService from './matchService';
import TeamService from './teamService';

export default class LeaderBoardService {
  private matchService: MatchService;
  private teamService: TeamService;
  constructor() {
    this.matchService = new MatchService();
    this.teamService = new TeamService();
  }

  leaderBoardHome = async () => {
    const matches = await this.matchService.getMatches() as unknown;
    const teams = await this.teamService.getAllTeams();
    const result = await Promise.all(
      teams.map(({ id, teamName }) =>
        BusinessRuleCalc.homeTeamStatistics(id, teamName, matches as IMatchesWithTeamName[])),
    );
    result.sort(BusinessRuleCalc.sortByTotalPoints);
    return result;
  };

  leaderBoardAway = async () => {
    const matches = await this.matchService.getMatches() as unknown;
    const teams = await this.teamService.getAllTeams();
    const result = await Promise.all(
      teams.map(({ id, teamName }) =>
        BusinessRuleCalc.awayTeamStatistics(id, teamName, matches as IMatchesWithTeamName[])),
    );
    result.sort(BusinessRuleCalc.sortByTotalPoints);
    return result;
  };

  leaderBoard = async () => {
    const matches = await this.matchService.getMatches() as unknown;
    const teams = await this.teamService.getAllTeams();
    const result = await Promise.all(
      teams.map(({ id, teamName }) =>
        BusinessRuleCalc.allTeamStatistics(id, teamName, matches as IMatchesWithTeamName[])),
    );
    result.sort(BusinessRuleCalc.sortByTotalPoints);
    return result;
  };
}
