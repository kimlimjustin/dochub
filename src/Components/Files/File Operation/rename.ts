import FileAPI from "../../../Service/files";
import OperationAPI from "../../../Service/operation";
import focusingPath from "../../Functions/focusingPath";
import { OperationLog } from "../../Functions/log";
import basename from "../../Functions/path/basename";
import getDirname from "../../Functions/path/dirname";
import joinPath from "../../Functions/path/joinPath";
import Ask from "../../Prompt/ask";
import ConfirmDialog from "../../Prompt/confirm";
import PromptError from "../../Prompt/error";
/**
 * Rename file/folder name
 * @param {string} path - location of the file/folder
 * @returns {void}
 */
const Rename = (filePath: string): void => {
    Ask("Rename", "New File Name:", { value: basename(filePath) }).then(async (newName: string) => {
        const target = getDirname(newName) === "." ? joinPath(await focusingPath(), newName) : joinPath(getDirname(filePath), newName);
        if (await new FileAPI(target).exists()) {
            const confirm = await ConfirmDialog("File Exists", "The new name already exists, do you want to overwrite it?", "No");
            if (!confirm) return;
        }
        try {
            new OperationAPI(filePath, target).rename();
        } catch (err) {
            PromptError("Error renaming file", `Failed to rename ${filePath} [${err}]`);
        }
        OperationLog("rename", decodeURI(filePath), target);
    });
};

export default Rename;
