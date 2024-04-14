import React, { useEffect, useState } from "react";

import MainView from "./Components/MainView";
import SettingsView from "./Components/SettingsView";

import ContextMenu from "./Components/ContextMenu";
import Header from "./Components/Header";
import LoadingBar from "./Components/LoadingBar";
import Properties from "./Components/Properties";
import Sidebar from "./Components/Sidebar";
import Infobar from "./Components/Infobar";
import OperationBar from "./Components/OperationBar";

import { setActiveTab } from "./Store/ActionCreators/TabActionCreators";
import { useAppDispatch, useAppSelector } from "./Store/Hooks";
import "./Public/style.scss";
import { ThemedDiv } from "./Components/Theme";

const App = () => {
    const dispatch = useAppDispatch();

    const homeDirectory = useAppSelector((state) => state.favorites.Home);
    const activeTab = useAppSelector((state) => state.tabs.activeTab);
    const config = useAppSelector((state) => state.config);

    const [isLoaded, setIsLoaded] = useState(false); // TODO REPLACE WITH SKELETON LOADING

    const setCurrentDirectory = (path: string) => dispatch(setActiveTab({ ...activeTab, path }));

    // Waits for homeDirectory to load on initial favorites request
    useEffect(() => {
        if (homeDirectory) {
            setIsLoaded(true);
            setCurrentDirectory(homeDirectory);
        }
    }, [homeDirectory]);

    if (!isLoaded) return <div>Loading...</div>;

    const opacityToHex = (opacity: number) => {
        if (opacity < 0 || 1 < opacity) return "FF";
        const scaledOpacity = Math.round(opacity * 255); // Scales to 0-255
        return scaledOpacity.toString(16);
    };
    const styles = {
        fontFamily: config.fontFamily,
        fontSize: `${config.fontSize}px`,
        opacity: opacityToHex(config.opacity),
        "--mainbox-transparency": config.mainBoxTransparency,
        "--topbar-transparency": config.topbarTransparency,
        "--sidebar-transparency": config.sidebarTransparency,
    };

    return (
        <ThemedDiv componentName="root">
            <ThemedDiv componentName="appContainer" id="app-container" style={styles}>
                <ThemedDiv componentName="container" className="container">
                    <Sidebar />
                    <ThemedDiv componentName="main" className="main">
                        <Header />
                        <OperationBar />
                        <LoadingBar isLoading={false} />
                        <MainView currentDirectory={activeTab.path} />
                        <Infobar />
                    </ThemedDiv>
                </ThemedDiv>
                <SettingsView />
                <ContextMenu />
                <Properties />
            </ThemedDiv>
        </ThemedDiv>
    );
};

export default App;
