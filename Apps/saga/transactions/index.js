import { all, fork } from "redux-saga/effects";
import newTransaction from "./newTransaction";
import updateTransaction from "./updateTransaction";
import getTransaction from "./getTransaction";
import deleteTransaction from "./deleteTransaction";

export default function* home() {
  yield all(
    [
    fork(newTransaction), 
    // fork(updateTransaction), 
    fork(getTransaction), 
    // fork(deleteTransaction)
  ]);
}

