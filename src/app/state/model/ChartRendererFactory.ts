import {ChartRendererEnum} from "./ChartRendererEnum";
import {IRenderer} from "../../chart/renderer/IRenderer";
import {CanvasJSRenderer} from "../../chart/renderer/canvasjs";
import {ChartJS} from "../../chart/renderer/chartjs";
import {DygraphRenderer} from "../../chart/renderer/dygraph";

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
    }
    return irenderer;
  }

}
