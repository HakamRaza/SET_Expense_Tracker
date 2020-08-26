import { all, fork } from "redux-saga/effects";
import newTransaction from "./newtransaction";


export default function* home() {
  yield all([fork(newTransaction)]);
}
