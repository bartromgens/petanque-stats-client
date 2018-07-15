import { Component, OnInit } from '@angular/core';

import { GameService } from '../core/game.service';
import { Game, Team } from '../core/game';


@Component({
  templateUrl: 'teams.component.html',
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  games: Game[];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
    });

    this.gameService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  getTeam(teamId: number): Team | null {
    return GameService.getTeamById(this.teams, teamId);
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
    for (const game of games) {
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
    for (const game of games) {
      if (!game.teamHasWon(team.id)) {
        gamesLost.push(game);
      }
    }
    return gamesLost;
  }

  getPercentageWonForTeam(teamId: number): number {
    const games = this.getGamesForTeam(teamId);
    const gamesWon = this.getGamesWonForTeam(teamId);
    return Math.round(gamesWon.length / games.length * 100.0);
  }

  getPercentageLostForTeam(teamId: number): number {
    const games = this.getGamesForTeam(teamId);
    const gamesWon = this.getGamesLostForTeam(teamId);
    return Math.round(gamesWon.length / games.length * 100.0);
  }
}
