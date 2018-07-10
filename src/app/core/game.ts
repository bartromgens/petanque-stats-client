
export interface BaseResource {
  id: number;
  url: string;
}

export interface GameResource extends BaseResource {
  max_score: number;
  teams: TeamResource[];
  scores: TeamScoreResource[];
}


export interface TeamResource extends BaseResource  {
  players: PlayerResource[];
}


export interface PlayerResource extends BaseResource  {
  user: UserResource;
}


export interface UserResource extends BaseResource  {
  email: string;
  username: string;
}


export interface TeamScoreResource extends BaseResource  {
  score: number;
  team_id: number;
}


export abstract class BaseObject {
  id: number;
  url: string;

  private static setBaseProperties(resource: BaseResource, baseObject: BaseObject) {
    baseObject.id = resource.id;
    baseObject.url = resource.url;
  }

  protected abstract createObject(): BaseObject;

  protected abstract doCreateFromResource(resource: BaseResource, baseObject: BaseObject);

  public fromResource(resource: BaseResource): BaseObject {
    const object = this.createObject();
    BaseObject.setBaseProperties(resource, object);
    object.doCreateFromResource(resource, object);
    return object;
  }

  public fromResources(resources: BaseResource[]): BaseObject[] {
    const objects = [];
    for (const resource of resources) {
      objects.push(this.fromResource(resource));
    }
    return objects;
  }
}


export class Game extends BaseObject {
  maxScore: number;
  teams: Team[] = [];
  scores: TeamScore[] = [];

  protected createObject(): Game {
    return Game.createObject();
  }

  static createObject(): Game {
    return new Game();
  }

  protected doCreateFromResource(resource: GameResource, game: Game) {
    game.maxScore = resource.max_score;
    game.teams = GameFactory.createTeams(resource.teams);
    game.scores = new TeamScore().fromResources(resource.scores) as TeamScore[];
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


export class Team extends BaseObject {
  players: Player[] = [];
  score: TeamScore;

  protected createObject(): Team {
    return Team.createObject();
  }

  static createObject(): Team {
    return new Team();
  }

  protected doCreateFromResource(resource: TeamResource, team: Team) {
    for (const player of resource.players) {
      team.players.push(new Player().fromResource(player) as Player);
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


export class Player extends BaseObject {
  user: User;

  protected createObject(): Player {
    return Player.createObject();
  }

  static createObject(): Player {
    return new Player();
  }

  protected doCreateFromResource(resource: PlayerResource, player: Player) {
    player.user = new User().fromResource(resource.user) as User;
  }

  displayName(): string {
    return this.user.username;
  }
}


export class User extends BaseObject {
  username: string;
  email: string;

  protected createObject(): User {
    return User.createObject();
  }

  static createObject(): User {
    return new User();
  }

  protected doCreateFromResource(resource: UserResource, user: User) {
    user.username = resource.username;
    user.email = resource.email;
  }
}


export class TeamScore extends BaseObject {
  score: number;
  team_id: number;

  protected createObject(): TeamScore {
    return TeamScore.createObject();
  }

  static createObject(): TeamScore {
    return new TeamScore();
  }

  protected doCreateFromResource(resource: TeamScoreResource, teamScore: TeamScore) {
    teamScore.score = resource.score;
    teamScore.team_id = resource.team_id;
  }
}


export namespace GameFactory {
  export function createGames(resources: GameResource[]): Game[] {
    return new Game().fromResources(resources) as Game[];
  }

  export function createTeams(resources: TeamResource[]): Team[] {
    return new Team().fromResources(resources) as Team[];
  }

  export function createPlayers(resources: PlayerResource[]): Player[] {
    return new Player().fromResources(resources) as Player[];
  }
}
