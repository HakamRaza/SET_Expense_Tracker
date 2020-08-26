import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from 'store/index';


function* getcategories({ }) {
  console.log("THIS IS GET CATEGORIES SAGA");

  let token = store.getState().PROFILE.userSession.data;
  const headers = {Authorization:`Bearer ${token}`};

                                         //same as helper, configure in helper
  // console.log(headers);

  const { response, error } = yield call(api.get_categories, headers);

  // console.log("response", response);
  // console.log("error", error);
  
  if (response && response.data.status === "success"){
                        //same in action
    yield put(Actions.get_categoriesSuccess(response.data));
    // console.log("yeyyy");
    
  } else if (response && response.data.status !== null){
    
    yield put(Actions.get_categoriesFail(response.data));
    // console.log("receiving error");
  }
  
  if (error){
    //same as actions
    yield put(Actions.get_categoriesFail(error.response.data));
    // console.log("real error API");
  }

}

        //only used inside file
function* watchGetCategories() {
                    //same as action        //declare function* name above
  yield takeLatest(Actions.GET_CATEGORIES, getcategories);
}

export default function* submit() {
  yield all([fork(watchGetCategories)]);
}
