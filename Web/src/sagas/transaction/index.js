import { all, fork } from "redux-saga/effects";
import newTransaction from "./newtransaction";
import getTransaction from "./gettransaction";
import updateTransaction from "./updatetransaction";
import deleteTransaction from "./deletetransaction";


export default function* home() {
  yield all([fork(newTransaction), fork(getTransaction), fork(updateTransaction), fork(deleteTransaction)]);
}
