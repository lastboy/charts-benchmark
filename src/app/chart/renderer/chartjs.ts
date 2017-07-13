import {IRenderer} from './IRenderer';
import {ChartUtils} from 'app/chart/renderer/utils';
import * as Chart from 'chart.js';
import {DataService} from "../../services/DataProvider";
import {ChartRendererEnum} from "../../state/model/ChartRendererEnum";

export class ChartJS implements IRenderer {
  type: ChartRendererEnum = ChartRendererEnum.CHARTJS;
  _data: DataService;
  _name: string;
  _chartElement: any;

  constructor() {}


  public init(name: string, element: any, data: DataService) {
    this._chartElement = ChartUtils.createChartElement(name, element, 'canvas');
    this._name = name;
    this._data = data;
  }

  public draw() {

    let chart;

    if (this._chartElement) {

      let dataset = this._data.getData(this.type);

      const ctx = this._chartElement.getContext('2d');
      const labels = dataset.labels;
      const datasets = dataset.data;

      const dataitem = {
        fill: false
      };

      datasets.forEach((item) => {
        Object.assign(item, dataitem);
      });

      if (labels && datasets) {
        const config = {
          type: 'line',
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            elements: {
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 5,
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            title: {
              text: "Chart.js Time Scale"
            },
            tooltips: {
              enabled: false,
              mode: 'index'
            }

          }
        };

        chart = new Chart(ctx, config);
      }


      return chart
    }
    return null;

  }
}
