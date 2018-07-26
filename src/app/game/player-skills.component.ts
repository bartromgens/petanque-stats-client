import { PlayerRangePlot } from './plots/player-range-plot';

declare const require: any;
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '../core/game.service';
import { Player } from '../core/game';


@Component({
  templateUrl: 'player-skills.component.html',
})
export class PlayerSkillsComponent implements OnInit {
  ratings = [];
  players: Player[];

  constructor(private gameService: GameService, private route: ActivatedRoute) {}
  @ViewChild('playerTrueSkillRankHistoryPlot') plotRankElement: ElementRef;
  @ViewChild('playerTrueSkillSkillHistoryPlot') plotSkillElement: ElementRef;

  ngOnInit(): void {
    this.gameService.getPlayers().subscribe(players => {
      this.players = players;

      this.gameService.getTrueSkillPlayerRatingHistory().subscribe(ratings => {
        this.ratings = ratings['player_rating_history'];
        this.createRankPlot();
        this.createSkillPlot();
      });
    });
  }

  public createRankPlot() {
    const valueKey = 'rank';
    const plot = PlayerRangePlot.createPlot(this.players, this.ratings, valueKey, this.plotRankElement);
  }

  public createSkillPlot() {
    const valueKey = 'skill';
    const plot = PlayerRangePlot.createPlot(this.players, this.ratings, valueKey, this.plotSkillElement);
  }
}

