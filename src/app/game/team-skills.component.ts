import { PlayerRangePlot } from './plots/player-range-plot';

declare const require: any;
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '../core/game.service';
import { Game, Player, Team } from '../core/game';
import { TeamWinHeatmap } from './plots/team-win-heatmap';


@Component({
  selector: 'app-team-skills',
  templateUrl: 'team-skills.html',
})
export class TeamSkillsComponent implements OnInit {
  players: Player[];
  teams: Team[];
  games: Game[];

  constructor(private gameService: GameService, private route: ActivatedRoute) {}
  @ViewChild('teamWinHeatmapPlot') plotRankElement: ElementRef;

  ngOnInit(): void {
    this.gameService.getPlayers().subscribe(players => {
      this.players = players;
      this.gameService.getGames().subscribe(games => {
        this.games = games;
        this.gameService.getTeams().subscribe(teams => {
          this.teams = teams;
          let counterX = 0;
          const categories = [];
          const seriesData = [];
          for (const playerA of this.players) {
            let counterY = 0;
            let nTeamGames = 0;
            for (const playerB of this.players) {
              const team = this.getTeamForPlayers(playerA, playerB);
              if (team) {
                nTeamGames = this.getGamesForTeam(team.id).length;
                const ratioWon = this.getGamesWonForTeam(team.id).length / nTeamGames;
                const percentageWon = Math.round(ratioWon * 100);
                seriesData.push([counterX, counterY, percentageWon]);
              } else {
                seriesData.push([counterX, counterY, null]);
              }
              counterY++;
            }
            categories.push(playerA.displayName());
            counterX++;
          }
          console.log(categories);
          this.createPlot(seriesData, categories);
        });
      });
    });
  }

  private getTeamForPlayers(playerA: Player, playerB: Player) {
    if (playerA.id === playerB.id) {
      return null;
    }
    for (const team of this.teams) {
      if (team.hasPlayer(playerA) && team.hasPlayer(playerB)) {
        return team;
      }
    }
    return null;
  }

  private createPlot(seriesData, categories) {
    const plot = TeamWinHeatmap.createPlot(seriesData, categories, this.plotRankElement);
  }

  private getGamesForTeam(teamId: number): Game[] {
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

  private getGamesWonForTeam(teamId: number): Game[] {
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

  private getTeam(teamId: number): Team | null {
    return GameService.getTeamById(this.teams, teamId);
  }
}

