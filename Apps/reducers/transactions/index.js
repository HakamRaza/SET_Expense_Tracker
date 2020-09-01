import { combineReducers } from "redux";

import newTransaction from "./newTransaction";
import updateTransaction from "./updateTransaction";
import deleteTransaction from "./deleteTransaction";
import getTransaction from "./getTransaction";

export default combineReducers({
  newTransaction,
  updateTransaction,
  deleteTransaction,
  getTransaction,
});