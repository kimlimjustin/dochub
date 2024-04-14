import { combineReducers } from "redux";
import { Actions } from "../../Typings/Store/store";

import type { IAppReducerState } from "../../Typings/Store/app";
import type { ICliReducerState } from "../../Typings/Store/cli";
import type { IClipboardReducerState } from "../../Typings/Store/clipboard";
import type { IConfigReducerState } from "../../Typings/Store/config";
import type { IDirectoryReducerState } from "../../Typings/Store/directory";
import type { IDriveReducerState } from "../../Typings/Store/drive";
import type { IFavoritesReducerState } from "../../Typings/Store/favorites";
import type { IFilesReducerState } from "../../Typings/Store/files";
import type { ILocalesReducerState } from "../../Typings/Store/locales";
import type { IPlatformReducerState } from "../../Typings/Store/platform";
import type { IRequestReducerState } from "../../Typings/Store/request";
import type { ISelectionReducerState } from "../../Typings/Store/selection";
import type { IStorageReducerState } from "../../Typings/Store/storage";
import type { ITabReducerState } from "../../Typings/Store/tab";
import type { IWindowReducerState } from "../../Typings/Store/window";

import AppReducer from "./AppReducer";
import CliReducer from "./CliReducer";
import ClipboardReducer from "./ClipboardReducer";
import ConfigReducer from "./ConfigReducer";
import DirectoryReducer from "./DirectoryReducer";
import DriveReducer from "./DriveReducer";
import FavoritesReducer from "./FavoritesReducer";
import FilesReducer from "./FilesReducer";
import LocalesReducer from "./LocalesReducer";
import PlatformReducer from "./PlatformReducer";
import RequestReducer from "./RequestReducer";
import SelectionReducer from "./SelectionReducer";
import StorageReducer from "./StorageReducer";
import TabReducer from "./TabReducer";
import WindowReducer from "./WindowReducer";

export interface IAppState {
    app: IAppReducerState;
    clipboard: IClipboardReducerState;
    cli: ICliReducerState;
    config: IConfigReducerState;
    directory: IDirectoryReducerState;
    drive: IDriveReducerState;
    favorites: IFavoritesReducerState;
    files: IFilesReducerState;
    locales: ILocalesReducerState;
    platform: IPlatformReducerState;
    requests: IRequestReducerState;
    storage: IStorageReducerState;
    tabs: ITabReducerState;
    window: IWindowReducerState;
    selection: ISelectionReducerState;
}

const rootReducer = combineReducers({
    app: AppReducer,
    clipboard: ClipboardReducer,
    cli: CliReducer,
    config: ConfigReducer,
    directory: DirectoryReducer,
    drive: DriveReducer,
    favorites: FavoritesReducer,
    files: FilesReducer,
    locales: LocalesReducer,
    platform: PlatformReducer,
    requests: RequestReducer,
    storage: StorageReducer,
    tabs: TabReducer,
    window: WindowReducer,
    selection: SelectionReducer,
});

export default rootReducer;
