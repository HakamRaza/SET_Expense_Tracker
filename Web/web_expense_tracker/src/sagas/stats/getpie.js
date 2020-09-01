import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";

function* getpie({ data }) {
    console.log("THIS IS GET PIE SAGA");

    // console.log(data);
    
    let token = store.getState().PROFILE.userSession.data;
    const headers = {Authorization:`Bearer ${token}`};

    const formData = new FormData();
    formData.append("month", data.month);
    formData.append("year", data.year);

    const { response, error } = yield call(api.get_pie, data, headers);

    if (response && response.data.status === "success") {
        yield put(Actions.get_pieSuccess(response.data));

    } else {

        yield put(Actions.get_pieFail(error));
    }
}

function* watchGetPie() {
    yield takeLatest(Actions.GET_PIE, getpie);
}

export default function* submit() {
    yield all([fork(watchGetPie)]);
}