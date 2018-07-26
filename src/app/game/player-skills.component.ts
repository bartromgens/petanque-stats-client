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

  //
  // private createSeries() {
  //   const series = [];
  //   let counter = 0;
  //   for (const player of this.players) {
  //     const serie = this.createSerie(player.user.username, counter);
  //     series.push(serie.lineSerie);
  //     series.push(serie.rangeSerie);
  //     counter++;
  //   }
  //   return series;
  // }
  //
  // private static createPlotDate(ratings: any[], playerName: string) {
  //   const means = [];
  //   const ranges = [];
  //   let counter = 0;
  //   let mean = 0;
  //   for (let i = 0; i < ratings.length; i++) {
  //     if (ratings[i].player !== playerName) {
  //       continue;
  //     }
  //     const meanPrevious = mean;
  //     mean = ratings[i].rank;
  //     if (counter > 0 && i < ratings.length - 3 && Math.abs(mean - meanPrevious) < 0.00001) {
  //       counter++;
  //       continue;
  //     }
  //     means.push([counter, mean]);
  //     ranges.push(
  //       [
  //         counter,
  //         mean - ratings[i].sigma * PlayerSkillsComponent.SIGMA_FACTOR,
  //         mean + ratings[i].sigma * PlayerSkillsComponent.SIGMA_FACTOR
  //       ]
  //     );
  //     counter++;
  //   }
  //
  //   return { ranges: ranges, means: means };
  // }
  //
  // private createSerie(playerName: string, colorIndex: number) {
  //   const plotData = PlayerSkillsComponent.createPlotDate(this.ratings, playerName);
  //   const lineSerie = {
  //     data: plotData.means,
  //     name: playerName,
  //     type: 'spline',
  //     animation: true,
  //     lineWidth: 3,
  //     colorIndex: colorIndex,
  //     zIndex: 2,
  //     marker: {
  //       // fillColor: 'white',
  //       // lineColor: '#16315A',
  //       symbol: 'circle',
  //       lineWidth: 0,
  //       radius: 4,
  //       states: {
  //         hover: {
  //           fillColor: 'white',
  //           lineColor: '#16315A',
  //           lineWidth: 2,
  //           radius: 5
  //         }
  //       }
  //     },
  //     cursor: 'pointer',
  //     turboThreshold: 0,
  //   };
  //
  //   const rangeSerie = {
  //     data: plotData.ranges,
  //     type: 'areasplinerange',
  //     zIndex: 1,
  //     animation: true,
  //     lineWidth: 0,
  //     linkedTo: ':previous',
  //     colorIndex: colorIndex,
  //     fillOpacity: 0.2,
  //     states: {
  //       hover: {
  //         enabled: false,
  //       }
  //     },
  //     turboThreshold: 0,
  //     marker: {
  //       enabled: false
  //     },
  //     enableMouseTracking: false
  //   };
  //
  //   return {'lineSerie': lineSerie, 'rangeSerie': rangeSerie};
  // }
  //
  // private static createPlotOptions(series: any[]) {
  //   return {
  //     chart: {
  //       height: window.innerHeight * 0.7,
  //       backgroundColor: null,
  //       zoomType: 'xy'
  //     },
  //     title: {
  //       text: null
  //     },
  //     credits: {
  //       enabled: false
  //     },
  //     legend: {
  //       align: 'right',
  //       verticalAlign: 'top',
  //       layout: 'horizontal',
  //       floating: true,
  //     },
  //     xAxis: {
  //       // type: 'datetime',
  //       // dateTimeLabelFormats: {
  //       //   day: '%b %e'
  //       // },
  //       gridLineWidth: 0,
  //       lineColor: '#000000',
  //       crosshair: {
  //         width: 1,
  //         color: '#000000'
  //       },
  //       labels: {
  //         style: {
  //           color: '#000000',
  //           fontSize: '13px'
  //         }
  //       },
  //       tickLength: 0
  //     },
  //     yAxis: {
  //       gridLineWidth: 0,
  //       title: {
  //         text: null
  //       },
  //       labels: {
  //         style: {
  //           color: '#000000',
  //           fontSize: '13px'
  //         }
  //       }
  //     },
  //     tooltip: {
  //       split: true,
  //       formatter: function() {
  //         const tooltipHtmls = [];
  //         tooltipHtmls.push(this.x);
  //         for (const point of this.points) {
  //           let tooltipHtml = '';
  //           const color = Highcharts.getOptions().colors[point.series.colorIndex];
  //           tooltipHtml += '<div style="width: 100px;">';
  //           tooltipHtml += '<span class="font-weight-bold">' + point.series.name + '</span>';
  //           tooltipHtml += '<span class="font-weight-bold float-right">' + Highcharts.numberFormat(point.y, 1) + '</span><br/>';
  //           tooltipHtml += '</div>';
  //           tooltipHtmls.push(tooltipHtml);
  //         }
  //         return tooltipHtmls;
  //       },
  //       useHTML: true,
  //     },
  //     series: series
  //   };
  // }
}

