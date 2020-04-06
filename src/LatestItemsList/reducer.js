import * as types from "./actions";

export function latestItemsReducer(
  state = { stage: "LOADING", latestItems: [] },
  action
) {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_LATEST:
      return {
        stage: "LOADING",
      };
    case types.FETCH_LATEST_SUCCESS:
      return {
        stage: "READY",
        latestItems: payload,
      };
    default:
      return state;
  }
}
