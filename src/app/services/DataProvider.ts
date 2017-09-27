import {Injectable} from "@angular/core";
import {ChartRendererEnum} from "../state/model/ChartRendererEnum";
import {DataFormatter} from "./DataFormatter";

export interface MetaDataProvider {
  renderer: ChartRendererEnum,
  series: number,
  points: number
}

@Injectable()
export class DataService {

  private _dataformatter = new DataFormatter();

  public getData(metadata: MetaDataProvider) {
    return this._dataformatter.format(metadata);
  }

}
