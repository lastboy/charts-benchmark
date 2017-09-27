import {Action} from '@ngrx/store';
import {type} from '../../utils';
import {IChart} from '../model/IChartVM';

export const ActionTypes = {
  ADD_CHART: type('[chart] add chart'),
  REMOVE_CHART: type('[chart] remove chart'),
  UPDATE_CHART: type('[chart] update chart'),
  SET_CHARTS: type('[chart] set charts'),
  WIPE_CHARTS: type('[chart] wipe charts'),
  LOG: type('[chart] add log entry')
};

export class SetChartAction implements Action {
  type: string;
  constructor(public payload: IChart[]) {
    this.type = ActionTypes.SET_CHARTS;
  }
}

export class WipeChartAction implements Action {
  type: string;
  constructor() {
    this.type = ActionTypes.WIPE_CHARTS;
  }
}

export class AddChartAction implements Action {
  type: string;
  constructor(public payload: IChart) {
    this.type = ActionTypes.ADD_CHART;
  }
}

export class RemoveChartAction implements Action {
  type: string;
  constructor(public payload: IChart) {
    this.type = ActionTypes.REMOVE_CHART;
  }
}

export class UpdateChartStatusAction implements Action {
  type: string;
  constructor(public payload) {
    this.type = ActionTypes.UPDATE_CHART;
  }
}

export class logAction implements Action {
  type: string;
  constructor(public payload) {
    this.type = ActionTypes.LOG;
  }
}

export type Actions = AddChartAction
  | RemoveChartAction
  | UpdateChartStatusAction
  | logAction;
