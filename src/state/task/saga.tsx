import { all, fork, put, select, takeLatest } from "redux-saga/effects";
import * as types from "./types";
import storage from "../../components/storage";
function* watchRequestNotify() {
  yield all([takeLatest(types.GET_TASK, getTask)]);
}

export default function* watchSagas() {
  yield all([fork(watchRequestNotify)]);
}
async function* getTask() {
  try {
    const ret = await storage.load({
      key: "task",

      autoSync: true,

      syncInBackground: true,

      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    });
    yield put({ type: types.GET_TASK_SUCCESS, payload: ret });
  } catch (error) {
    yield put({
      type: types.GET_TASK_FAIL,
      error: {
        statusCode: 500,
        message: "PLEASE RETRY",
      },
    });
  }
}
