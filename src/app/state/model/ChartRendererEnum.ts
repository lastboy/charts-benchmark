export enum ChartRendererEnum {
  CHARTJS,
  CANVASJS,
  DYGRAPH,
  D3
}

export class ChartRendererUtils {

  public static toString(renderer: ChartRendererEnum) {
    return ChartRendererEnum[renderer];
  }

  public static parse(renderer: string): ChartRendererEnum {
    return ChartRendererEnum[renderer];
  }
}
