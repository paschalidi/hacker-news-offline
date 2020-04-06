import { of, forkJoin } from "rxjs";
import { switchMap, flatMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import * as types from "./actions";

export function fetchHackerNews(action$) {
  return action$.pipe(
    ofType(types.FETCH_LATEST),
    switchMap(() => {
      return ajax({
        url: "https://hacker-news.firebaseio.com/v0/maxitem.json",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
    }),
    flatMap(({ response }) => {
      const ids = Array.from({ length: 10 }, (_, i) => response - i);
      return forkJoin(
        ids.map((id) =>
          ajax({
            url: `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
        )
      );
    }),
    flatMap((items) => {
      return of({
        type: types.FETCH_LATEST_SUCCESS,
        payload: items.map(({ response }) => response),
      });
    })
  );
}
