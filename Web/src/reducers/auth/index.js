import { combineReducers } from "redux";

import login from "./login";
import logout from "./logout";
import register from "./register";

//combine to export
export default combineReducers({
  login,
  register,
  logout,
});
