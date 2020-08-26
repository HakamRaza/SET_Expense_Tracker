import { all, fork } from "redux-saga/effects";
import newTransaction from "./newtransaction";
import getTransaction from "./gettransaction";


export default function* home() {
  yield all([fork(newTransaction), fork(getTransaction)]);
}
