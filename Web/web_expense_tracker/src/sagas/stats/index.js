import { all, fork } from "redux-saga/effects";
import getbars from "./getbars";
import getoverview from "./getoverview";
import getpie from "./getpie";

export default function* home() {
  yield all([
    fork(getbars), 
    fork(getoverview),
    fork(getpie)
  ]);
}