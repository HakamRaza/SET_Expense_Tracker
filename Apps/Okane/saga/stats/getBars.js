import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
// import { store } from "store/index";
import { getStore } from "../../store/configureStore";

function* getBars({ data }) {
    // let token = store.getState().PROFILE.userSession.data;
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };

    let store = getStore().getState();
    let token = Actions.getUserSession(store).data;
    const headers = { Authorization: `Bearer ${token}` };
    console.log("get bars data", data)
    const formData = new FormData();
    formData.append("month", data.month);
    formData.append("year", data.year);
    // formData.append("month", 8);
    // formData.append("year", 2020);
    
    const { response, error } = yield call(api.getBars, data, headers);
    
    
    if (response && response.data.status === "success") {
        yield put(Actions.getBarsSuccess(response.data));
    } else {
        yield put(Actions.getBarsFail(error));
    }

    // console.log("this is getBarsData saga", response.data[1].budget); 
}

function* watchGetBars() {
    yield takeLatest(Actions.GET_BARS, getBars);
}

export default function* submit() {
    yield all([fork(watchGetBars)]);
}
