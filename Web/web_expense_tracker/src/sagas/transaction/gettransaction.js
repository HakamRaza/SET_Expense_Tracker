import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from 'store/index';


function* get_transaction({ data }) {
  console.log("THIS IS GET TRANSACTION SAGA");
  
//   const formData = new FormData();
//   formData.append("category_id", data.trans_category);
//   formData.append("description", data.trans_desc);
//   formData.append("amount", data.trans_value);
//   formData.append("date", data.trans_date);

//   let token = store.getState().PROFILE.userSession.data;
//   const headers = {Authorization:`Bearer ${token}`};
    
//   const { response, error } = yield call(api.get_transaction, formData, headers);

// //   console.log(response);
// //   console.log(error);

//     if (response && response.data.status === "success"){
//         //same in action
//         yield put(Actions.get_transactionSuccess(response.data));
//         console.log("yeyyy");

//     } else if (response && response.data.status === "failed"){

//         yield put(Actions.get_transactionFail(response.data));
        
//     } else if (error){

//         yield put(Actions.get_transactionFail(error.response));
//     }
}



function* watchGetTransaction() {
  yield takeLatest(Actions.GET_TRANSACTION, get_transaction);
}

export default function* submit() {
  yield all([fork(watchGetTransaction)]);
}
