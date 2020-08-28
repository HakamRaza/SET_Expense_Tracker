import {takeLatest, call ,all ,fork, put} from 'redux-saga/effects';
import Actions from "actions";
import * as api from "api";
import {store} from "store/index";

//{data} destucture the data so we can avoid a step of console.log(data.data)
function* delete_category({data}) {
    console.log("THIS IS DELETE CATEGORY SAGA");

    
    let token = store.getState().PROFILE.userSession.data;
    const headers = {Authorization:`Bearer ${token}`};
    
    const formData = new FormData();
    formData.append("transactionID", data);
    const { response, error } = yield call(api.delete_transaction, formData, headers);
    

    if(response && response.data.status ==="success"){
      yield put(Actions.delete_categoriesSuccess(response.data));

      console.log("saga success");
    }

    if(error) {
      yield put(Actions.delete_categoriesFail(error.response));
    }
    
}

function* watchDeleteCategory() {
  //dispatch action                   function from line 5 from saga file
    yield takeLatest(Actions.DELETE_CATEGORY, delete_category);
}

export default function* submit() {
  yield all([fork(watchDeleteCategory)]);
}