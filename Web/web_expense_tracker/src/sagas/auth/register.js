// // saga function import
import { takeLatest, call, all, fork, put } from "redux-saga/effects";

// import action
import Actions from "../../actions";

// import api
import * as api from "../../api";

// import { register } from "../../actions/auth/register";
// import { encode } from "../../services/encryption";

function* register({ data }) {
  // console.log("register saga");
  // console.log(data);

  // //prepare formData to pass to api, like postman, you compile all data, to be sent to api process
  // const formData = new FormData();
  
  // formData.append('name', data.name);
  // formData.append('email', data.email);
  // formData.append('password', data.password);
  // formData.append('password_confirmation', data.password_confirmation);

  // // console.log(formData)
  // // console.log(response, error);


  // //pass to api
  // //destructuring
  // const {response, error} = yield call(api.register, formData);
  // // formData will pass to index/api/index.js as data
  


  // //if response status success, then we will update the reducer
  // //if we got response, and response status === success message
  // // make sure the status is really same spelling!

  // if(response && response.data.status === "success"){
  //   yield put(Actions.registerSuccess(response.data));
  // }

  // if(error){
  //   // console.log("this is register error", error);
  //   yield put(Actions.registerFail(error));
  // }
  
  //if error, then update fail reducer

}

// function* is saga fx
function* watchRegister() {
  yield takeLatest(Actions.REGISTER, register);
}

// export and execute 2 function together using fork
// fork is calling function like call, fetch but different fx, you can call next function same time as the first complete, it run simultaneously with single call.
export default function* submit() {
  yield all([fork(watchRegister)]);
}
