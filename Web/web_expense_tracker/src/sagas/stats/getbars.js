import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";

function* getbars({ data }) {
    console.log("THIS IS GET BAR SAGA");
    // console.log(data);
    
    let token = store.getState().PROFILE.userSession.data;
    const headers = {Authorization:`Bearer ${token}`};

    const formData = new FormData();
    formData.append("month", data.month);
    formData.append("year", data.year);
    
    const { response, error } = yield call(api.get_bars, formData, headers);

    
    
    if (response && response.data.status === "success") {
        yield put(Actions.get_barsSuccess(response.data));

    } else {
        yield put(Actions.get_barsFail(error));
    }

    // console.log(response);
    // console.log(error);

    // console.log("this is getBarsData", response.data[1].budget); 
}

function* watchGetBars() {
    yield takeLatest(Actions.GET_BARS, getbars);
}

export default function* submit() {
    yield all([fork(watchGetBars)]);
}