import type { WebviewWindow } from "@tauri-apps/api/webviewWindow";

import type { AppActionBase } from "./actions";

export interface IWindowReducerState {
    windows: Record<string, WebviewWindow>; // title -> window
}

export const LISTEN_WINDOW_CLOSE = "LISTEN_WINDOW_CLOSE";
export const CREATE_WINDOW = "CREATE_WINDOW";
export const CHANGE_WINDOW_TITLE = "CHANGE_WINDOW_TITLE";
export const SET_DECORATIONS = "SET_DECORATIONS";
export const MAXIMIZE_WINDOW = "MAXIMIZE_WINDOW";
export const MINIMIZE_WINDOW = "MINIMIZE_WINDOW";
export const CLOSE_WINDOW = "CLOSE_WINDOW";

export type ListenWindowCloseRequest = AppActionBase<typeof LISTEN_WINDOW_CLOSE, "REQUEST"> & {};
export type ListenWindowCloseSuccess = AppActionBase<typeof LISTEN_WINDOW_CLOSE, "SUCCESS"> & {};
export type ListenWindowCloseFailure = AppActionBase<typeof LISTEN_WINDOW_CLOSE, "FAILURE"> & { message: string };

export type CreateNewWindowRequest = AppActionBase<typeof CREATE_WINDOW, "REQUEST"> & { title: string };
export type CreateNewWindowSuccess = AppActionBase<typeof CREATE_WINDOW, "SUCCESS"> & { title: string; window: WebviewWindow };
export type CreateNewWindowFailure = AppActionBase<typeof CREATE_WINDOW, "FAILURE"> & { message: string };

export type ChangeWindowTitleRequest = AppActionBase<typeof CHANGE_WINDOW_TITLE, "REQUEST"> & { title: string; dest: string };
export type ChangeWindowTitleSuccess = AppActionBase<typeof CHANGE_WINDOW_TITLE, "SUCCESS"> & { title: string; dest: string };
export type ChangeWindowTitleFailure = AppActionBase<typeof CHANGE_WINDOW_TITLE, "FAILURE"> & { message: string };

export type SetDecorationsRequest = AppActionBase<typeof SET_DECORATIONS, "REQUEST"> & { decorations: boolean };
export type SetDecorationsSuccess = AppActionBase<typeof SET_DECORATIONS, "SUCCESS"> & {};
export type SetDecorationsFailure = AppActionBase<typeof SET_DECORATIONS, "FAILURE"> & { message: string };

export type MaximizeWindowRequest = AppActionBase<typeof MAXIMIZE_WINDOW, "REQUEST"> & {};
export type MaximizeWindowSuccess = AppActionBase<typeof MAXIMIZE_WINDOW, "SUCCESS"> & {};
export type MaximizeWindowFailure = AppActionBase<typeof MAXIMIZE_WINDOW, "FAILURE"> & { message: string };

export type MinimizeWindowRequest = AppActionBase<typeof MINIMIZE_WINDOW, "REQUEST"> & {};
export type MinimizeWindowSuccess = AppActionBase<typeof MINIMIZE_WINDOW, "SUCCESS"> & {};
export type MinimizeWindowFailure = AppActionBase<typeof MINIMIZE_WINDOW, "FAILURE"> & { message: string };

export type CloseWindowRequest = AppActionBase<typeof CLOSE_WINDOW, "REQUEST"> & {};
export type CloseWindowSuccess = AppActionBase<typeof CLOSE_WINDOW, "SUCCESS"> & {};
export type CloseWindowFailure = AppActionBase<typeof CLOSE_WINDOW, "FAILURE"> & { message: string };

export type WindowActions =
    | ListenWindowCloseRequest
    | ListenWindowCloseSuccess
    | ListenWindowCloseFailure
    | CreateNewWindowRequest
    | CreateNewWindowSuccess
    | CreateNewWindowFailure
    | ChangeWindowTitleRequest
    | ChangeWindowTitleSuccess
    | ChangeWindowTitleFailure
    | SetDecorationsRequest
    | SetDecorationsSuccess
    | SetDecorationsFailure
    | MaximizeWindowRequest
    | MaximizeWindowSuccess
    | MaximizeWindowFailure
    | MinimizeWindowRequest
    | MinimizeWindowSuccess
    | MinimizeWindowFailure
    | CloseWindowRequest
    | CloseWindowSuccess
    | CloseWindowFailure;

export type WindowActionTypes =
    | typeof LISTEN_WINDOW_CLOSE
    | typeof CREATE_WINDOW
    | typeof CHANGE_WINDOW_TITLE
    | typeof SET_DECORATIONS
    | typeof MAXIMIZE_WINDOW
    | typeof MINIMIZE_WINDOW
    | typeof CLOSE_WINDOW;
