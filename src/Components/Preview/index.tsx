import React from "react";
import { useDispatch, useSelector } from "react-redux";

// import xlsx from 'xlsx';
// import hljs from 'highlight.js';
// import { marked } from 'marked';

import DocxViewer from "./DocxViewer";
import HtmlViewer from "./HtmlViewer";
import ImageViewer from "./ImageViewer";
import MarkdownViewer from "./MarkdownViewer";
import PdfViewer from "./PdfViewer";
import PlaintextViewer from "./PlaintextViewer";
import VideoViewer from "./VideoViewer";
import XlsxViewer from "./XlsxViewer";

// import { readFileRequest, readAssetRequest, readBufferRequest } from '../../Store/ActionCreators/FilesActionCreators';
import type { IAppState } from "../../Store/Reducers";
import type { IFile } from "../../Typings/Store/files";

import {
    DOCX_TYPES,
    HTML_TYPES,
    IMAGE_TYPES,
    MARKDOWN_TYPES,
    PDF_TYPES,
    PLAINTEXT_TYPES,
    VIDEO_TYPES,
    XLSX_TYPES,
    extensionMatches,
} from "../../Config/file.config";

export interface IPreviewProps {
    filePath: string;
}

const Preview = ({ filePath }: IPreviewProps): JSX.Element => {
    // const dispatch = useDispatch();
    const file = useSelector<IAppState, IFile>((state) => state.files.files?.[filePath]);

    console.log(filePath.split(".")[filePath.split(".").length - 1]);

    const filePathSplit = filePath.split(".");
    const extension = filePathSplit[filePathSplit.length - 1].toLowerCase();

    if (extensionMatches(PDF_TYPES, extension)) {
        return <PdfViewer filePath={filePath} />;
    }if (extensionMatches(HTML_TYPES, extension)) {
        return <HtmlViewer filePath={filePath} />;
    }if (extensionMatches(DOCX_TYPES, extension)) {
        return <DocxViewer filePath={filePath} />;
    }if (extensionMatches(XLSX_TYPES, extension)) {
        return <XlsxViewer filePath={filePath} />;
    }if (extensionMatches(IMAGE_TYPES, extension)) {
        return <ImageViewer filePath={filePath} />;
    }if (extensionMatches(VIDEO_TYPES, extension)) {
        return <VideoViewer filePath={filePath} />;
    }if (extensionMatches(PLAINTEXT_TYPES, extension)) {
        return <PlaintextViewer filePath={filePath} />;
    }if (extensionMatches(MARKDOWN_TYPES, extension)) {
        return <MarkdownViewer filePath={filePath} />;
    }
        return <div>{JSON.stringify(file)}</div>;
};

export default Preview;
