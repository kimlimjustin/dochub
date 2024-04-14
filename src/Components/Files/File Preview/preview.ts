import hljs from "highlight.js";
import { marked } from "marked";
import xlsx from "xlsx";
import { HTML_TYPES, IMAGE_TYPES, MARKDOWN_TYPES, PLAINTEXT_TYPES, VIDEO_TYPES } from "../../../Config/file.config";
import FileAPI from "../../../Service/files";
import { GET_WORKSPACE_ELEMENT } from "../../../Util/constants";
import isTauri from "../../../Util/is-tauri";
import getBasename from "../../Functions/path/basename";
import getDirname from "../../Functions/path/dirname";
import { URLify, eURLify } from "../../Functions/urlify";
import ConfirmDialog from "../../Prompt/confirm";
import PromptError from "../../Prompt/error";

const isValidURL = (text: string) => {
    let url: URL;
    try {
        url = new URL(text);
    } catch (_) {
        return false;
    }
    return (url.protocol === "http:" || url.protocol === "https:") && url.hostname !== window.location.hostname;
};
/**
 * Close the preview file
 * @returns {void}
 */
const closePreviewFile = (): void => {
    GET_WORKSPACE_ELEMENT(1).classList.remove("workspace-split");
    document.querySelectorAll(".preview").forEach((element) => element.parentNode.removeChild(element));
    document.querySelector<HTMLElement>(".main-box").style.overflowY = "auto";
};
/**
 * Show preview file
 * @param {string} filePath - file to preview
 * @returns {void}
 */
const Preview = async (filePath: string): Promise<void> => {
    if (!isTauri) {
        PromptError("Preview unavailable", "Preview is currently unavailable on Web version");
        return;
    }
    closePreviewFile();

    const previewElement = document.createElement("div");
    previewElement.classList.add("preview");

    const changePreview = (html: string) => {
        if (!html) return;
        previewElement.innerHTML = `
                <div class="preview-header">
                    <span class="preview-path">${getBasename(filePath)}</span>
                    <span class="preview-exit-btn">&times;</span>
                </div>
                ${html}
                `;

        document.querySelector<HTMLElement>(".main-box").scrollTop = 0;
        document.querySelector<HTMLElement>(".main-box").style.overflowY = "hidden";
        GET_WORKSPACE_ELEMENT(1).classList.toggle("workspace-split");
        GET_WORKSPACE_ELEMENT(1).appendChild(previewElement);
        previewElement.querySelector(".preview-exit-btn").addEventListener("click", () => closePreviewFile());
        return;
    };

    const ext = filePath.split(".").pop().toLowerCase();

    let previewed = true;
    if (ext === "pdf") {
        changePreview(
            `<object data="${new FileAPI(
                filePath,
            ).readAsset()}#toolbar=0&navpanes=1" type="application/pdf" class="preview-object"><embed src="${new FileAPI(
                filePath,
            ).readAsset()}#toolbar=0&navpanes=1" type="application/pdf" /></object>`,
        );
    } else if (HTML_TYPES.indexOf(ext) !== -1) {
        changePreview(`<iframe src="${filePath}" title="${filePath}" class="preview-object"></iframe>`);
    } else if (["doc", "docb", "docm", "dot", "dotm", "docx", "rtf"].indexOf(ext) !== -1) {
        const { convertToHtml } = require("./mammoth.browser.min");
        const buf = await new FileAPI(filePath).readBuffer();
        const { value } = await convertToHtml({ arrayBuffer: buf });
        changePreview(`<div class='preview-object' data-type="docx">${eURLify(value)}</div>`);
    } else if (["xlsx", "xls", "xlsb", "xls", "ods", "fods", "csv"].indexOf(ext) !== -1) {
        const xlsxData = xlsx.read(await new FileAPI(filePath).readBuffer(), {
            type: "buffer",
        });
        const parsedData = xlsx.utils.sheet_to_html(xlsxData.Sheets[xlsxData.SheetNames[0]]);
        changePreview(`<div class='preview-object' data-type="xlsx">${URLify(parsedData)}</div>`);
    } else if (IMAGE_TYPES.indexOf(ext) !== -1) {
        changePreview(`<div class="preview-object" data-type="img"><img src="${new FileAPI(filePath).readAsset()}" data-path="${filePath}" /></div>`);
    } else if (VIDEO_TYPES.indexOf(ext) !== -1) {
        changePreview(
            `<div class="preview-object" data-type="video"><video controls="" controlsList="nodownload"><source src="${new FileAPI(
                filePath,
            ).readAsset()}"></video></div>`,
        );
        // } else if (AUDIO_TYPES.indexOf(ext) !== -1) {
        // 	changePreview(
        // 		`
        // 		<div class="preview-object" data-type="audio">
        // 			<audio controls="" controlsList="nodownload">
        // 				<source src="${new FileAPI(filePath).readAsset()}">
        // 			</audio>
        // 		</div>`
        // 	);
    } else if (PLAINTEXT_TYPES.indexOf(ext) !== -1) {
        changePreview(`<div class='preview-object' data-type="txt">${await new FileAPI(filePath).readFile()}</div>`);
    } else if (MARKDOWN_TYPES.indexOf(ext) !== -1) {
        const html = marked(await new FileAPI(filePath).readFile());
        changePreview(`<div class='preview-object' data-type="md">${eURLify(html)}</div>`);
        previewElement.querySelectorAll("img").forEach(async (img) => {
            if (!isValidURL(img.src)) {
                let imgData = new FileAPI(img.src);
                if (!(await imgData.exists())) {
                    let imgPath = new URL(img.src).pathname;
                    if (imgPath.charAt(0) === "/") imgPath = imgPath.substr(1);
                    imgData = new FileAPI(`${getDirname(filePath)}${imgPath}`);
                    if (await imgData.exists()) {
                        img.src = imgData.readAsset();
                    }
                } else {
                    img.src = await imgData.readFile();
                }
            }
        });
    } else {
        try {
            const fileData = new FileAPI(filePath);
            const property = await fileData.properties();
            let highlight = true;
            if (property.size > 1024 * 100) {
                const confirm = await ConfirmDialog(
                    "File too large",
                    "File size is larger than 100kb, proceeding previewing file might crashes Xplorer, do you want to proceed?",
                    "Yes",
                );
                if (!confirm) return;
            }
            if (property.size > 1024 * 10) {
                highlight = false;
            }
            const fileText = await fileData.readFile();
            const highlightedCode = hljs.highlightAuto(fileText).value;

            changePreview(
                highlight
                    ? `<pre class='preview-object' data-type="code"><code>${highlightedCode}</code></pre>`
                    : `<div class='preview-object' data-type='txt'>${fileText}</div>`,
            );
        } catch (_) {
            previewed = false;
        }
    }

    if (!previewed) PromptError("No preview handler", "There is no preview handler for this file type yet.");
};
export default Preview;
export { closePreviewFile };
