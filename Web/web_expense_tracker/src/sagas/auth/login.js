import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

function* login({ data }) {
  // console.log("THIS IS LOGIN SAGA");
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);
  
  const { response, error } = yield call(api.login, formData);
  
  if (response && response.data.status === "success"){

    yield put(Actions.loginSuccess(response.data));

    const token = response.data.token;
    yield put(Actions.activateUserSession(token));

  }
  
  if (error){

    yield put(Actions.loginFail(error.response.data));
    // console.log("error respoonse msg",error.response.data.error);
    // console.log("error respoonse code",error.response.status);
  }
}


function* watchLogin() {
  yield takeLatest(Actions.LOGIN, login);
}

export default function* submit() {
  yield all([fork(watchLogin)]);
}
