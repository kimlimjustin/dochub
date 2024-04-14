import dropWhile from "lodash.dropwhile";
import omit from "lodash.omit";

import type { IDirectoryReducerState } from "../../Typings/Store/directory";
import type { Actions } from "../../Typings/Store/store";

const MAX_HISTORY_SIZE = 5;

const initialState: IDirectoryReducerState = {
    directories: {},
    listeners: {},
    searches: {},
    history: [],
    historyIdx: -1,
};

const reducer = (state = initialState, action: Actions): IDirectoryReducerState => {
    if (action.status !== "SUCCESS") return state;

    switch (action.type) {
        case "FETCH_FILES":
            return {
                ...state,
                directories: {
                    ...state.directories,
                    [action.dirName]: {
                        ...(state.directories?.[action.dirName] || {}),
                        numFiles: action.meta.num_files,
                        skippedFiles: action.meta.skipped_files,
                        dirName: action.dirName,
                        files: action.meta.files.map((file) => file.file_path),
                    },
                },
            };
        case "PUSH_HISTORY":
            return {
                ...state,
                history: dropWhile(
                    // Overwrites future history if user has gone back and clicks a new directory
                    state.historyIdx === state.history.length - 1
                        ? [...state.history, action.path]
                        : [...state.history.slice(0, state.historyIdx + 1), action.path],
                    (_entry, idx, self) => idx < self.length - MAX_HISTORY_SIZE,
                ),
                historyIdx: state.historyIdx + 1,
            };
        case "POP_HISTORY":
            return {
                ...state,
                history: state.history.slice(0, -2),
                historyIdx: state.historyIdx - 1,
            };
        case "UPDATE_HISTORY_IDX":
            return {
                ...state,
                historyIdx: action.idx,
            };
        case "FETCH_IS_DIR": // ! CONSIDER NOT IMPLEMENTING IN REDUX (CACHE, DUPLICATE)
            return {
                ...state,
            };
        case "FETCH_FILE_EXISTS": // ! CONSIDER NOT IMPLEMENTING IN REDUX (CACHE, DUPLICATE)
            return {
                ...state,
            };
        // * Don't need to handle
        // case 'MAKE_DIRECTORY':
        //   return {
        //     ...state,
        //   };
        case "LISTEN_DIRECTORY":
            return {
                ...state,
                listeners: {
                    ...state.listeners,
                },
            };
        case "UNLISTEN_DIRECTORY":
            return {
                ...state,
                listeners: omit(state.listeners, action.dirName),
            };
        case "FETCH_DIRECTORY_SIZE":
            return {
                ...state,
                directories: {
                    ...state.directories,
                    [action.dirName]: {
                        ...(state.directories?.[action.dirName] || {}),
                        size: action.dirSize,
                    },
                },
            };
        // ! TODO INCOMPLETE
        // case 'INIT_DIRECTORY_SEARCH':
        //   return {
        //     ...state,
        //   };
        // ! TODO INCOMPLETE
        // case 'CANCEL_DIRECTORY_SEARCH':
        //   return {
        //     ...state,
        //   };
        default:
            return state;
    }
};

export default reducer;
