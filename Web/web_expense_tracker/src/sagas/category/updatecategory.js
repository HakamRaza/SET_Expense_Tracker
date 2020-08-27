import {takeLatest, call ,all ,fork, put} from 'redux-saga/effects';
import Actions from "actions";
import * as api from "api";
import {store} from "store/index";

//{data} destucture the data so we can avoid a step of console.log(data.data)
function* updateCategory({data}) {
    console.log("THIS IS UPDATE CATEGORY SAGA");

    // const formData = new FormData();
    // //db column name  //container form name
    // // formData.append("id",data.id);
    // // console.log(data.id);
    // formData.append("categoryID", data.category_title);
    // formData.append("updateBudget", data.budget);
    // formData.append("color", data.color);

    // let store = getStore().getState();
    // let token = Actions.getUserSession(store).data;
    // const headers ={ Authorization: `Bearer ${token}`};

    // console.log(headers);
    
    // const {response, error} = yield call(api.updateCategory, formData, headers);
    // console.log(response, error);

    
    // if(response && response.data.status === "success") {
    //   yield put(Actions.updateCategorySuccess(response.data));
    //   // yield put(Actions.getAll());
    // }

    // if(error) {
    //   yield put(Actions.updateCategoryFail(error.response));
    // }
    
}

function* watchUpdateCategory() {
  //dispatch action                   function from line 5 from saga file
    yield takeLatest(Actions.UPDATE_CATEGORY, updateCategory);
}

export default function* submit() {
  yield all([fork(watchUpdateCategory)]);
}