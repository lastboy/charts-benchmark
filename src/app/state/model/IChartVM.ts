import {ChartRendererEnum} from './ChartRendererEnum';

export interface IChart {
  id: string;
  title: string;
  renderer: ChartRendererEnum;
}

export interface IChartVM {
  data: IChart[];
}
