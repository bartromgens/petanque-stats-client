import { BaseResource, GameResource, PlayerResource, TeamResource, TeamScoreResource, UserResource } from './game.resource';


export namespace ObjectFactory {
  export function create<T extends BaseObject>(c: {new(): T; }): T {
    return new c();
  }

  export function createFromResource<T extends BaseObject>(c: {new(): T; }, resource: BaseResource): T {
    const object = new c();
    return object.fromResource(resource, object) as T;
  }

  export function createFromResources<T extends BaseObject>(c: {new(): T; }, resources: BaseResource[]): T[] {
    const objects = [];
    for (const resource of resources) {
      objects.push(createFromResource(c, resource));
    }
    return objects;
  }
}


export abstract class BaseObject {
  id: number;
  url: string;

  protected abstract doCreateFromResource(resource: BaseResource, baseObject: BaseObject);

  public fromResource(resource: BaseResource, object: BaseObject) {
    BaseObject.setBaseProperties(resource, object);
    this.doCreateFromResource(resource, object);
    return object;
  }

  private static setBaseProperties(resource: BaseResource, baseObject: BaseObject) {
    baseObject.id = resource.id;
    baseObject.url = resource.url;
  }
}


export class Game extends BaseObject {
  maxScore: number;
  teams: Team[] = [];
  scores: TeamScore[] = [];

  protected doCreateFromResource(resource: GameResource, game: Game) {
    game.maxScore = resource.max_score;
    game.teams = ObjectFactory.createFromResources(Team, resource.teams);
    game.scores = ObjectFactory.createFromResources(TeamScore, resource.scores);
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

  protected doCreateFromResource(resource: TeamResource, team: Team) {
    team.players = ObjectFactory.createFromResources(Player, resource.players);
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

  protected doCreateFromResource(resource: PlayerResource, player: Player) {
    player.user = ObjectFactory.createFromResource(User, resource.user);
  }

  displayName(): string {
    return this.user.username;
  }
}


export class User extends BaseObject {
  username: string;
  email: string;

  protected doCreateFromResource(resource: UserResource, user: User) {
    user.username = resource.username;
    user.email = resource.email;
  }
}


export class TeamScore extends BaseObject {
  score: number;
  team_id: number;

  protected doCreateFromResource(resource: TeamScoreResource, teamScore: TeamScore) {
    teamScore.score = resource.score;
    teamScore.team_id = resource.team_id;
  }
}
