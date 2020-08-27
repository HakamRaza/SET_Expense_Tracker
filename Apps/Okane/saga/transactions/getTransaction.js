import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from 'store/index';


function* getTransaction({ data }) {
  console.log("THIS IS GET TRANSACTION SAGA");
  
  const formData = new FormData();
  
  if(data.startDate !== ""){
    let sd = data.startDate.split("-");
    // console.log(sd);
    formData.append("startDay", sd[2]);
    formData.append("startMonth", sd[1]);
    formData.append("startYear", sd[0]);
  }

  if(data.endDate !== ""){
    let ed = data.endDate.split("-");
    formData.append("endDay", ed[2]);
    formData.append("endMonth", ed[1]);
    formData.append("endYear", ed[0]);
  }

  (data.minPrice !=="" && formData.append("minPrice", data.minPrice));
  (data.maxPrice !=="" && formData.append("maxPrice", data.maxPrice));
  (data.description !=="" && formData.append("description", data.description));
  (data.categoryName !=="" && formData.append("categoryName", data.categoryName));

  let token = store.getState().PROFILE.userSession.data;
  const headers = {Authorization:`Bearer ${token}`};

  const { response, error } = yield call(api.getTransaction, formData, headers);

  // console.log(response);
  // console.log(error);

  if (response && response.data.status === "success"){
    yield put(Actions.getTransactionSuccess(response.data));

  } else if (response && response.data.error !== null){

      yield put(Actions.getTransactionFail(response.data));
      
  } else if (error){

      yield put(Actions.getTransactionFail(error.response));
  }
}



function* watchGetTransaction() {
  yield takeLatest(Actions.GET_TRANSACTION, getTransaction);
}

export default function* submit() {
  yield all([fork(watchGetTransaction)]);
}
