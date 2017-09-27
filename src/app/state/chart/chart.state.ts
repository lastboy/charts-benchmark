import * as chartActions from './chart.actions';
import {IChartVM} from '../model/IChartVM';
import {createSelector} from "reselect";

export interface State extends IChartVM {
}

const initialState: State = <IChartVM> {
  data: []
};

export function reducer(state = initialState, action: chartActions.Actions): State {

  let tmpData;
  switch (action.type) {

    case chartActions.ActionTypes.SET_CHARTS:
      return {
        data: action.payload
      };

    case chartActions.ActionTypes.WIPE_CHARTS:
      return {
        data: []
      };

    case chartActions.ActionTypes.ADD_CHART:
      tmpData = state.data.slice();
      tmpData.push(action.payload);
      return {
        data: tmpData
      };

    case chartActions.ActionTypes.REMOVE_CHART:
      tmpData = state.data.slice();
      let index = tmpData.indexOf(action.payload);
      if (index !== -1) {
        tmpData.splice(index, 1);
      }
      return {
        data: tmpData
      };

    case chartActions.ActionTypes.UPDATE_CHART:
      tmpData = state.data.slice();
      for (let i = 0; i < tmpData.length; i++) {
        if (tmpData[i].id === action.payload.id) {
          tmpData[i] = action.payload;
          break;
        }
      }
      return {
        data: tmpData
      };

    case chartActions.ActionTypes.LOG:
      tmpData = state.data.slice();
      for (let i = 0; i < tmpData.length; i++) {
        if (tmpData[i].id === action.payload.id) {

          let log = [];
          log.push(action.payload.log);
          tmpData[i].log.concat(log);
          break;
        }
      }
      return {
        data: tmpData
      };

    default:
      return state;
  }
}


