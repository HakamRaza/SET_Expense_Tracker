import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from 'store/index';


function* update_transaction({ data }) {
  console.log("THIS IS UPDATE TRANSACTION SAGA");
  
    const formData = new FormData();

    formData.append("transactionID", data.itemID);
    (data.update_category !=="" && formData.append("newCategoryID", data.update_category));
    (data.update_desc !=="" && formData.append("newDesc", data.update_desc));
    (data.update_date !=="" && formData.append("newDate", data.update_date));
    (data.update_value !==0 && formData.append("newAmount", data.update_value));
  
    let token = store.getState().PROFILE.userSession.data;
    const headers = {Authorization:`Bearer ${token}`};
    
    const { response, error } = yield call(api.update_transaction, formData, headers);

    if (response && response.data.status === "success"){
      //same in action
      yield put(Actions.update_transactionSuccess(response.data));
      // yield put(Actions.get_transaction());

    } else if (response && response.data.status === "failed"){

      yield put(Actions.update_transactionFail(response.data));
        
    } else if (error){

      yield put(Actions.update_transactionFail(error.response));
    }
}

function* watchUpdateTransaction() {
  yield takeLatest(Actions.UPDATE_TRANSACTION, update_transaction);
}

export default function* submit() {
  yield all([fork(watchUpdateTransaction)]);
}
