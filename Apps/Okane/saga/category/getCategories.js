import {takeLatest, call ,all ,fork, put} from 'redux-saga/effects';
import Actions from "actions";
import * as api from "api";
// import {store} from "store";
import {getStore} from "../../store/configureStore";

//{data} destucture the data so we can avoid a step of console.log(data.data)
function* getCategory() {
    console.log("getCategory saga");
    let store = getStore().getState();
    let token = Actions.getUserSession(store).data;
    const headers ={ Authorization: `Bearer ${token}`};
    
    const {response, error} = yield call(api.getCategories, headers);
    console.log("login saga response and error", response, error);

    if(response && response.data.status === "success"){
      yield call(Actions.getCategorySuccess(response.data));
    }

    if(error) {
      yield call(Actions.getCategoryFail(error.response));
    }
    
}

function* watchGetCategory() {
  //dispatch action                   function from line 5 from saga file
    yield takeLatest(Actions.GET_CATEGORY, getCategory);
}

export default function* submit() {
  yield all([fork(watchGetCategory)]);
}