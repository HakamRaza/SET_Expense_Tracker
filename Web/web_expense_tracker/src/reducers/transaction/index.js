import { combineReducers } from "redux";

import new_transaction from "./newtransaction";
import get_transaction from "./gettransaction";

//combine to export
export default combineReducers({
  //same as funtion name inside
  new_transaction,
  get_transaction,
});