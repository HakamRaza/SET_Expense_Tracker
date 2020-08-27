import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";

function* getPie({ data }) {
    console.log("THIS IS GET PIE SAGA");

    // let token = store.getState().PROFILE.userSession.data;
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };

    // let store = getStore().getState();
    // let token = Actions.getUserSession(store).data;
    // const headers = { Authorization: `Bearer ${token}` };

    // const formData = new FormData();
    // formData.append("month", data.month);
    // formData.append("year", data.year);

    // const { response, error } = yield call(api.getPie, data, headers);

    // if (response && response.data.status === "success") {
    //     yield put(Actions.getPieSuccess(response.data));
    // } else {
    //     yield put(Actions.getPieFail(error));
    // }
}

function* watchGetPie() {
    yield takeLatest(Actions.GET_PIE, getPie);
}

export default function* submit() {
    yield all([fork(watchGetPie)]);
}