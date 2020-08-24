import { all, fork } from "redux-saga/effects";

import auth from "./auth";
// import todo from "./todo";

export default function* submit() {
  yield all([fork(auth)]);
  // yield all([fork(auth), fork(todo)]);
}
