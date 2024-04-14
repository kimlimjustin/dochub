import type FileMetaData from "../../Typings/fileMetaData";

import {
    type FileTrashMeta,
    type TrashData,
    type CalculateFileSizeFailure,
    type CalculateFileSizeRequest,
    type CalculateFileSizeSuccess,
    type CopyFileFailure,
    type CopyFileRequest,
    type CopyFileSuccess,
    type CreateFileFailure,
    type CreateFileRequest,
    type CreateFileSuccess,
    type CutFileFailure,
    type CutFileRequest,
    type CutFileSuccess,
    type DeleteFilesFailure,
    type DeleteFilesRequest,
    type DeleteFilesSuccess,
    type ExtractIconFailure,
    type ExtractIconRequest,
    type ExtractIconSuccess,
    type FetchFilePropertiesFailure,
    type FetchFilePropertiesRequest,
    type FetchFilePropertiesSuccess,
    type GetTrashedFilesFailure,
    type GetTrashedFilesRequest,
    type GetTrashedFilesSuccess,
    type IsDirectoryFailure,
    type IsDirectoryRequest,
    type IsDirectorySuccess,
    type OpenFileFailure,
    type OpenFileRequest,
    type OpenFileSuccess,
    type PurgeFilesFailure,
    type PurgeFilesRequest,
    type PurgeFilesSuccess,
    type ReadAssetFailure,
    type ReadAssetRequest,
    type ReadAssetSuccess,
    type ReadBufferFailure,
    type ReadBufferRequest,
    type ReadBufferSuccess,
    type ReadFileFailure,
    type ReadFileRequest,
    type ReadFileSuccess,
    type ReadJsonFileFailure,
    type ReadJsonFileRequest,
    type ReadJsonFileSuccess,
    type RemoveFileFailure,
    type RemoveFileRequest,
    type RemoveFileSuccess,
    type RenameFileFailure,
    type RenameFileRequest,
    type RenameFileSuccess,
    type RestoreFileFailure,
    type RestoreFileRequest,
    type RestoreFilesFailure,
    type RestoreFilesRequest,
    type RestoreFilesSuccess,
    type RestoreFileSuccess,
    type RevealFileFailure,
    type RevealFileRequest,
    type RevealFileSuccess,
    type OpenFilePreviewSuccess,
    type CloseFilePreviewSuccess,
    type FileOperationSuccess,
    FileOperationFailure,
    type IOperation,
} from "../../Typings/Store/files";

export const readFileRequest = (fileName: string): ReadFileRequest => ({
    type: "READ_FILE",
    status: "REQUEST",
    fileName,
});

export const readFileSuccess = (fileName: string, content: string): ReadFileSuccess => ({
    type: "READ_FILE",
    status: "SUCCESS",
    fileName,
    content,
});

export const readFileFailure = (message: string): ReadFileFailure => ({
    type: "READ_FILE",
    status: "FAILURE",
    message,
});

export const readBufferRequest = (fileName: string): ReadBufferRequest => ({
    type: "READ_BUFFER",
    status: "REQUEST",
    fileName,
});

export const readBufferSuccess = (fileName: string, content: Buffer): ReadBufferSuccess => ({
    type: "READ_BUFFER",
    status: "SUCCESS",
    fileName,
    content,
});

export const readBufferFailure = (message: string): ReadBufferFailure => ({
    type: "READ_BUFFER",
    status: "FAILURE",
    message,
});

export const openFileRequest = (fileName: string): OpenFileRequest => ({
    type: "OPEN_FILE",
    status: "REQUEST",
    fileName,
});

export const openFileSuccess = (): OpenFileSuccess => ({
    type: "OPEN_FILE",
    status: "SUCCESS",
});

export const openFileFailure = (message: string): OpenFileFailure => ({
    type: "OPEN_FILE",
    status: "FAILURE",
    message,
});

export const readAssetRequest = (fileName: string): ReadAssetRequest => ({
    type: "READ_ASSET",
    status: "REQUEST",
    fileName,
});

export const readAssetSuccess = (fileName: string, content: string): ReadAssetSuccess => ({
    type: "READ_ASSET",
    status: "SUCCESS",
    fileName,
    content,
});

export const readAssetFailure = (message: string): ReadAssetFailure => ({
    type: "READ_ASSET",
    status: "FAILURE",
    message,
});

