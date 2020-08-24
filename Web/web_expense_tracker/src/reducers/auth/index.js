import { combineReducers } from "redux";

import login from "./login";
import register from "./register";

//combine to export
export default combineReducers({
  login,
  register,
});
