import { all, call, takeLatest } from "redux-saga/effects";

import {
    readFromClipboardFailure,
    readFromClipboardSuccess,
    writeToClipboardFailure,
    writeToClipboardSuccess,
} from "../ActionCreators/ClipboardActionCreators";

import type { WriteToClipboardRequest } from "../../Typings/Store/clipboard";

import * as ClipboardService from "../../Services/ClipboardService";
import { typedPut as put, selectStatus } from "./helpers";

function* writeToClipboardWorker(action: WriteToClipboardRequest) {
    try {
        const { text } = action;
        yield call(ClipboardService.writeTextToClipboard, text);
        yield put(writeToClipboardSuccess(text));
    } catch (error) {
        yield put(writeToClipboardFailure(error.message));
    }
}

function* readFromClipboardWorker(/* action: ReadFromClipboardRequest */) {
    try {
        const text: string = yield call(ClipboardService.readTextFromClipboard);
        yield put(readFromClipboardSuccess(text));
    } catch (error) {
        yield put(readFromClipboardFailure(error.message));
    }
}

function* clipboardSaga() {
    yield all([
        takeLatest(selectStatus("WRITE_TO_CLIPBOARD"), writeToClipboardWorker),
        takeLatest(selectStatus("READ_FROM_CLIPBOARD"), readFromClipboardWorker),
    ]);
}

export default clipboardSaga;
