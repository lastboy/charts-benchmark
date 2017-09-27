import {IRenderer} from './IRenderer';
import {ChartUtils} from 'app/shared/components/chart/renderer/utils';
import {DataService} from "../../../../services/DataProvider";
import {ChartRendererEnum} from "../../../../state/model/ChartRendererEnum";
import Dygraph from 'dygraphs';

export class DygraphRenderer implements IRenderer {
  _chart: any;
  _name: string;
  _data: any;
  type: ChartRendererEnum  = ChartRendererEnum.DYGRAPH;
  _chartElement: any;

  constructor() {}

  public init(name: string, element: any, data: DataService) {
    this._chartElement = ChartUtils.createChartElement(name, element);
    this._data = data;
    this._name = name;
  }

  public draw() {

    if (this._chartElement) {

      let dataset = this._data;

      const labels = dataset.labels;
      const datasets = dataset.data;

      this._chart = new Dygraph(this._chartElement,
        datasets,
        {
          labels: labels,
          labelsSeparateLines: false,
          showLabelsOnHighlight: false
        });

      return this._chart;
    }
  }

  destroy() {
    this._chart.destroy();
    ChartUtils.destroyChartElement(this._chartElement);
  }
}
