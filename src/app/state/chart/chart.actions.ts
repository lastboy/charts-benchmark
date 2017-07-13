import {Action} from '@ngrx/store';
import {type} from '../../utils';
import {IChart} from '../model/IChartVM';

export const ActionTypes = {
  ADD_CHART: type('[todo] add todo'),
  REMOVE_CHART: type('[todo] remove todo'),
  UPDATE_CHART: type('[todo] update todo')
};

export class AddTodoAction implements Action {
  type: string;
  constructor(public payload: IChart) {
    this.type = ActionTypes.ADD_CHART;
  }
}

export class RemoveTodoAction implements Action {
  type: string;
  constructor(public payload: string) {
    this.type = ActionTypes.REMOVE_CHART;
  }
}

export class UpdateTodoStatusAction implements Action {
  type: string;
  constructor(public payload) {
    this.type = ActionTypes.UPDATE_CHART;
  }
}

export type Actions = AddTodoAction
  | RemoveTodoAction
  | UpdateTodoStatusAction;
