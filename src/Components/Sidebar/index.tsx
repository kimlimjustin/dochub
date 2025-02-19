import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActiveTab, updateTab } from "../../Store/ActionCreators/TabActionCreators";
import { IAppState } from "../../Store/Reducers";
import { IFavoritesReducerState } from "../../Typings/Store/favorites";

import XplorerLogo from "../../Icon/extension/xplorer.svg";
import FavoriteLogo from "../../Icon/folder/sidebar-favorite.svg";
import HardDiskLogo from "../../Icon/hard-disk.svg";
import { ThemedDiv, ThemedSpan } from "../Theme";

const Sidebar = () => {
    const dispatch = useDispatch();
    const favorites = useSelector<IAppState, IFavoritesReducerState>((state) => state.favorites);
    const { drives } = useSelector<IAppState, IAppState["drive"]>((state) => state.drive);

    const activeTab = useSelector<IAppState, IAppState["tabs"]["activeTab"]>((state) => state.tabs.activeTab);

    const favoritesSort = (a: [string, string], b: [string, string]): number => (a[0] > b[0] ? 1 : -1);

    const navigateToPath = (path: string) => {
        dispatch(updateTab(activeTab.name, { ...activeTab, path, name: path }));
        dispatch(setActiveTab({ ...activeTab, path, name: path }));
    };

    return (
        <ThemedDiv componentName="sidebar" className="sidebar">
            <ThemedSpan componentName="xplorerBrand" className="xplorer-brand">
                <span>Xplorer</span>
                <img alt="Xplorer Logo" src={XplorerLogo} />
            </ThemedSpan>
            <ThemedDiv componentName="sidebarNav" className="sidebar-nav">
                <ThemedDiv componentName="sidebarNavFavorites" id="sidebar-favorites" data-section="favorites">
                    <ThemedDiv componentName="sidebarNavToogle" className="sidebar-nav-toggle sidebar-hover-effect">
                        <img alt="Favorites" src={FavoriteLogo} />
                        <span className="sidebar-text">Favorites</span>
                        <span className="sidebar-nav-toggle-arrow" />
                    </ThemedDiv>
                    <ThemedDiv componentName="sidebarNavFavoritesList" className="sidebar-nav-list">
                        {Object.entries(favorites)
                            .sort(favoritesSort)
                            .map(([name, path]) => (
                                <ThemedSpan
                                    componentName="sidebarNavFavoritesItem"
                                    data-path={path}
                                    className="sidebar-hover-effect sidebar-nav-item favorite-item"
                                    onClick={() => navigateToPath(path)}
                                    key={path + name}
                                >
                                    <div className="sidebar-icon"></div>
                                    <ThemedSpan componentName="sidebarText" className="sidebar-text">
                                        {name}
                                    </ThemedSpan>
                                </ThemedSpan>
                            ))}
                    </ThemedDiv>
                </ThemedDiv>
                <div id="sidebar-drives" data-section="drives">
                    <ThemedDiv componentName="sidebarNavToogle" className="sidebar-nav-toggle sidebar-hover-effect">
                        <img src={HardDiskLogo} alt="Drives" />
                        <span className="sidebar-text" />
                        <span className="sidebar-nav-toggle-arrow" />
                    </ThemedDiv>
                    <div className="sidebar-nav-list">
                        {drives.map(({ name, mount_point }) => (
                            <span
                                data-path={mount_point}
                                className="sidebar-hover-effect sidebar-nav-item drive-item"
                                onClick={() => navigateToPath(mount_point.replace(/\\/g, "/"))}
                                key={mount_point + name}
                            >
                                <div className="sidebar-icon"></div>
                                <ThemedSpan componentName="sidebarText" className="sidebar-text">
                                    {name}
                                </ThemedSpan>
                            </span>
                        ))}
                    </div>
                </div>
            </ThemedDiv>
            <a>Settings</a>
        </ThemedDiv>
    );
};

export default Sidebar;
