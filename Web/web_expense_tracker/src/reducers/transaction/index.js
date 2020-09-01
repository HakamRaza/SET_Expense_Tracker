import { combineReducers } from "redux";

import new_transaction from "./newtransaction";
import get_transaction from "./gettransaction";
import update_transaction from "./updatetransaction";
import delete_transaction from "./deletetransaction";

//combine to export
export default combineReducers({
  //same as funtion name inside
  new_transaction,
  get_transaction,
  delete_transaction,
  update_transaction,
});