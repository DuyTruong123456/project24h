import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import watchSagas from "./task/saga";
import taskReducer from "./task/reducer";
export function* rootSaga() {
  yield all([fork(watchSagas)]);
}
export const rootReducer = combineReducers({
  task: taskReducer,
});
