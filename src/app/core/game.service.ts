import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

import { Game, ObjectFactory, Player, Team } from './game';
import { GameResource, PlayerResource, TeamResource } from './game.resource';


@Injectable()
export class GameService {
  public static readonly API_BASE_URL = environment.apiBaseUrl + '/v1/';
  private CACHE_EXPIRATION_MILLIS = 60 * 1000;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {}

  public getGames(): Observable<Game[]> {
    const url = GameService.API_BASE_URL + 'games/';
    const observable = new Observable<Game[]>(observer => {
      this.httpClient.get<GameResource[]>(url).subscribe(resources => {
        observer.next(ObjectFactory.createFromResources(Game, resources));
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }

  public createGame(gameData): Observable<any> {
    const url = GameService.API_BASE_URL + 'games/';
    return this.httpClient.post(url, gameData);
  }

  // TODO: move to team service
  public getTeams(): Observable<Team[]> {
    const url = GameService.API_BASE_URL + 'teams/';
    const observable = new Observable<Team[]>(observer => {
      this.httpClient.get<TeamResource[]>(url).subscribe(resources => {
        observer.next(ObjectFactory.createFromResources(Team, resources));
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }

  // TODO: move to player service
  public getPlayers(): Observable<Player[]> {
    const url = GameService.API_BASE_URL + 'players/';
    const observable = new Observable<Player[]>(observer => {
      this.httpClient.get<PlayerResource[]>(url).subscribe(resources => {
        observer.next(ObjectFactory.createFromResources(Player, resources));
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }

  public static getGameById(games: Game[], id: number): Game | null {
    for (const game of games) {
      if (game.id === id) {
        return game;
      }
    }
    return null;
  }

  public static getTeamById(teams: Team[], id: number): Team | null {
    for (const team of teams) {
      if (team.id === id) {
        return team;
      }
    }
    return null;
  }
}
