import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from 'store/index';

function* logout({}) {
    console.log("THIS IS LOGOUT SAGA");
  
    let token = store.getState().PROFILE.userSession.data;
    const headers = {Authorization:`Bearer ${token}`};
    
    const { response, error } = yield call(api.logout, headers);

    console.log("response", response.data);
    

    if (response && response.data.status === "success"){
      yield put(Actions.logoutSuccess(response.data));
      yield put(Actions.resetUserSession());

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
