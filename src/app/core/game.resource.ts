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
