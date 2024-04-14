import { AppActions, AppActionTypes } from "./app";
import { CliActions, CliActionTypes } from "./cli";
import { ClipboardActions, ClipboardActionTypes } from "./clipboard";
import { ConfigActions, ConfigActionTypes } from "./config";
import { DirectoryActions, DirectoryActionTypes } from "./directory";
import { DriveActions, DriveActionTypes } from "./drive";
import { FavoritesActions, FavoritesActionTypes } from "./favorites";
import { FileActions, FileActionTypes } from "./files";
import { LocalesActions, LocalesActionTypes } from "./locales";
import { PlatformActions, PlatformActionTypes } from "./platform";
import { StorageActions, StorageActionTypes } from "./storage";
import { TabActions, TabActionTypes } from "./tab";
import { WindowActions, WindowActionTypes } from "./window";
import { SelectionActions, SelectionActionTypes } from "./selection";
import store from "../../Store";

export type Actions =
    | AppActions
    | CliActions
    | ClipboardActions
    | ConfigActions
    | DirectoryActions
    | DriveActions
    | FavoritesActions
    | FileActions
    | LocalesActions
    | PlatformActions
    | StorageActions
    | TabActions
    | WindowActions
    | SelectionActions;

export type ActionTypes =
    | AppActionTypes
    | CliActionTypes
    | ConfigActionTypes
    | ClipboardActionTypes
    | DirectoryActionTypes
    | DriveActionTypes
    | FavoritesActionTypes
    | FileActionTypes
    | LocalesActionTypes
    | PlatformActionTypes
    | StorageActionTypes
    | TabActionTypes
    | WindowActionTypes
    | SelectionActionTypes;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