export const readJsonFileRequest = (fileName: string): ReadJsonFileRequest => ({
    type: "READ_JSON_FILE",
    status: "REQUEST",
    fileName,
});

export const readJsonFileSuccess = (fileName: string, content: JSON): ReadJsonFileSuccess => ({
    type: "READ_JSON_FILE",
    status: "SUCCESS",
    fileName,
    content,
});

export const readJsonFileFailure = (message: string): ReadJsonFileFailure => ({
    type: "READ_JSON_FILE",
    status: "FAILURE",
    message,
});

export const createFileRequest = (fileName: string): CreateFileRequest => ({
    type: "CREATE_FILE",
    status: "REQUEST",
    fileName,
});

export const createFileSuccess = (): CreateFileSuccess => ({
    type: "CREATE_FILE",
    status: "SUCCESS",
});

export const createFileFailure = (message: string): CreateFileFailure => ({
    type: "CREATE_FILE",
    status: "FAILURE",
    message,
});

export const fetchFilePropertiesRequest = (fileName: string): FetchFilePropertiesRequest => ({
    type: "FETCH_FILE_PROPERTIES",
    status: "REQUEST",
    fileName,
});

export const fetchFilePropertiesSuccess = (fileName: string, metadata: FileMetaData): FetchFilePropertiesSuccess => ({
    type: "FETCH_FILE_PROPERTIES",
    status: "SUCCESS",
    fileName,
    metadata,
});

export const fetchFilePropertiesFailure = (message: string): FetchFilePropertiesFailure => ({
    type: "FETCH_FILE_PROPERTIES",
    status: "FAILURE",
    message,
});

export const isDirectoryRequest = (fileName: string): IsDirectoryRequest => ({
    type: "IS_DIRECTORY",
    status: "REQUEST",
    fileName,
});

export const isDirectorySuccess = (fileName: string, isDirectory: boolean): IsDirectorySuccess => ({
    type: "IS_DIRECTORY",
    status: "SUCCESS",
    fileName,
    isDirectory,
});

export const isDirectoryFailure = (message: string): IsDirectoryFailure => ({
    type: "IS_DIRECTORY",
    status: "FAILURE",
    message,
});

export const extractIconRequest = (fileName: string): ExtractIconRequest => ({
    type: "EXTRACT_ICON",
    status: "REQUEST",
    fileName,
});

export const extractIconSuccess = (fileName: string, iconPath: string): ExtractIconSuccess => ({
    type: "EXTRACT_ICON",
    status: "SUCCESS",
    fileName,
    iconPath,
});

export const extractIconFailure = (message: string): ExtractIconFailure => ({
    type: "EXTRACT_ICON",
    status: "FAILURE",
    message,
});

export const calculateFileSizeRequest = (fileName: string): CalculateFileSizeRequest => ({
    type: "CALCULATE_FILE_SIZE",
    status: "REQUEST",
    fileName,
});

export const calculateFileSizeSuccess = (fileName: string, size: number): CalculateFileSizeSuccess => ({
    type: "CALCULATE_FILE_SIZE",
    status: "SUCCESS",
    fileName,
    size,
});

export const calculateFileSizeFailure = (message: string): CalculateFileSizeFailure => ({
    type: "CALCULATE_FILE_SIZE",
    status: "FAILURE",
    message,
});

export const renameFileRequest = (fileName: string, dest: string): RenameFileRequest => ({
    type: "RENAME_FILE",
    status: "REQUEST",
    fileName,
    dest,
});

export const renameFileSuccess = (fileName: string, dest: string): RenameFileSuccess => ({
    type: "RENAME_FILE",
    status: "SUCCESS",
    fileName,
    dest,
});

export const renameFileFailure = (message: string): RenameFileFailure => ({
    type: "RENAME_FILE",
    status: "FAILURE",
    message,
});

export const copyFileRequest = (fileName: string, dest: string): CopyFileRequest => ({
    type: "COPY_FILE",
    status: "REQUEST",
    fileName,
    dest,
});

export const copyFileSuccess = (): CopyFileSuccess => ({
    type: "COPY_FILE",
    status: "SUCCESS",
});

export const copyFileFailure = (message: string): CopyFileFailure => ({
    type: "COPY_FILE",
    status: "FAILURE",
    message,
});

export const cutFileRequest = (fileName: string, dest: string): CutFileRequest => ({
    type: "CUT_FILE",
    status: "REQUEST",
    fileName,
    dest,
});

