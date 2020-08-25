// // saga function import
import { takeLatest, call, all, fork, put } from "redux-saga/effects";

// import action
import Actions from "../../actions";

// import api
import * as api from "../../api";

// import { register } from "../../actions/auth/register";
// import { encode } from "../../services/encryption";

function* register({ data }) {
  console.log("THIS IS REGISTER SAGA");
  
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('password_confirmation', data.password_conf);

  const {response, error} = yield call(api.register, formData);

  // console.log("response register:", response, error);
  
  if(response && response.data.status === "success"){
    yield put(Actions.registerSuccess(response.data));
    
    const token = response.data.token;
    yield put(Actions.activateUserSession(token));

    // console.log("success reg!");
  }
    
  if(error){
    yield put(Actions.registerFail(error.response));
    // console.log("failed reg!");
  }

}

function* watchRegister() {
  yield takeLatest(Actions.REGISTER, register);
}

export default function* submit() {
  yield all([fork(watchRegister)]);
}
