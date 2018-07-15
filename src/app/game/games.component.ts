import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '../core/game.service';
import { Game, Team } from '../core/game';


@Component({
  templateUrl: 'games.component.html',
})
export class GamesComponent implements OnInit {
  games: Game[];
  teams: Team[];

  constructor(private gameService: GameService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      console.log(this.games);
    });

    this.gameService.getTeams().subscribe(teams => {
      this.teams = teams;
      console.log(this.teams);
    });
  }
}
