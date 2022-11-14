import IMatchesWithTeamName from '../interfaces/IMatchesWithTeamName';
import ITeamStatistics from '../interfaces/ITeamStatistics';

const initialInfos = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 100,
};

const BusinessRuleCalc = {
  totalPoints: (point1: number, point2: number) => {
    if (point1 === point2) return 1;
    if (point1 > point2) return 3;
    return 0;
  },

  efficiency: (P: number, J: number) => Number(((P / (J * 3)) * 100).toFixed(2)),

  sortByGoalsOwn: (team1: ITeamStatistics, team2: ITeamStatistics) => {
    const equalGoalsOwn = team1.goalsOwn === team2.goalsOwn;
    const minGoalsOwn = team1.goalsOwn - team2.goalsOwn;
    return equalGoalsOwn ? 0 : minGoalsOwn;
  },

  sortByGoalsFavor: (team1: ITeamStatistics, team2: ITeamStatistics) => {
    const equalGoalsFavor = team1.goalsFavor === team2.goalsFavor;
    const minGoalsFavor = team2.goalsFavor - team1.goalsFavor;
    return equalGoalsFavor ? BusinessRuleCalc.sortByGoalsOwn(team1, team2) : minGoalsFavor;
  },

  sortByGoalsBalance: (team1: ITeamStatistics, team2: ITeamStatistics) => {
    const equalGolsBalance = team1.goalsBalance === team2.goalsBalance;
    const minGoalsBalance = team2.goalsBalance - team1.goalsBalance;
    return equalGolsBalance ? BusinessRuleCalc.sortByGoalsFavor(team1, team2) : minGoalsBalance;
  },

  sortByTotalVictories: (team1: ITeamStatistics, team2: ITeamStatistics) => {
    const equalPoints = team1.totalVictories === team2.totalVictories;
    const minPoints = team2.totalVictories - team1.totalVictories;
    return equalPoints ? BusinessRuleCalc.sortByGoalsBalance(team1, team2) : minPoints;
  },

  sortByTotalPoints: (team1: ITeamStatistics, team2: ITeamStatistics) => {
    const equalPoints = team1.totalPoints === team2.totalPoints;
    const minPoints = team2.totalPoints - team1.totalPoints;
    return equalPoints ? BusinessRuleCalc.sortByTotalVictories(team1, team2) : minPoints;
  },

  homeTeamStatistics: (id: number, teamName: string, matches: IMatchesWithTeamName[]) =>
    matches.reduce((acc, curr) => {
      if (!curr.inProgress && curr.homeTeam === id) {
        const points = BusinessRuleCalc.totalPoints(curr.homeTeamGoals, curr.awayTeamGoals);
        acc.name = teamName;
        acc.totalPoints += points;
        acc.totalGames += 1;
        acc.totalVictories += points === 3 ? 1 : 0;
        acc.totalDraws += points === 1 ? 1 : 0;
        acc.totalLosses += points === 0 ? 1 : 0;
        acc.goalsFavor += curr.homeTeamGoals;
        acc.goalsOwn += curr.awayTeamGoals;
        acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
        acc.efficiency = BusinessRuleCalc.efficiency(acc.totalPoints, acc.totalGames);
        return acc;
      }
      return acc;
    }, { ...initialInfos }) as unknown as ITeamStatistics,
};

export default BusinessRuleCalc;
