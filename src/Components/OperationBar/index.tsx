import React from "react";
import { AddIcon, CopyIcon, CutIcon, PasteIcon, RenameIcon } from "../../Icon";
import { ThemedButton, ThemedDiv } from "../Theme";
import { useDispatch } from "react-redux";
import { fileOperation } from "../../Store/ActionCreators/FilesActionCreators";
import { useSelector } from "react-redux";
import { IAppState } from "../../Store/Reducers";

const OperationBar = () => {
    const dispatch = useDispatch();
    const selected = useSelector<IAppState, IAppState["selection"]["selected"]>((state) => state.selection.selected);

    return (
        <ThemedDiv componentName="operationBar" className="operation-bar">
            <ThemedDiv componentName="operationBarGroup" className="operation-bar-group">
                <ThemedButton componentName="operationBarItem" className="operation-bar-item">
                    <AddIcon />
                    New
                </ThemedButton>
            </ThemedDiv>
            <ThemedDiv componentName="operationBarGroup" className="operation-bar-group">
                <ThemedButton
                    componentName="operationBarItem"
                    className="operation-bar-item"
                    onClick={() => dispatch(fileOperation({ operation: "copy", sources: selected }))}
                >
                    <CopyIcon />
                </ThemedButton>
                <ThemedButton
                    componentName="operationBarItem"
                    className="operation-bar-item"
                    onClick={() => dispatch(fileOperation({ operation: "cut", sources: selected }))}
                >
                    <CutIcon />
                </ThemedButton>
                <ThemedButton componentName="operationBarItem" className="operation-bar-item">
                    <PasteIcon />
                </ThemedButton>
                <ThemedButton componentName="operationBarItem" className="operation-bar-item">
                    <RenameIcon />
                </ThemedButton>
            </ThemedDiv>
        </ThemedDiv>
    );
};

export default OperationBar;
