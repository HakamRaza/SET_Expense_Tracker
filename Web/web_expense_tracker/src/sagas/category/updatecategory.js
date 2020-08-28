import {takeLatest, call ,all ,fork, put} from 'redux-saga/effects';
import Actions from "actions";
import * as api from "api";
import {store} from "store/index";

//{data} destucture the data so we can avoid a step of console.log(data.data)
function* updateCategory({data}) {
    console.log("THIS IS UPDATE CATEGORY SAGA");

    let token = store.getState().PROFILE.userSession.data;
    const headers = {Authorization:`Bearer ${token}`};

    const formData = new FormData();
    formData.append("categoryID", data.itemID);
    
    (data.category_title !=="" && formData.append("newTitle", data.category_title));
    (data.category_budget !=="" && formData.append("newBudget", data.category_budget));
    (data.category_category_title !=="" && formData.append("newColor", data.category_color));

    console.log(data);

    const { response, error } = yield call(api.update_category, formData, headers);

    // console.log(response);
    // console.log(error);

      
    if(response && response.data.status === "success") {
      yield put(Actions.update_categorySuccess(response.data));
      console.log("success edit");
      
    } else {
      yield put(Actions.update_categoryFail(error.response));
      console.log("failed edit");
    }
    
}

function* watchUpdateCategory() {
  //dispatch action                   function from line 5 from saga file
    yield takeLatest(Actions.UPDATE_CATEGORY, updateCategory);
}

export default function* submit() {
  yield all([fork(watchUpdateCategory)]);
}