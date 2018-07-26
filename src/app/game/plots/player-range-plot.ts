import { Player } from '../../core/game';

declare const require: any;
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);

import { ElementRef } from '@angular/core';


export class PlayerRangePlot {
  private static SIGMA_FACTOR = 0.2;

  public static createPlot(players: Player[], ratings: any[], valueKey: string, plotElement: ElementRef) {
    const series = PlayerRangePlot.createSeries(players, ratings, valueKey);
    const plotOptions = PlayerRangePlot.createPlotOptions(series);
    return Highcharts.chart(plotElement.nativeElement, plotOptions);
  }

  private static createSeries(players: Player[], ratings, valueKey: string) {
    const series = [];
    let counter = 0;
    for (const player of players) {
      const serie = this.createSerie(ratings, player.user.username, valueKey, counter);
      series.push(serie.lineSerie);
      series.push(serie.rangeSerie);
      counter++;
    }
    return series;
  }

  private static createPlotDate(ratings: any[], playerName: string, valueKey: string) {
    const means = [];
    const ranges = [];
    let counter = 0;
    let mean = 0;
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].player !== playerName) {
        continue;
      }
      const meanPrevious = mean;
      mean = ratings[i][valueKey];
      const nPlayers = 7; // TODO: actual number of players
      if (counter > 0 && i < ratings.length - nPlayers && Math.abs(mean - meanPrevious) < 0.001) {
        counter++;
        continue;
      }
      means.push([counter, mean]);
      ranges.push(
        [
          counter,
          mean - ratings[i].sigma * PlayerRangePlot.SIGMA_FACTOR,
          mean + ratings[i].sigma * PlayerRangePlot.SIGMA_FACTOR
        ]
      );
      counter++;
    }

    return {ranges: ranges, means: means};
  }

  private static createSerie(ratings: any[], playerName: string, valueKey: string, colorIndex: number) {
    const plotData = PlayerRangePlot.createPlotDate(ratings, playerName, valueKey);
    const lineSerie = {
      data: plotData.means,
      name: playerName,
      type: 'spline',
      animation: true,
      lineWidth: 3,
      colorIndex: colorIndex,
      zIndex: 2,
      marker: {
        // fillColor: 'white',
        // lineColor: '#16315A',
        symbol: 'circle',
        lineWidth: 0,
        radius: 4,
        states: {
          hover: {
            fillColor: 'white',
            lineColor: '#16315A',
            lineWidth: 2,
            radius: 5
          }
        }
      },
      cursor: 'pointer',
      turboThreshold: 0,
    };

    const rangeSerie = {
      data: plotData.ranges,
      type: 'areasplinerange',
      zIndex: 1,
      animation: true,
      lineWidth: 0,
      linkedTo: ':previous',
      colorIndex: colorIndex,
      fillOpacity: 0.2,
      states: {
        hover: {
          enabled: false,
        }
      },
      turboThreshold: 0,
      marker: {
        enabled: false
      },
      enableMouseTracking: false
    };

    return {'lineSerie': lineSerie, 'rangeSerie': rangeSerie};
  }

  private static createPlotOptions(series: any[]) {
    return {
      chart: {
        height: window.innerHeight * 0.8,
        backgroundColor: null,
        zoomType: 'xy'
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'horizontal',
        floating: true,
      },
      xAxis: {
        // type: 'datetime',
        // dateTimeLabelFormats: {
        //   day: '%b %e'
        // },
        gridLineWidth: 0,
        lineColor: '#000000',
        crosshair: {
          width: 1,
          color: '#000000'
        },
        labels: {
          style: {
            color: '#000000',
            fontSize: '13px'
          }
        },
        tickLength: 0
      },
      yAxis: {
        gridLineWidth: 0,
        title: {
          text: null
        },
        labels: {
          style: {
            color: '#000000',
            fontSize: '13px'
          }
        }
      },
      tooltip: {
        split: true,
        formatter: function () {
          const tooltipHtmls = [];
          tooltipHtmls.push(this.x);
          for (const point of this.points) {
            let tooltipHtml = '';
            const color = Highcharts.getOptions().colors[point.series.colorIndex];
            tooltipHtml += '<div style="width: 100px;">';
            tooltipHtml += '<span class="font-weight-bold">' + point.series.name + '</span>';
            tooltipHtml += '<span class="font-weight-bold float-right">' + Highcharts.numberFormat(point.y, 1) + '</span><br/>';
            tooltipHtml += '</div>';
            tooltipHtmls.push(tooltipHtml);
          }
          return tooltipHtmls;
        },
        useHTML: true,
      },
      series: series
    };
  }
}