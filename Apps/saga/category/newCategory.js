import {takeLatest, call ,all ,fork, put} from 'redux-saga/effects';
import Actions from "actions";
import * as api from "api";
import {getStore} from "../../store/configureStore";

// import {store} from "store/index";

//{data} destucture the data so we can avoid a step of console.log(data.data)
function* newCategory({data}) {
    console.log("create new CAT saga");

    const formData = new FormData();
    //db column name  //container form name
    formData.append("id",data.id);
    console.log("newCAT saga is here", data);
    formData.append("category_title", data.category_title);
    formData.append("budget", data.budget);
    formData.append("color", data.color);

    let store = getStore().getState();
    let token = Actions.getUserSession(store).data;
    const headers ={ Authorization: `Bearer ${token}`};

    console.log(headers);
    
    const {response, error} = yield call(api.newCategory, formData, headers);
    console.log("thi is new category saga" ,response, error);

    
    if(response && response.data.status === "success") {
      yield put(Actions.newCategorySuccess(response.data));
      yield put(Actions.getBars());
      // yield put(Actions.getAll());
    }

    if(error) {
      yield put(Actions.newCategoryFail(error.response));
    }
    
}

function* watchNewCategory() {
  //dispatch action                   function from line 5 from saga file
    yield takeLatest(Actions.NEW_CATEGORY, newCategory);
}

export default function* submit() {
  yield all([fork(watchNewCategory)]);
}
