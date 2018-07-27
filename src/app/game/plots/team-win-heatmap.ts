import { Player } from '../../core/game';

declare const require: any;
import * as Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/heatmap')(Highcharts);

import { ElementRef } from '@angular/core';


export class TeamWinHeatmap {

  constructor() { }

  public static createPlot(seriesData, categories, plotElement: ElementRef) {
    const series = TeamWinHeatmap.createSerie(seriesData);
    const plotOptions = TeamWinHeatmap.createPlotOptions(series, categories);
    return Highcharts.chart(plotElement.nativeElement, plotOptions);
  }

  private static createSerie(seriesData) {

    function dataLabelFormatter() {
      return Highcharts.numberFormat(this.point.value, 0) + ' %';
    }

    return [{
      borderWidth: 0,
      borderColor: 'white',
      data: seriesData,
      dataLabels: {
        enabled: true,
        color: '#000000',
        formatter: dataLabelFormatter,
        style: {
          fontSize: 14
        }
      }
    }];
  }

  private static createPlotOptions(series: any[], categories) {

    function tooltipFormatter() {
      const score = this.point.value;
      if (score === null) {
        return 'not available';
      }
      return '<br><b>' + score + '</b>% win<br>'
        + this.series.yAxis.categories[this.point.y] + ' + ' + this.series.xAxis.categories[this.point.x];
    }

    return {
      chart: {
        type: 'heatmap',
        height: window.innerHeight * 0.8,
        backgroundColor: null,
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories,
        labels: {
          style: {
            color: '#000000',
            fontSize: 15,
            fontWeight: 'bold'
          }
        }
      },
      yAxis: {
        categories: categories,
        labels: {
          style: {
            color: '#000000',
            fontSize: 15,
            fontWeight: 'bold'
          }
        },
        title: {
          text: null
        },
      },
      colorAxis: {
        stops: [
          [0, '#c80000'],
          [1, '#00c800']
        ],
      },
      tooltip: {
        formatter: tooltipFormatter
      },
      series: series
    };
  }
}
