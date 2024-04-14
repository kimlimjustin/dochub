import type { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import type {
    ChangeWindowTitleFailure,
    ChangeWindowTitleRequest,
    ChangeWindowTitleSuccess,
    CloseWindowFailure,
    CloseWindowRequest,
    CloseWindowSuccess,
    CreateNewWindowFailure,
    CreateNewWindowRequest,
    CreateNewWindowSuccess,
    ListenWindowCloseFailure,
    ListenWindowCloseRequest,
    ListenWindowCloseSuccess,
    MaximizeWindowFailure,
    MaximizeWindowRequest,
    MaximizeWindowSuccess,
    MinimizeWindowFailure,
    MinimizeWindowRequest,
    MinimizeWindowSuccess,
    SetDecorationsFailure,
    SetDecorationsRequest,
    SetDecorationsSuccess,
} from "../../Typings/Store/window";

export const listenWindowCloseRequest = (): ListenWindowCloseRequest => ({
    type: "LISTEN_WINDOW_CLOSE",
    status: "REQUEST",
});

export const listenWindowCloseSuccess = (): ListenWindowCloseSuccess => ({
    type: "LISTEN_WINDOW_CLOSE",
    status: "SUCCESS",
});

export const listenWindowCloseFailure = (message: string): ListenWindowCloseFailure => ({
    type: "LISTEN_WINDOW_CLOSE",
    status: "FAILURE",
    message,
});

export const createNewWindowRequest = (title: string): CreateNewWindowRequest => ({
    type: "CREATE_WINDOW",
    status: "REQUEST",
    title,
});

export const createNewWindowSuccess = (title: string, window: WebviewWindow): CreateNewWindowSuccess => ({
    type: "CREATE_WINDOW",
    status: "SUCCESS",
    title,
    window,
});

export const createNewWindowFailure = (message: string): CreateNewWindowFailure => ({
    type: "CREATE_WINDOW",
    status: "FAILURE",
    message,
});

export const changeWindowTitleRequest = (title: string, dest: string): ChangeWindowTitleRequest => ({
    type: "CHANGE_WINDOW_TITLE",
    status: "REQUEST",
    title,
    dest,
});

export const changeWindowTitleSuccess = (title: string, dest: string): ChangeWindowTitleSuccess => ({
    type: "CHANGE_WINDOW_TITLE",
    status: "SUCCESS",
    title,
    dest,
});

export const changeWindowTitleFailure = (message: string): ChangeWindowTitleFailure => ({
    type: "CHANGE_WINDOW_TITLE",
    status: "FAILURE",
    message,
});

export const setDecorationsRequest = (decorations: boolean): SetDecorationsRequest => ({
    type: "SET_DECORATIONS",
    status: "REQUEST",
    decorations,
});

export const setDecorationsSuccess = (): SetDecorationsSuccess => ({
    type: "SET_DECORATIONS",
    status: "SUCCESS",
});

export const setDecorationsFailure = (message: string): SetDecorationsFailure => ({
    type: "SET_DECORATIONS",
    status: "FAILURE",
    message,
});

export const maximizeWindowRequest = (): MaximizeWindowRequest => ({
    type: "MAXIMIZE_WINDOW",
    status: "REQUEST",
});

export const maximizeWindowSuccess = (): MaximizeWindowSuccess => ({
    type: "MAXIMIZE_WINDOW",
    status: "SUCCESS",
});

export const maximizeWindowFailure = (message: string): MaximizeWindowFailure => ({
    type: "MAXIMIZE_WINDOW",
    status: "FAILURE",
    message,
});

export const minimizeWindowRequest = (): MinimizeWindowRequest => ({
    type: "MINIMIZE_WINDOW",
    status: "REQUEST",
});

export const minimizeWindowSuccess = (): MinimizeWindowSuccess => ({
    type: "MINIMIZE_WINDOW",
    status: "SUCCESS",
});

export const minimizeWindowFailure = (message: string): MinimizeWindowFailure => ({
    type: "MINIMIZE_WINDOW",
    status: "FAILURE",
    message,
});

export const closeWindowRequest = (): CloseWindowRequest => ({
    type: "CLOSE_WINDOW",
    status: "REQUEST",
});

export const closeWindowSuccess = (): CloseWindowSuccess => ({
    type: "CLOSE_WINDOW",
    status: "SUCCESS",
});

export const closeWindowFailure = (message: string): CloseWindowFailure => ({
    type: "CLOSE_WINDOW",
    status: "FAILURE",
    message,
});
