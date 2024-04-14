import React, { type FormEvent, useEffect, useState } from "react";

import type { ITab } from ".";
import { getParentDirectory } from "../../Helpers/paths";
import { ThemedButton, ThemedDiv, ThemedInput } from "../Theme";

export interface ISubHeaderProps {
    activeTab: ITab;
    handleForward: () => void;
    handleBack: () => void;
    handlePathChange: (tab: ITab) => void;
    handleDirectoryRefresh: (dirName: string) => void;
}

const SubHeader = ({ activeTab, handleBack, handleForward, handlePathChange, handleDirectoryRefresh }: ISubHeaderProps) => {
    const [tempTab, setTempTab] = useState(activeTab);

    // Updates tempTab variable with external tab changes
    useEffect(() => {
        if (JSON.stringify(activeTab) === JSON.stringify(tempTab)) return;
        setTempTab(activeTab);
    }, [activeTab, tempTab]);

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handlePathChange(tempTab);
    };

    return (
        <ThemedDiv componentName="subheader" id="subheader-container" className="subheader">
            <ThemedDiv componentName="navigator" className="navigator">
                <ThemedButton
                    componentName="navigatorBack"
                    className="navigator-back"
                    onClick={() => handleBack()}
                    // id="go-back"
                    title="Go Back (Alt + Left Arrow)"
                >
                    &larr;
                </ThemedButton>

                <ThemedButton
                    componentName="navigatorForward"
                    className="navigator-forward"
                    onClick={() => handleForward()}
                    // id="go-forward"
                    title="Go Forward (Alt + Right Arrow)"
                >
                    &rarr;
                </ThemedButton>

                <ThemedButton
                    componentName="navigatorParentDir"
                    className="navigator-parent-dir"
                    onClick={() =>
                        handlePathChange({
                            ...tempTab,
                            path: getParentDirectory(tempTab.path),
                        })
                    }
                    // id="go-parent-dir"
                    title="Parent Directory (Alt + Up Arrow)"
                >
                    &uarr;
                </ThemedButton>

                <ThemedButton
                    componentName="navigatorRefresh"
                    className="navigator-refresh"
                    onClick={() => handleDirectoryRefresh(tempTab.path)}
                    // id="refresh"
                    title="Reload (f5)"
                >
                    &#10227;
                </ThemedButton>
            </ThemedDiv>

            <form onSubmit={handleFormSubmit} className="path-navigator">
                <ThemedInput
                    componentName="pathNavigator"
                    // @ts-ignore
                    type="text"
                    value={tempTab.path}
                    // @ts-ignore
                    onChange={(e) => setTempTab({ ...tempTab, path: e.target.value })}
                />
            </form>
        </ThemedDiv>
    );
};

export default SubHeader;
