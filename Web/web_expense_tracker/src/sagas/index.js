import { all, fork } from "redux-saga/effects";

import auth from "./auth";
import category from "./category";
import transaction from "./transaction";
import stats from "./stats";

export default function* submit() {
  yield all([
    fork(auth), 
    fork(category), 
    fork(transaction),
    fork(stats),
  ]);
}
