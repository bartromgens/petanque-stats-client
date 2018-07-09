
export interface GameResource {
  id: number;
  url: string;
  max_score: number;
  teams: TeamResource[];
  scores: any[];
}


export interface TeamResource {
  id: number;
  url: string;
  players: Player[];
}


export class Game {
  id: number;
  url: string;
  max_score: number;
  teams: Team[] = [];
  scores: TeamScore[] = [];

  constructor(resource: GameResource) {
    this.id = resource.id;
    this.url = resource.url;
    this.max_score = resource.max_score;
    for (const team of resource.teams) {
      this.teams.push(new Team(team));
    }
    for (const team of resource.scores) {
      this.scores.push(new TeamScore(team));
    }
    for (const team of this.teams) {
      team.score = this.getScoreForTeam(team.id);
    }
  }

  getScoreForTeam(teamId: number): TeamScore {
    for (const score of this.scores) {
      if (score.team_id === teamId) {
        return score;
      }
    }
    return null;
  }

  teamHasWon(teamId: number): boolean {
    return this.getScoreForTeam(teamId).score === this.max_score;
  }
}


export class Team {
  id: number;
  url: string;
  players: Player[] = [];
  score: TeamScore;

  constructor(resource: TeamResource) {
    this.id = resource.id;
    this.url = resource.url;
    for (const player of resource.players) {
      this.players.push(new Player(player));
    }
  }

  displayName(): string {
    let name = '';
    for (const player of this.players) {
      name += player.user.username + ' ';
    }
    return name;
  }
}


export class Player {
  url: string;
  user: User;

  constructor(resource: any) {
    this.url = resource.url;
    this.user = new User(resource.user);
  }
}


export class User {
  id: number;
  url: string;
  username: string;

  constructor(resource: any) {
    this.id = resource.id;
    this.url = resource.url;
    this.username = resource.username;
  }
}


export class TeamScore {
  id: number;
  url: string;
  score: number;
  team_id: number;

  constructor(resource: any) {
    this.id = resource.id;
    this.url = resource.url;
    this.score = resource.score;
    this.team_id = resource.team_id;
  }
}


export namespace GameFactory {
  export function createGame(resource: GameResource): Game {
    return new Game(resource);
  }

  export function createGames(resources: GameResource[]): Game[] {
    const games = [];
    for (const resource of resources) {
      games.push(createGame(resource));
    }
    return games;
  }

  export function createTeams(resources: TeamResource[]): Team[] {
    const teams = [];
    for (const resource of resources) {
      teams.push(new Team(resource));
    }
    return teams;
  }
}
