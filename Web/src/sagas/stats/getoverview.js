import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";

function* getoverview({ data }) {
    console.log("THIS IS GET OVERVIEW SAGA");

    let token = store.getState().PROFILE.userSession.data;
    const headers = {Authorization:`Bearer ${token}`};

    const formData = new FormData();
    formData.append("month", data.month);
    formData.append("year", data.year);

    const { response, error } = yield call(api.get_overview, formData, headers);

    if (response && response.data.status === "success") {
        yield put(Actions.get_overviewSuccess(response.data));
        // console.log(response.data);

    } else {

        yield put(Actions.get_overviewFail(error));
    }

}

function* watchGetOverview() {
    yield takeLatest(Actions.GET_OVERVIEW, getoverview);
}

export default function* submit() {
    yield all([fork(watchGetOverview)]);
}