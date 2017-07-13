import {IRenderer} from './IRenderer';
import {ChartUtils} from 'app/chart/renderer/utils';
import {DataService} from '../../services/DataProvider';
import {ChartRendererEnum} from "../../state/model/ChartRendererEnum";
declare var CanvasJS: any;

export class CanvasJSRenderer implements IRenderer {
  type: ChartRendererEnum = ChartRendererEnum.CANVASJS;
  _data: DataService;
  _name: string;
  _chartElement: any;

  constructor() {
  }

  public init(name: string, element: any, data: DataService) {
    this._chartElement = ChartUtils.createChartElement(name, element);
    this._name = name;
    this._data = data;
  }

  public draw() {

    if (this._chartElement) {
      let dataset = this._data.getData(this.type);

      // const labels = dataset.labels;
      const datasets = dataset.data;

      const config = {
        zoomEnabled: false,
        animationEnabled: true,
        axisX: {
          // labelFormatter: function(item){
          //   return  _dataParser.millisecondsFormatter(item.value).clock;
          // }
        },
        axisY: {
          includeZero: true,
          minimum: 0
        },
        theme: "theme2",
        toolTip: {
          shared: true
        },

        legend: null,
        data: null
      };

      config.data = datasets;

      const chart = new CanvasJS.Chart(this._name, config);
      chart.render();

    }
  }

}
