import type { UnlistenFn } from "@tauri-apps/api/event";

import type {
    CancelDirectorySearchFailure,
    CancelDirectorySearchRequest,
    CancelDirectorySearchSuccess,
    DirectorySearchPartialResultFailure,
    DirectorySearchPartialResultSuccess,
    FetchDirectorySizeFailure,
    FetchDirectorySizeRequest,
    FetchDirectorySizeSuccess,
    FetchFileExistsFailure,
    FetchFileExistsRequest,
    FetchFileExistsSuccess,
    FetchFilesFailure,
    FetchFilesRequest,
    FetchFilesSuccess,
    FetchIsDirectoryFailure,
    FetchIsDirectoryRequest,
    FetchIsDirectorySuccess,
    IDirectoryMeta,
    InitDirectorySearchFailure,
    InitDirectorySearchRequest,
    InitDirectorySearchSuccess,
    ListenDirectoryFailure,
    ListenDirectoryRequest,
    ListenDirectorySuccess,
    MakeDirectoryFailure,
    MakeDirectoryRequest,
    MakeDirectorySuccess,
    PopHistorySuccess,
    PushHistorySuccess,
    UnlistenDirectoryFailure,
    UnlistenDirectoryRequest,
    UnlistenDirectorySuccess,
    UpdateHistoryIdxFailure,
    UpdateHistoryIdxRequest,
    UpdateHistoryIdxSuccess,
} from "../../Typings/Store/directory";

import type FileMetaData from "../../Typings/fileMetaData";

export const fetchFilesRequest = (dirName: string, pushToHistory = true): FetchFilesRequest => ({
    type: "FETCH_FILES",
    status: "REQUEST",
    dirName,
    pushToHistory,
});

export const fetchFilesSuccess = (dirName: string, meta: IDirectoryMeta): FetchFilesSuccess => ({
    type: "FETCH_FILES",
    status: "SUCCESS",
    dirName,
    meta,
});

export const fetchFilesFailure = (message: string): FetchFilesFailure => ({
    type: "FETCH_FILES",
    status: "FAILURE",
    message,
});

export const fetchIsDirectoryRequest = (path: string): FetchIsDirectoryRequest => ({
    type: "FETCH_IS_DIR",
    status: "REQUEST",
    path,
});

export const fetchIsDirectorySuccess = (isDir: boolean): FetchIsDirectorySuccess => ({
    type: "FETCH_IS_DIR",
    status: "SUCCESS",
    isDir,
});

export const fetchIsDirectoryFailure = (message: string): FetchIsDirectoryFailure => ({
    type: "FETCH_IS_DIR",
    status: "FAILURE",
    message,
});

export const fetchFileExistsRequest = (filePath: string): FetchFileExistsRequest => ({
    type: "FETCH_FILE_EXISTS",
    status: "REQUEST",
    filePath,
});

export const fetchFileExistsSuccess = (exists: boolean): FetchFileExistsSuccess => ({
    type: "FETCH_FILE_EXISTS",
    status: "SUCCESS",
    exists,
});

export const fetchFileExistsFailure = (message: string): FetchFileExistsFailure => ({
    type: "FETCH_FILE_EXISTS",
    status: "FAILURE",
    message,
});

export const makeDirectoryRequest = (dirPath: string): MakeDirectoryRequest => ({
    type: "MAKE_DIRECTORY",
    status: "REQUEST",
    dirPath,
});

export const makeDirectorySuccess = (): MakeDirectorySuccess => ({
    type: "MAKE_DIRECTORY",
    status: "SUCCESS",
});

export const makeDirectoryFailure = (message: string): MakeDirectoryFailure => ({
    type: "MAKE_DIRECTORY",
    status: "FAILURE",
    message,
});

export const listenDirectoryRequest = (callback: (dirPath: string) => void): ListenDirectoryRequest => ({
    type: "LISTEN_DIRECTORY",
    status: "REQUEST",
    callback: callback,
});

export const listenDirectorySuccess = (): ListenDirectorySuccess => ({
    type: "LISTEN_DIRECTORY",
    status: "SUCCESS",
    callback: () => {},
});

