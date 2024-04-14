import React, { type MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import DetailFile from "./DetailFile";
import GridFile from "./GridFile";

import { getStandardPath } from "../../Helpers/paths";
import { openFilePreview, openFileRequest } from "../../Store/ActionCreators/FilesActionCreators";
import { updateSelection } from "../../Store/ActionCreators/SelectionActionCreators";
import { sortFiles } from "../MainView";

export type FileDisplayMode = "GridLarge" | "GridMedium" | "GridSmall" | "Detail";

export interface IFileProps {
    mode: FileDisplayMode;
    metadata: FileMetaData;
}

export const File = ({ mode, metadata }: IFileProps): JSX.Element => {
    const dispatch = useDispatch();
    const activeTab = useSelector<IAppState, IAppState["tabs"]["activeTab"]>((state) => state.tabs.activeTab);
    const selected = useSelector<IAppState, IAppState["selection"]["selected"]>((state) => state.selection.selected);
    const allFiles = useSelector<IAppState, IAppState["files"]["files"]>((state) => state.files.files);

    const handleFileSingleClick = (e: MouseEvent<HTMLButtonElement>, filePath: string) => {
        if (e.shiftKey) {
            const files = Object.values(allFiles).sort(sortFiles);
            const firstSelectedIndex = files.findIndex((file) => file.file_path === selected[0]);
            const currentFileIndex = files.findIndex((file) => file.file_path === filePath);
            const selectedFiles =
                firstSelectedIndex < currentFileIndex
                    ? files.slice(firstSelectedIndex, currentFileIndex + 1)
                    : files.slice(currentFileIndex, firstSelectedIndex + 1);
            dispatch(updateSelection({ selected: selectedFiles.map((file) => file.file_path) }));
        } else if (e.ctrlKey)
            dispatch(
                updateSelection({ selected: selected.includes(filePath) ? selected.filter((path) => path !== filePath) : [...selected, filePath] }),
            );
        else dispatch(updateSelection({ selected: [filePath] }));
    };

    const handleFileRightClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, path: string) => {
        e.preventDefault();
        dispatch(openFilePreview(path));
    };

    const handleFileDoubleClick = (isDir: boolean, filePath: string) => {
        if (!isDir) {
            dispatch(openFileRequest(filePath));
            return;
        }

        dispatch(
            updateTab(activeTab.name, {
                ...activeTab,
                path: getStandardPath(filePath),
                name: filePath.split("\\").pop() || "",
            }),
        );
        dispatch(
            setActiveTab({
                name: filePath.split("\\").pop() || "",
                path: getStandardPath(filePath),
                id: activeTab.id,
            }),
        );
    };

    switch (mode) {
        case "GridLarge":
            return (
                <GridFile
                    size={96}
                    metadata={metadata}
                    handleFileRightClick={handleFileRightClick}
                    handleFileDoubleClick={handleFileDoubleClick}
                    handleFileSingleClick={handleFileSingleClick}
                />
            );
        case "GridMedium":
            return (
                <GridFile
                    size={72}
                    metadata={metadata}
                    handleFileRightClick={handleFileRightClick}
                    handleFileDoubleClick={handleFileDoubleClick}
                    handleFileSingleClick={handleFileSingleClick}
                />
            );
        case "GridSmall":
            return (
                <GridFile
                    size={48}
                    metadata={metadata}
                    handleFileRightClick={handleFileRightClick}
                    handleFileDoubleClick={handleFileDoubleClick}
                    handleFileSingleClick={handleFileSingleClick}
                />
            );
        case "Detail":
            return (
                <DetailFile
                    metadata={metadata}
                    handleFileRightClick={handleFileRightClick}
                    handleFileDoubleClick={handleFileDoubleClick}
                    handleFileSingleClick={handleFileSingleClick}
                />
            );
        default:
            return <div>File mode not supported</div>;
    }
};

export default File;
