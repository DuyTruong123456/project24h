import * as types from "./types";
const initialState = {};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_TASK_SUCCESS:
      return {
        ...state,
        task: action.payload,
      };
  }
};