export const cutFileSuccess = (): CutFileSuccess => ({
    type: "CUT_FILE",
    status: "SUCCESS",
});

export const cutFileFailure = (message: string): CutFileFailure => ({
    type: "CUT_FILE",
    status: "FAILURE",
    message,
});

export const removeFileRequest = (fileName: string): RemoveFileRequest => ({
    type: "REMOVE_FILE",
    status: "REQUEST",
    fileName,
});

export const removeFileSuccess = (fileName: string): RemoveFileSuccess => ({
    type: "REMOVE_FILE",
    status: "SUCCESS",
    fileName,
});

export const removeFileFailure = (message: string): RemoveFileFailure => ({
    type: "REMOVE_FILE",
    status: "FAILURE",
    message,
});

export const revealFileRequest = (fileName: string, app = ""): RevealFileRequest => ({
    type: "REVEAL_FILE",
    status: "REQUEST",
    fileName,
    app,
});

export const revealFileSuccess = (): RevealFileSuccess => ({
    type: "REVEAL_FILE",
    status: "SUCCESS",
});

export const revealFileFailure = (message: string): RevealFileFailure => ({
    type: "REVEAL_FILE",
    status: "FAILURE",
    message,
});

export const getTrashedFilesRequest = (): GetTrashedFilesRequest => ({
    type: "GET_TRASHED_FILES",
    status: "REQUEST",
});

export const getTrashedFilesSuccess = (metadata: TrashData): GetTrashedFilesSuccess => ({
    type: "GET_TRASHED_FILES",
    status: "SUCCESS",
    metadata,
});

export const getTrashedFilesFailure = (message: string): GetTrashedFilesFailure => ({
    type: "GET_TRASHED_FILES",
    status: "FAILURE",
    message,
});

export const deleteFilesRequest = (paths: string[]): DeleteFilesRequest => ({
    type: "DELETE_FILES",
    status: "REQUEST",
    paths,
});

export const deleteFilesSuccess = (paths: string[]): DeleteFilesSuccess => ({
    type: "DELETE_FILES",
    status: "SUCCESS",
    paths,
});

export const deleteFilesFailure = (message: string): DeleteFilesFailure => ({
    type: "DELETE_FILES",
    status: "FAILURE",
    message,
});

export const restoreFileRequest = (originalParent: string, basename: string): RestoreFileRequest => ({
    type: "RESTORE_FILE",
    status: "REQUEST",
    originalParent,
    basename,
});

export const restoreFileSuccess = (): RestoreFileSuccess => ({
    type: "RESTORE_FILE",
    status: "SUCCESS",
});

export const restoreFileFailure = (message: string): RestoreFileFailure => ({
    type: "RESTORE_FILE",
    status: "FAILURE",
    message,
});

export const restoreFilesRequest = (paths: string[], force = false): RestoreFilesRequest => ({
    type: "RESTORE_FILES",
    status: "REQUEST",
    paths,
    force,
});

export const restoreFilesSuccess = (metadata: FileTrashMeta): RestoreFilesSuccess => ({
    type: "RESTORE_FILES",
    status: "SUCCESS",
    metadata,
});

export const restoreFilesFailure = (message: string): RestoreFilesFailure => ({
    type: "RESTORE_FILES",
    status: "FAILURE",
    message,
});

export const purgeFilesRequest = (paths: string[]): PurgeFilesRequest => ({
    type: "PURGE_FILES",
    status: "REQUEST",
    paths,
});

export const purgeFilesSuccess = (paths: string[]): PurgeFilesSuccess => ({
    type: "PURGE_FILES",
    status: "SUCCESS",
    paths,
});

export const purgeFilesFailure = (message: string): PurgeFilesFailure => ({
    type: "PURGE_FILES",
    status: "FAILURE",
    message,
});

export const openFilePreview = (path: string): OpenFilePreviewSuccess => ({
    type: "OPEN_FILE_PREVIEW",
    status: "SUCCESS",
    path,
});

export const closeFilePreview = (): CloseFilePreviewSuccess => ({
    type: "CLOSE_FILE_PREVIEW",
    status: "SUCCESS",
});

export const fileOperation = (operation: IOperation): FileOperationSuccess => ({
    type: "FILE_OPERATION",
    status: "SUCCESS",
    operation,
});
