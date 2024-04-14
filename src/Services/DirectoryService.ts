import { invoke } from "@tauri-apps/api/core";
import type { UnlistenFn } from "@tauri-apps/api/event";
import { getCurrent } from "@tauri-apps/api/window";

import { fetchFilesRequest } from "../Store/ActionCreators/DirectoryActionCreators";
import type { IDirectoryMeta } from "../Typings/Store/directory";
import type FileMetaData from "../Typings/fileMetaData";

/**
 * Get files inside a directory
 * @returns {Promise<DirectoryData>}
 */
export const fetchFiles = async (dirName: string): Promise<IDirectoryMeta> => invoke<IDirectoryMeta>("read_directory", { dir: dirName });

/**
 * Check if given path is directory
 * @returns {Promise<boolean>}
 */
export const isDirectory = async (path: string): Promise<boolean> => invoke<boolean>("is_dir", { path });

/**
 * Return true if folder exist
 * @returns {boolean}
 */
export const fileExists = async (filePath: string): Promise<boolean> => invoke<boolean>("file_exist", { filePath });

/**
 * Create dir if not exists
 * @returns {boolean}
 */
export const makeDirectory = async (dirPath: string): Promise<boolean> => invoke<boolean>("create_dir_recursive", { dirPath });

/**
 * Listen to changes in a directory
 * @param {Function} callback - callback function
 * @returns {}
 */
export const listenDirectory = (callback: (dirPath: string) => void = () => undefined) => {
    getCurrent().listen("dir_change", (e: { payload: { path: string } }) => {
        const path = e.payload.path;
        const parent_path = path.split("/").slice(0, -1).join("/") + "/";
        callback(parent_path);
    });
};

/**
 * Unlisten to previous listener
 * @returns {Promise<void>}
 */
export const unlistenDirectory = async (listener: UnlistenFn): Promise<void> => {
    listener();
    getCurrent().emit("unlisten_dir");
};

/**
 * Get size of a directory
 * @returns {Promise<number>}
 */
export const fetchDirectorySize = async (dirName: string): Promise<number> => invoke<number>("get_dir_size", { dir: dirName });

/**
 * Search for a file/folder in a directory
 * @param {string} pattern - glob pattern
 * @returns {any}
 */
export const initDirectorySearch = async (dirName: string, pattern: string): Promise<FileMetaData[]> => {
    return invoke<FileMetaData[]>("search_in_dir", { dirPath: dirName, pattern });
};

/**
 * Stop all searching progress
 * @returns {Promise<boolean>}
 */
export const cancelDirectorySearch = async (searchListener: UnlistenFn): Promise<boolean> => {
    searchListener?.();
    await getCurrent().emit("unsearch");
    return !!searchListener;
};
