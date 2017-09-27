import {IRenderer} from './IRenderer';
import {ChartUtils} from 'app/shared/components/chart/renderer/utils';
import {DataService} from '../../../../services/DataProvider';
import {ChartRendererEnum} from "../../../../state/model/ChartRendererEnum";
declare var CanvasJS: any;

export class CanvasJSRenderer implements IRenderer {

  type: ChartRendererEnum = ChartRendererEnum.CANVASJS;
  _data: any;
  _name: string;
  _chartElement: any;
  _chart: any

  constructor() {
  }

  public init(name: string, element: any, data: DataService) {
    this._chartElement = ChartUtils.createChartElement(name, element);
    this._name = name;
    this._data = data;
  }

  public draw() {

    if (this._chartElement) {
      // const labels = dataset.labels;
      const datasets = this._data;

      const config = {
        zoomEnabled: false,
        animationEnabled: false,
        axisX: {
          // labelFormatter: function(item){
          //   return  _dataParser.millisecondsFormatter(item.value).clock;
          // }
        },
        axisY: {
          includeZero: true
        },
        theme: "theme2",
        toolTip: {
          shared: true
        },

        legend: null,
        data: null
      };

      config.data = datasets.data;

      this._chart = new CanvasJS.Chart(this._name, config);
      this._chart.render();

    }
  }

  destroy() {
    this._chart = null;
    ChartUtils.destroyChartElement(this._chartElement);

  }

}
