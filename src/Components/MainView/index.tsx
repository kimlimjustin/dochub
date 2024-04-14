import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import File from "../File";
import Preview from "../Preview";

import type { IAppState } from "../../Store/Reducers";
import type { IFile } from "../../Typings/Store/files";
import { ThemedDiv } from "../Theme";

export interface IMainViewProps {
    currentDirectory: string;
}

// Places directories first, sorts files and directories by name
// TODO: Implement sorting by other properties
export const sortFiles = (a: IFile, b: IFile): number => {
    if ((!a.is_dir && b.is_dir) || (a.is_dir && !b.is_dir)) return b.is_dir ? 1 : -1; // Simulates xor for is_dir property
    return a.basename || "" > b.basename || "" ? 1 : -1;
};

const MainView = ({ currentDirectory }: IMainViewProps) => {
    const files = useSelector<IAppState, IAppState["files"]["files"]>((state) => state.files.files);
    const filePreview = useSelector<IAppState, IAppState["files"]["filePreview"]>((state) => state.files.filePreview);

    return (
        <ThemedDiv componentName="mainBox" className="main-box">
            <div className="workspace">
                {(Object.values(files) as IFile[]).sort(sortFiles).reduce<JSX.Element[]>((accum, metadata) => {
                    let parentDirectory = metadata.file_path.substring(0, metadata.file_path.length - metadata.basename.length);
                    if (parentDirectory.endsWith("\\")) parentDirectory = parentDirectory.substring(0, parentDirectory.length - 1);
                    if (parentDirectory !== currentDirectory) return accum;
                    return [...accum, <File mode="Detail" metadata={metadata} key={metadata.file_path} />];
                }, [])}
            </div>
            {filePreview && <Preview filePath={filePreview} />}
        </ThemedDiv>
    );
};

export default MainView;
