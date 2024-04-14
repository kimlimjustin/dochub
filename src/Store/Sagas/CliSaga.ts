import { all, call, takeLatest } from "redux-saga/effects";

import { fetchCliInformationFailure, fetchCliInformationSuccess } from "../ActionCreators/CliActionCreators";

import * as CliService from "../../Services/CliService";
import type { ICliArguments } from "../../Typings/Store/cli";
import { typedPut as put, selectStatus } from "./helpers";

function* fetchCliInformationWorker() {
    try {
        const cliInformation: ICliArguments = yield call(CliService.fetchCliInformation);
        yield put(fetchCliInformationSuccess(cliInformation));
    } catch (error) {
        yield put(fetchCliInformationFailure(error.message));
    }
}

function* cliSaga() {
    yield all([takeLatest(selectStatus("FETCH_CLI_INFORMATION"), fetchCliInformationWorker)]);
}

export default cliSaga;
