import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CacheService } from './cache.service';
import { Game, GameFactory, GameResource, TeamResource } from './game';
import { Team } from './game';

import { environment } from '../../environments/environment';


@Injectable()
export class GameService {
  public static readonly API_BASE_URL = environment.apiBaseUrl + '/v1/';
  private CACHE_EXPIRATION_MILLIS = 60 * 1000;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {}

  public getGames(): Observable<Game[]> {
    const url = GameService.API_BASE_URL + 'games/';
    const observable = new Observable<Game[]>(observer => {
      this.httpClient.get<GameResource[]>(url).subscribe(resources => {
        observer.next(GameFactory.createGames(resources));
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }

  public getTeams(): Observable<Team[]> {
    const url = GameService.API_BASE_URL + 'teams/';
    const observable = new Observable<Team[]>(observer => {
      this.httpClient.get<TeamResource[]>(url).subscribe(resources => {
        observer.next(GameFactory.createTeams(resources));
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }

  public getGameById(games: Game[], id: number): Game | null {
    for (const game of games) {
      if (game.id === id) {
        return game;
      }
    }
    return null;
  }
}
