import {ChartRendererEnum} from "./ChartRendererEnum";
import {IRenderer} from "../../shared/components/chart/renderer/IRenderer";
import {CanvasJSRenderer} from "../../shared/components/chart/renderer/canvasjs";
import {ChartJS} from "../../shared/components/chart/renderer/chartjs";
import {DygraphRenderer} from "../../shared/components/chart/renderer/dygraph";
import {HighchartsRenderer} from "../../shared/components/chart/renderer/highcharts";

export class ChartRendererFactory {

  public static instance(renderer: ChartRendererEnum): IRenderer {
    let irenderer: IRenderer;

    switch (renderer) {
      case ChartRendererEnum.CANVASJS: {
        irenderer = new CanvasJSRenderer();
        break;
      }
      case ChartRendererEnum.CHARTJS: {
        irenderer = new ChartJS();
        break;
      }
      case ChartRendererEnum.DYGRAPH: {
        irenderer = new DygraphRenderer();
        break;
      }
      case ChartRendererEnum.HIGHCHARTS: {
        irenderer = new HighchartsRenderer();
        break;
      }
    }
    return irenderer;
  }

}
