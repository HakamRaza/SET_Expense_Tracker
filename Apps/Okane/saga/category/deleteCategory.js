import {takeLatest, call ,all ,fork, put} from 'redux-saga/effects';
import Actions from "actions";
import * as api from "api";
// import {store} from "store/index";
import {getStore} from "../../store/configureStore";

//{data} destucture the data so we can avoid a step of console.log(data.data)
function* deleteCategory({data}) {

    let store = getStore().getState();
    let token = Actions.getUserSession(store).data;
    const headers ={ Authorization: `Bearer ${token}`};

    const formData = new FormData();
    formData.append("id",data);
    
    const {response, error} = yield call(api.deleteCategory, formData, headers);
    console.log(response, error);

    if(response && response.data.status ==="success"){
      yield put(Actions.deleteCategorySucccess(response.data));
      // yield put(Actions.getAll());
    }

    if(error) {
      yield put(Actions.deleteCategoryFail(error.response));
    }
    
}

function* watchDeleteCategory() {
  //dispatch action                   function from line 5 from saga file
    yield takeLatest(Actions.DELETE_CATEGORY, deleteCategory);
}

export default function* submit() {
  yield all([fork(watchDeleteCategory)]);
}
