import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStandardPath } from "../../Helpers/paths";
import { fetchFilesRequest, updateHistoryIdxRequest } from "../../Store/ActionCreators/DirectoryActionCreators";
import { createTab, deleteTab, setActiveTab } from "../../Store/ActionCreators/TabActionCreators";
import { closeWindowRequest, maximizeWindowRequest, minimizeWindowRequest } from "../../Store/ActionCreators/WindowActionCreators";
import type { IAppState } from "../../Store/Reducers";
import { ThemedButton, ThemedDiv, ThemedSpan } from "../Theme";
import SubHeader from "./SubHeader";
let tabId = 0;
export interface ITab {
    name: string;
    path: string;
    id: number;
}

const Header = () => {
    const dispatch = useDispatch();
    const homeDirectory = useSelector<IAppState, IAppState["favorites"]["Home"]>((state) => state.favorites.Home);
    const tabs = useSelector<IAppState, IAppState["tabs"]["tabs"]>((state) => state.tabs.tabs);
    const activeTab = useSelector<IAppState, IAppState["tabs"]["activeTab"]>((state) => state.tabs.activeTab);
    const directoryHistoryIdx = useSelector<IAppState, IAppState["directory"]["historyIdx"]>((state) => state.directory.historyIdx);

    const createNewTab = () => {
        const newTab = { name: "New Tab", path: homeDirectory, id: ++tabId };
        dispatch(createTab(newTab));
        dispatch(setActiveTab(newTab));
    };

    const handleBack = () => dispatch(updateHistoryIdxRequest(directoryHistoryIdx - 1));
    const handleForward = () => dispatch(updateHistoryIdxRequest(directoryHistoryIdx + 1));
    const handlePathChange = (tab: ITab) => dispatch(setActiveTab({ ...tab, path: getStandardPath(tab.path) }));
    const refreshDirectory = (dirName: string) => dispatch(fetchFilesRequest(dirName));

    return (
        <ThemedDiv componentName="topbar" id="header-container" data-tauri-drag-region="">
            <ThemedDiv componentName="header" className="header" data-tauri-drag-region="">
                <ThemedDiv componentName="tabsManager" className="tabs-manager" data-tauri-drag-region="">
                    {Object.values(tabs).map((tab) => (
                        <ThemedButton
                            key={tab.id}
                            componentName="tab"
                            className={`tab ${activeTab.id === tab.id ? "active" : ""}`}
                            onClick={() => dispatch(setActiveTab(tab))}
                        >
                            <span id="tab-position">
                                {activeTab.id === tab.id ? "active" : ""} {tab.name}
                            </span>
                            <ThemedSpan
                                componentName="tabCloseButton"
                                className="tab-close-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(deleteTab(tab.id));
                                    dispatch(fetchFilesRequest(activeTab.path));
                                }}
                            >
                                &times;
                            </ThemedSpan>
                        </ThemedButton>
                    ))}

                    <ThemedButton componentName="createNewTab" onClick={createNewTab} className="create-new-tab">
                        +
                    </ThemedButton>
                </ThemedDiv>

                <ThemedDiv componentName="windowManager" className="window-manager">
                    <ThemedSpan
                        componentName="windowManagerMinimizeButton"
                        id="minimize"
                        title="Minimize"
                        onClick={() => dispatch(minimizeWindowRequest())}
                    />
                    <ThemedSpan
                        componentName="windowManagerMaximizeButton"
                        id="maximize"
                        title="Maximize"
                        onClick={() => dispatch(maximizeWindowRequest())}
                    />
                    <ThemedSpan
                        componentName="windowManagerExitButton"
                        id="exit"
                        title="Exit (Ctrl + w)"
                        onClick={() => dispatch(closeWindowRequest())}
                    />
                </ThemedDiv>
            </ThemedDiv>

            <SubHeader
                activeTab={activeTab}
                handleBack={handleBack}
                handleForward={handleForward}
                handlePathChange={handlePathChange}
                handleDirectoryRefresh={refreshDirectory}
            />
        </ThemedDiv>
    );
};

export default Header;
