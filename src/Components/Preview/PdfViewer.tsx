import React, { useEffect } from "react";

import { readAssetRequest } from "../../Store/ActionCreators/FilesActionCreators";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";

export interface IPdfViewerProps {
    filePath: string;
}

const PdfViewer = ({ filePath }: IPdfViewerProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const content = useAppSelector((state) => state.files.files?.[filePath]?.content);

    useEffect(() => {
        dispatch(readAssetRequest(filePath));
    }, [filePath]);

    if (!content) return <div>Loading...</div>;

    return (
        <div id="pdf-preview-container">
            <object data={`${content}#toolbar=0&navpanes=1`} type="application/pdf" className="preview-object">
                <embed src={`${content}#toolbar=0&navpanes=1`} type="application/pdf" />
            </object>
        </div>
    );
};

export default PdfViewer;
