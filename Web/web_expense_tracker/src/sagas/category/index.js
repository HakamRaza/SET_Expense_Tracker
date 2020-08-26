import { all, fork } from "redux-saga/effects";
import getcategories from "./getcategories";

export default function* home() {
                //only used for this file
  yield all([fork(getcategories)]);
}
