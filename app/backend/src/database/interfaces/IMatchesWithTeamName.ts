import IMatches from './IMatches';

interface IMatchesWithTeamName extends IMatches {
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

export default IMatchesWithTeamName;
