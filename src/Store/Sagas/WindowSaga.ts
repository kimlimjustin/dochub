import type { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { all, call, takeLatest } from "redux-saga/effects";

import {
    changeWindowTitleFailure,
    changeWindowTitleSuccess,
    closeWindowFailure,
    closeWindowSuccess,
    createNewWindowFailure,
    createNewWindowSuccess,
    listenWindowCloseFailure,
    listenWindowCloseSuccess,
    maximizeWindowFailure,
    maximizeWindowSuccess,
    minimizeWindowFailure,
    minimizeWindowSuccess,
    setDecorationsFailure,
    setDecorationsSuccess,
} from "../ActionCreators/WindowActionCreators";

import type { ChangeWindowTitleRequest, CreateNewWindowRequest, SetDecorationsRequest } from "../../Typings/Store/window";

import * as WindowService from "../../Services/WindowService";
import { typedPut as put, selectStatus } from "./helpers";

function* listenWindowCloseWorker(/* action: ListenWindowCloseRequest */) {
    try {
        yield call(WindowService.listenWindowClose);
        yield put(listenWindowCloseSuccess());
    } catch (error) {
        yield put(listenWindowCloseFailure(error.message));
    }
}

function* createNewWindowWorker(action: CreateNewWindowRequest) {
    try {
        const { title } = action;
        //@ts-ignore
        const window: WebviewWindow = yield call(WindowService.createNewWindow, title);
        yield put(createNewWindowSuccess(title, window));
    } catch (error) {
        yield put(createNewWindowFailure(error.message));
    }
}

function* changeWindowTitleWorker(action: ChangeWindowTitleRequest) {
    try {
        const { title, dest } = action;
        yield call(WindowService.changeWindowTitle, title);
        yield put(changeWindowTitleSuccess(title, dest));
    } catch (error) {
        yield put(changeWindowTitleFailure(error.message));
    }
}

function* setDecorationsWorker(action: SetDecorationsRequest) {
    try {
        const { decorations } = action;
        yield call(WindowService.setDecorations, decorations);
        yield put(setDecorationsSuccess());
    } catch (error) {
        yield put(setDecorationsFailure(error.message));
    }
}

function* maximizeWindowWorker() {
    try {
        yield call(WindowService.maximizeWindow);
        yield put(maximizeWindowSuccess());
    } catch (error) {
        yield put(maximizeWindowFailure(error.message));
    }
}

function* minimizeWindowWorker() {
    try {
        yield call(WindowService.minimizeWindow);
        yield put(minimizeWindowSuccess());
    } catch (error) {
        yield put(minimizeWindowFailure(error.message));
    }
}

function* closeWindowWorker() {
    try {
        yield call(WindowService.closeWindow);
        yield put(closeWindowSuccess());
    } catch (error) {
        yield put(closeWindowFailure(error.message));
    }
}

function* windowSaga() {
    yield all([
        takeLatest(selectStatus("LISTEN_WINDOW_CLOSE"), listenWindowCloseWorker),
        takeLatest(selectStatus("CREATE_WINDOW"), createNewWindowWorker),
        takeLatest(selectStatus("CHANGE_WINDOW_TITLE"), changeWindowTitleWorker),
        takeLatest(selectStatus("SET_DECORATIONS"), setDecorationsWorker),
        takeLatest(selectStatus("MAXIMIZE_WINDOW"), maximizeWindowWorker),
        takeLatest(selectStatus("MINIMIZE_WINDOW"), minimizeWindowWorker),
        takeLatest(selectStatus("CLOSE_WINDOW"), closeWindowWorker),
    ]);
}

export default windowSaga;
