import { all, fork } from "redux-saga/effects";
import login from "./login";
import logout from "./logout";
import register from "./register";

export default function* home() {
  yield all([fork(login), fork(logout), fork(register)]);
}
