import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import { latestItemsReducer } from "../LatestItemsList/reducer";
import { fetchHackerNews } from "../LatestItemsList/epics";

export const rootEpic = combineEpics(fetchHackerNews);
export const rootReducer = combineReducers({ latestItemsReducer });
