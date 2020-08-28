import { all, fork } from "redux-saga/effects";

import auth from "./auth";
import category from "./category"
import stats from "./stats"
import transactions from "./transactions"

export default function* submit() {
  yield all([fork(auth), fork(category), fork(transactions),fork(stats)]);
}
