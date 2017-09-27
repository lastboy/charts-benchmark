import {ChartRendererEnum} from './ChartRendererEnum';
import {ILog} from "./ILog";

export interface IChart {
  id: string;
  name: string;
  title: string;
  renderer: ChartRendererEnum;
  rendererName: string;
  chartPoints: 0;
  chartSeries: 0;
  log: ILog[];
}

export interface IChartVM {
  data: IChart[];

}
