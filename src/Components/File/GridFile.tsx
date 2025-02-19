import React, { MouseEvent, JSX } from "react";
import FileMetaData from "../../Typings/fileMetaData";
import { ThemedButton } from "../Theme";

export interface IGridFileProps {
    size: number;
    metadata: FileMetaData;
    handleFileRightClick: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, path: string) => void;
    handleFileDoubleClick: (isDir: boolean, dirName: string) => void;
    handleFileSingleClick: (e: MouseEvent<HTMLButtonElement>, dirName: string) => void;
}

const GridFile = ({ size, metadata, handleFileRightClick, handleFileDoubleClick, handleFileSingleClick }: IGridFileProps): JSX.Element => {
    return (
        <ThemedButton
            componentName="fileGrid"
            onContextMenu={(e) => handleFileRightClick(e, metadata.file_path)}
            onDoubleClick={() => handleFileDoubleClick(!!metadata.is_dir, metadata.file_path)}
            style={{ width: size, minHeight: size }}
            className="gridfile-container"
        >
            <span>Icon</span>
            <p style={{ wordWrap: "break-word", margin: 0 }}>{metadata.basename}</p>
        </ThemedButton>
    );
};

export default GridFile;
