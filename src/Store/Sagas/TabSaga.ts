import { all, takeLatest } from "redux-saga/effects";

import type { SetActiveTabSuccess } from "../../Typings/Store/tab";

import { fetchFilesRequest } from "../ActionCreators/DirectoryActionCreators";
import { typedPut as put, selectStatus } from "./helpers";

// Requests files when a new active tab is set successfully
function* refetchFilesWorker(action: SetActiveTabSuccess) {
    yield put(fetchFilesRequest(action.tab.path, !!action.pushToHistory));
}

function* tabSaga() {
    yield all([takeLatest(selectStatus("SET_ACTIVE_TAB", "SUCCESS"), refetchFilesWorker)]);
}

export default tabSaga;
