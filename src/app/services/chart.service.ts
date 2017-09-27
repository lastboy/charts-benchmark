
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {IChart} from "../state/model/IChartVM";

import * as appstate from '../app.state'
import * as chartActions from '../state/chart/chart.actions';
import * as uuid from 'uuid/v4';
import {Storage} from "../utils/Storage";
import {ChartRendererUtils} from "../state/model/ChartRendererEnum";
import {ILog} from "../state/model/ILog";
import {Observable} from "rxjs/Observable";


@Injectable()
export class ChartService {
  _log: Observable<any>;

  STORAGE_NAME = "chart.benchmark";
  _storage = new Storage(this.STORAGE_NAME);
  _chartObserver: any;
  _map: {[key: string]: IChart} = {};

  constructor(private store: Store<appstate.State>) {

    this._load();
    this._chartObserver = this.store.select(state => state.chart.data);
    this._chartObserver.subscribe(data => {
      this._save(data);
    });

    this.store.select(appstate.getChartLogs);
  }

  public getCharts() {
    return this._chartObserver;
  }

  public getChart(id: string) {
    return this._map[id];
  }

  public addLog(id: string, log: ILog) {
    this.store.dispatch(new chartActions.logAction({
      id: id,
      log: log
    }));
  }

  public log() {
    return this._log;
  }

  public addChart(values: Object) {

    let data  = <IChart> values;
    data.id = uuid();
    data.name = data.id.split("-").join("");
    data.rendererName = ChartRendererUtils.toString(data.renderer);

    this.store.dispatch(new chartActions.AddChartAction(data));
  }

  public removeChart(id: string) {
    let item = this._map[id];
    if (item) {
      this.store.dispatch(new chartActions.RemoveChartAction(item));
    }
  }

  public wipe() {
    this._map = {};
    this.store.dispatch(new chartActions.WipeChartAction());
    this._storage.delete();
  }


  private _load() {
    let data = this._storage.get();
    if (data) {
      this.store.dispatch(new chartActions.SetChartAction(data));
    }
  }

  private _save(data) {
    this._storage.set(data);

    // indexing
    data.forEach((item, idx) => {

      this._map[item.id] = item;
    });

  }


}


