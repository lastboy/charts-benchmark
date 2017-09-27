import {DataService} from "../../../../services/DataProvider";
import {ChartRendererEnum} from "../../../../state/model/ChartRendererEnum";
export interface IRenderer {
  type: ChartRendererEnum;
  draw();
  init(name: string, element: any, data: DataService );
  destroy();
}
