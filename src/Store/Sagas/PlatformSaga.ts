import { all, call, takeLatest } from "redux-saga/effects";

import {} from "../../Typings/Store/platform";
import { getOSFailure, getOSSuccess } from "../ActionCreators/PlatformActionCreators";

import * as PlatformService from "../../Services/PlatformService";
import { typedPut as put, selectStatus } from "./helpers";

function* getOSWorker() {
    try {
        const os: string = yield call(PlatformService.getOS);
        yield put(getOSSuccess(os));
    } catch (error) {
        yield put(getOSFailure(error.message));
    }
}

function* platformSaga() {
    yield all([takeLatest(selectStatus("GET_OS"), getOSWorker)]);
}

export default platformSaga;
