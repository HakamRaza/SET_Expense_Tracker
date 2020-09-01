import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from 'store/index';

function* logout({}) {
    console.log("THIS IS LOGOUT SAGA");
  
    let token = store.getState().PROFILE.userSession.data;
    const headers = {Authorization:`Bearer ${token}`};
    
    // console.log("headers", headers);
    
    const { response, error } = yield call(api.logout, headers);

    // console.log("response", response.data);
    // console.log("error", error);
    
    
    if (response && response.data.status === "success"){
    yield put(Actions.resetUserSession());
      yield put(Actions.logoutSuccess(response.data));

    }

    if (error){
      yield put(Actions.logoutFail(error.response.data));
    }
}


function* watchLogout() {
  yield takeLatest(Actions.LOGOUT, logout);
}

export default function* submit() {
  yield all([fork(watchLogout)]);
}
