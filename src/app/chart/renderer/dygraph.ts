import {IRenderer} from './IRenderer';
import {ChartUtils} from 'app/chart/renderer/utils';
import {DataService} from "../../services/DataProvider";
import {ChartRendererEnum} from "../../state/model/ChartRendererEnum";
import Dygraph from 'dygraphs';

export class DygraphRenderer implements IRenderer {
  _name: string;
  _data: DataService;
  type: ChartRendererEnum  = ChartRendererEnum.DYGRAPH;
  _chartElement: any;

  constructor() {}

  public init(name: string, element: any, data: DataService) {
    this._chartElement = ChartUtils.createChartElement(name, element);
    this._data = data;
    this._name = name;
  }

  public draw() {


    let chart;

    if (this._chartElement) {

      let dataset = this._data.getData(this.type);

      const labels = dataset.labels;
      const datasets = dataset.data;

      console.log( datasets, labels);
      chart = new Dygraph(this._chartElement,
        datasets,
        {
          labels: labels,
          labelsSeparateLines: false,
          showLabelsOnHighlight: false
        });

      return chart;
    }
  }
}
