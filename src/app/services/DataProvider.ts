import {Injectable} from "@angular/core";
import {ChartRendererEnum} from "../state/model/ChartRendererEnum";
import {DataFormatter} from "./DataFormatter";

@Injectable()
export class DataService {

  private _dataformatter = new DataFormatter();

  constructor(){}

  public getData(renderer: ChartRendererEnum) {
    return this._dataformatter.format(renderer);
  }




}
