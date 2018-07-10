
export interface GameResource {
  id: number;
  url: string;
  max_score: number;
  teams: TeamResource[];
  scores: TeamScoreResource[];
}


export interface TeamResource {
  id: number;
  url: string;
  players: PlayerResource[];
}


export interface PlayerResource {
  id: number;
  url: string;
  user: UserResource;
}


export interface UserResource {
  id: number;
  url: string;
  email: string;
  username: string;
}


export interface TeamScoreResource {
  id: number;
  url: string;
  score: number;
  team_id: number;
}


export class Game {
  id: number;
  url: string;
  maxScore: number;
  teams: Team[] = [];
  scores: TeamScore[] = [];

  public static fromResource(resource: GameResource): Game {
    console.log('Game::fromResource', resource);
    const game = new Game();
    game.id = resource.id;
    game.url = resource.url;
    game.maxScore = resource.max_score;
    for (const team of resource.teams) {
      game.teams.push(Team.fromResource(team));
    }
    for (const score of resource.scores) {
      game.scores.push(TeamScore.fromResource(score));
    }
    for (const team of game.teams) {
      team.score = game.getScoreForTeam(team.id);
    }
    return game;
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
    const team: TeamScore = this.getScoreForTeam(teamId);
    if (!team) {
      return false;
    }
    return team.score === this.maxScore;
  }
}


export class Team {
  id: number;
  url: string;
  players: Player[] = [];
  score: TeamScore;

  static fromResource(resource: TeamResource): Team {
    console.log('Team::fromResource', resource);
    const team = new Team();
    team.id = resource.id;
    team.url = resource.url;
    console.log(resource.players);
    for (const player of resource.players) {
      team.players.push(Player.fromResource(player));
    }
    return team;
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
  id: number;
  url: string;
  user: User;

  static fromResource(resource: PlayerResource): Player {
    console.log('Player::fromResource', resource);
    const player = new Player();
    player.id = resource.id;
    player.url = resource.url;
    player.user = User.fromResource(resource.user);
    return player;
  }

  displayName(): string {
    return this.user.username;
  }
}


export class User {
  id: number;
  url: string;
  username: string;
  email: string;

  static fromResource(resource: UserResource): User {
    console.log('User::fromResource', resource);
    const user = new User();
    user.id = resource.id;
    user.url = resource.url;
    user.username = resource.username;
    user.email = resource.email;
    return user;
  }
}


export class TeamScore {
  id: number;
  url: string;
  score: number;
  team_id: number;

  static fromResource(resource: TeamScoreResource): TeamScore {
    console.log('TeamScore::fromResource', resource);
    const teamScore = new TeamScore();
    teamScore.id = resource.id;
    teamScore.url = resource.url;
    teamScore.score = resource.score;
    teamScore.team_id = resource.team_id;
    return teamScore;
  }
}


export namespace GameFactory {
  export function createGame(resource: GameResource): Game {
    return Game.fromResource(resource);
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
      teams.push(Team.fromResource(resource));
    }
    return teams;
  }

  export function createPlayers(resources: PlayerResource[]): Player[] {
    const players = [];
    for (const resource of resources) {
      players.push(Player.fromResource(resource));
    }
    return players;
  }
}
