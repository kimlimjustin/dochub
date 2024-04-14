import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAppState } from "../../Store/Reducers";
import formatBytes from "../Functions/filesize";

const Infobar = () => {
    const files = useSelector<IAppState, IAppState["files"]["files"]>((state) => state.files.files);
    const selected = useSelector<IAppState, IAppState["selection"]["selected"]>((state) => state.selection.selected);
    return (
        <ThemedDiv componentName="infobar" className="infobar">
            <ThemedDiv componentName="infobarLeft" className="infobar-left">
                <ThemedSpan componentName="infobarItem" className="infobar-item">
                    {Object.keys(files).length} Items
                </ThemedSpan>
                {selected.length > 0 ? (
                    <>
                        <ThemedSpan componentName="infobarItem" className="infobar-item">
                            {selected.length} Selected
                        </ThemedSpan>
                        <ThemedSpan componentName="infobarItem" className="infobar-item">
                            {selected.every((path) => Object.values(files).some((file) => file.file_path === path) && !files[path].is_dir) ? (
                                formatBytes(selected.reduce((accum, path) => accum + files[path].size, 0))
                            ) : (
                                <></>
                            )}
                        </ThemedSpan>
                    </>
                ) : null}
            </ThemedDiv>
            <ThemedDiv componentName="infobarRight" className="infobar-right">
                <ThemedSpan componentName="infobarItem" className="infobar-item" />
            </ThemedDiv>
        </ThemedDiv>
    );
};

export default Infobar;
