import type { AppActionTypes, AppActions } from "./app";
import type { CliActionTypes, CliActions } from "./cli";
import type { ClipboardActionTypes, ClipboardActions } from "./clipboard";
import type { ConfigActionTypes, ConfigActions } from "./config";
import type { DirectoryActionTypes, DirectoryActions } from "./directory";
import type { DriveActionTypes, DriveActions } from "./drive";
import type { FavoritesActionTypes, FavoritesActions } from "./favorites";
import type { FileActionTypes, FileActions } from "./files";
import type { LocalesActionTypes, LocalesActions } from "./locales";
import type { PlatformActionTypes, PlatformActions } from "./platform";
import type { SelectionActionTypes, SelectionActions } from "./selection";
import type { StorageActionTypes, StorageActions } from "./storage";
import type { TabActionTypes, TabActions } from "./tab";
import type { WindowActionTypes, WindowActions } from "./window";

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
