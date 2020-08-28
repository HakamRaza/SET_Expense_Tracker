import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
// import { store } from "store/index";
import { getStore } from "../../store/configureStore";

function* getOverview({ data }) {
    // let token = store.getState().PROFILE.userSession.data;
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };

    let store = getStore().getState();
    let token = Actions.getUserSession(store).data;
    const headers = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append("month", data.month);
    formData.append("year", data.year);

    const { response, error } = yield call(api.getOverview, data, headers);

    if (response && response.data.status === "success") {
        yield put(Actions.getOverviewSuccess(response.data));
    } else {
        yield put(Actions.getOverviewFail(error));
    }

    // console.log("Overview Response",error, response)
}

function* watchGetOverview() {
    yield takeLatest(Actions.GET_OVERVIEW, getOverview);
}

export default function* submit() {
    yield all([fork(watchGetOverview)]);
}
