import {ChartRendererEnum} from "../../../../state/model/ChartRendererEnum";
import {DataService} from "../../../../services/DataProvider";
import {ChartUtils} from "./utils";
import {IRenderer} from './IRenderer';
import Highcharts from 'highcharts';

export class HighchartsRenderer implements IRenderer {

  type: ChartRendererEnum = ChartRendererEnum.HIGHCHARTS;
  _data: any;
  _name: string;
  _chartElement: any;
  private _chart: any;

  constructor() {}


  public init(name: string, element: any, data: DataService) {
    this._chartElement = ChartUtils.createChartElement(name, element);
    this._name = name;
    this._data = data;
  }

  public draw() {

    let chart;

    if (this._chartElement) {

      let dataset = this._data;

      const labels = dataset.labels;
      const datasets = dataset.data;


      let config = {
        chart: {
          type: 'line'
        },

        xAxis: {
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Snow depth (m)'
          }
        },
        tooltip: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: false
            }
          }
        }
      };

      config['series'] = datasets;
      this._chart = Highcharts.chart(this._name, config);
    }

    return this._chart;
  }

  destroy(){
    this._chart = null;
    ChartUtils.destroyChartElement(this._chartElement);
  }
}
