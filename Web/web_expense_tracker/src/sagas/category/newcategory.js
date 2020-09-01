import {takeLatest, call ,all ,fork, put} from 'redux-saga/effects';
import Actions from "actions";
import * as api from "api";
import {store} from "store/index";

function* new_categories({data}) {
    console.log("THIS IS NEW CATEGORY SAGA");

    let token = store.getState().PROFILE.userSession.data;
    const headers = {Authorization:`Bearer ${token}`};
    
    const formData = new FormData();
    formData.append("category_title", data.category_title);
    formData.append("budget", data.category_budget);
    formData.append("color", data.category_color);

    const {response, error} = yield call(api.new_category, formData, headers);

    
    if(response && response.data.status === "success") {
      yield put(Actions.new_categorySuccess(response.data));
      
    } else {
      yield put(Actions.new_categoryFail(error.response));
    }
    
}

function* watchNewCategory() {
  //dispatch action                   function from line 5 from saga file
    yield takeLatest(Actions.NEW_CATEGORY, new_categories);
}

export default function* submit() {
  yield all([fork(watchNewCategory)]);
}