import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from 'store/index';


function* delete_transaction({ data }) {
  console.log("THIS IS DELETE TRANSACTION SAGA");
  
  const formData = new FormData();
  formData.append("transactionID", data);

  let token = store.getState().PROFILE.userSession.data;
  const headers = {Authorization:`Bearer ${token}`};

  const { response, error } = yield call(api.delete_transaction, formData, headers);

  // console.log(response);
  // console.log(error);

  if (response && response.data.status === "success"){
    //same in action
    yield put(Actions.delete_transactionSuccess(response.data));

  } else if (response && response.data.status === "failed"){

      yield put(Actions.delete_transactionFail(response.data));
      
  } else if (error){

      yield put(Actions.delete_transactionFail(error.response));
  }
  
}



function* watchDeleteTransaction() {
  yield takeLatest(Actions.DELETE_TRANSACTION, delete_transaction);
}

export default function* submit() {
  yield all([fork(watchDeleteTransaction)]);
}
