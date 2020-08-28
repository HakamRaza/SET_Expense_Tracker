import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
// import { store } from 'store/index';
import { getStore } from "../../store/configureStore";



function* newTransaction({ data }) {
  console.log("THIS IS NEW TRANSACTION SAGA");
  
  const formData = new FormData();
  formData.append("category_id", data.category_id);
  formData.append("description", data.description);
  formData.append("amount", data.amount);
  formData.append("date", data.date);

  let store = getStore().getState();
  let token = Actions.getUserSession(store).data;

  const headers = {Authorization:`Bearer ${token}`};
    
  const { response, error } = yield call(api.newTransaction, formData, headers);

//   console.log(response);
//   console.log(error);

    if (response && response.data.status === "success"){
        //same in action
        yield put(Actions.newTransactionSuccess(response.data));
        console.log("yeyyy");

    }   
    
    if (error){

        yield put(Actions.newTransactionFail(error.response));
    }
}



function* watchNewTransaction() {
  yield takeLatest(Actions.NEW_TRANSACTION, newTransaction);
}

export default function* submit() {
  yield all([fork(watchNewTransaction)]);
}