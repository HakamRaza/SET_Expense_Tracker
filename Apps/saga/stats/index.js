import { all, fork } from "redux-saga/effects";
import getBars from "./getBars";
import getOverview from "./getOverview";
import getPie from "./getPie";

export default function* home() {
  yield all([
    fork(getBars), 
    fork(getOverview),
    fork(getPie)
  ]);
}

