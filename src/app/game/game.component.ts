import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '../core/game.service';
import { Game, Team } from '../core/game';


@Component({
  templateUrl: 'game.component.html',
})
export class GameComponent implements OnInit {
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

  getTeam(teamId: number): Team | null {
    for (const team of this.teams) {
      if (team.id === teamId) {
        return team;
      }
    }
    return null;
  }

  getGamesForTeam(teamId: number): Game[] {
    const games = [];
    for (const game of this.games) {
      for (const team of game.teams) {
        if (team.id === teamId) {
          games.push(game);
        }
      }
    }
    return games;
  }

  getGamesWonForTeam(teamId: number): Game[] {
    const games = this.getGamesForTeam(teamId);
    const team = this.getTeam(teamId);
    const gamesWon = [];
    for (const game of this.games) {
      if (game.teamHasWon(team.id)) {
        gamesWon.push(game);
      }
    }
    return gamesWon;
  }

  getGamesLostForTeam(teamId: number): Game[] {
    const games = this.getGamesForTeam(teamId);
    const team = this.getTeam(teamId);
    const gamesLost = [];
    for (const game of this.games) {
      if (!game.teamHasWon(team.id)) {
        gamesLost.push(game);
      }
    }
    return gamesLost;
  }
}
