import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "actions";
import * as api from "api";

// import { encode } from "../../services/encryption";

//{data} from view
function* login({ data }) {
  // console.log("this is abc");

  const formData = new FormData();
  formData.append("email" , data.email);
  formData.append("password", data.password);

  const { response, error } = yield call(api.login, formData);
  //debug tips 
  // console.log("login saga response and error", response, error);

  if (response && response.data.status === "success"){
    yield put (Actions.loginSuccess(response.data.token));
    yield put (Actions.activateUserSession(response.data.token));
  } else if (error) {
    yield put (Actions.loginFail(error.response));
  }
}

function* watchLogin() {
  yield takeLatest(Actions.LOGIN, login);
}

export default function* submit() {
  yield all([fork(watchLogin)]);
}
