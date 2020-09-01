import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
// import { store } from 'store/index';
import { getStore } from "../../store/configureStore";



function* getTransaction({ data }) {
  console.log("THIS IS GET TRANSACTION SAGA");
  
  
  // if(data.startDate !== ""){
  //   let sd = data.startDate.split("-");
  //   // console.log(sd);
  //   formData.append("startDay", sd[2]);
  //   formData.append("startMonth", sd[1]);
  //   formData.append("startYear", sd[0]);
  // }
  
  // if(data.endDate !== ""){
    //   let ed = data.endDate.split("-");
  //   formData.append("endDay", ed[2]);
  //   formData.append("endMonth", ed[1]);
  //   formData.append("endYear", ed[0]);
  // }
  
  // (data.minPrice !=="" && formData.append("minPrice", data.minPrice));
  // (data.maxPrice !=="" && formData.append("maxPrice", data.maxPrice));
  // (data.description !=="" && formData.append("description", data.description));
  // (data.categoryName !=="" && formData.append("categoryName", data.categoryName));
  
  let store = getStore().getState();
  let token = Actions.getUserSession(store).data;
  const headers = {Authorization:`Bearer ${token}`};
  console.log("get transaction data", data)
  const formData = new FormData();
  // formData.append("startMonth", data.month);
  // formData.append("startYear", data.year);
  const { response, error } = yield call(api.getTransaction, formData, headers);
    console.log("get trans saga response and error", response, error);

  // console.log(response);
  // console.log(error);
  
  if (response && response.data.status === "success") {
    yield put(Actions.getTransactionSuccess(response.data));
} else {
    yield put(Actions.getTransactionFail(error));
}
}



function* watchGetTransaction() {
  yield takeLatest(Actions.GET_TRANSACTIONS, getTransaction);
}

export default function* submit() {
  yield all([fork(watchGetTransaction)]);
}