export const listenDirectoryFailure = (message: string): ListenDirectoryFailure => ({
    type: "LISTEN_DIRECTORY",
    status: "FAILURE",
    message,
});

export const unlistenDirectoryRequest = (dirName: string): UnlistenDirectoryRequest => ({
    type: "UNLISTEN_DIRECTORY",
    status: "REQUEST",
    dirName,
});

export const unlistenDirectorySuccess = (dirName: string): UnlistenDirectorySuccess => ({
    type: "UNLISTEN_DIRECTORY",
    status: "SUCCESS",
    dirName,
});

export const unlistenDirectoryFailure = (message: string): UnlistenDirectoryFailure => ({
    type: "UNLISTEN_DIRECTORY",
    status: "FAILURE",
    message,
});

export const fetchDirectorySizeRequest = (dirName: string): FetchDirectorySizeRequest => ({
    type: "FETCH_DIRECTORY_SIZE",
    status: "REQUEST",
    dirName,
});

export const fetchDirectorySizeSuccess = (dirName: string, dirSize: number): FetchDirectorySizeSuccess => ({
    type: "FETCH_DIRECTORY_SIZE",
    status: "SUCCESS",
    dirName,
    dirSize,
});

export const fetchDirectorySizeFailure = (message: string): FetchDirectorySizeFailure => ({
    type: "FETCH_DIRECTORY_SIZE",
    status: "FAILURE",
    message,
});

export const initDirectorySearchRequest = (
    dirName: string,
    pattern: string,
    callback: (partialFound: FileMetaData[]) => void,
): InitDirectorySearchRequest => ({
    type: "INIT_DIRECTORY_SEARCH",
    status: "REQUEST",
    dirName,
    pattern,
    callback,
});

export const directorySearchSuccess = (results: FileMetaData[]): InitDirectorySearchSuccess => ({
    type: "INIT_DIRECTORY_SEARCH",
    status: "SUCCESS",
    results,
});

export const directorySearchFailure = (message: string): InitDirectorySearchFailure => ({
    type: "INIT_DIRECTORY_SEARCH",
    status: "FAILURE",
    message,
});

export const directorySearchPartialResultSuccess = (result: FileMetaData[]): DirectorySearchPartialResultSuccess => ({
    type: "DIRECTORY_SEARCH_PARTIAL_RESULT",
    status: "SUCCESS",
    result,
});

export const directorySearchPartialResultFailure = (message: string): DirectorySearchPartialResultFailure => ({
    type: "DIRECTORY_SEARCH_PARTIAL_RESULT",
    status: "FAILURE",
    message,
});

export const cancelDirectorySearchRequest = (dirName: string, listener: UnlistenFn): CancelDirectorySearchRequest => ({
    type: "CANCEL_DIRECTORY_SEARCH",
    status: "REQUEST",
    dirName,
    listener,
});

export const cancelDirectorySearchSuccess = (dirName: string): CancelDirectorySearchSuccess => ({
    type: "CANCEL_DIRECTORY_SEARCH",
    status: "SUCCESS",
    dirName,
});

export const cancelDirectorySearchFailure = (message: string): CancelDirectorySearchFailure => ({
    type: "CANCEL_DIRECTORY_SEARCH",
    status: "FAILURE",
    message,
});

export const pushHistory = (path: string): PushHistorySuccess => ({
    type: "PUSH_HISTORY",
    status: "SUCCESS",
    path,
});

export const popHistory = (number = 1): PopHistorySuccess => ({
    type: "POP_HISTORY",
    status: "SUCCESS",
    number,
});

export const updateHistoryIdxRequest = (idx: number): UpdateHistoryIdxRequest => ({
    type: "UPDATE_HISTORY_IDX",
    status: "REQUEST",
    idx,
});

export const updateHistoryIdxSuccess = (idx: number): UpdateHistoryIdxSuccess => ({
    type: "UPDATE_HISTORY_IDX",
    status: "SUCCESS",
    idx,
});

export const updateHistoryIdxFailure = (message: string): UpdateHistoryIdxFailure => ({
    type: "UPDATE_HISTORY_IDX",
    status: "FAILURE",
    message,
});
