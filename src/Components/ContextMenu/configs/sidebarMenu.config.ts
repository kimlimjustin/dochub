import FileAPI from "../../../Service/files";
import type contextMenuItem from "../../../Typings/contextMenuItem";
import Pin from "../../Files/File Operation/pin";
import Preview from "../../Files/File Preview/preview";
import Translate from "../../I18n/i18n";
import { createNewTab } from "../../Layout/tab";
import { OpenDir } from "../../Open/open";

const SidebarMenu = async (target: HTMLElement, filePath: string): Promise<contextMenuItem[][]> => {
    return [
        [
            {
                menu: await Translate("Open"),
                icon: "open",
                role: () => {
                    target?.dataset?.isdir === "true" ? OpenDir(filePath) : new FileAPI(filePath).openFile();
                },
            },
            {
                menu: await Translate("Open in New Tab"),
                visible: target?.dataset?.isdir === "true",
                icon: "open in new tab",
                role: () => {
                    createNewTab(filePath);
                },
            },
            {
                menu: await Translate("Preview"),
                shortcut: "Ctrl+O",
                visible: target?.dataset?.isdir !== "true",
                icon: "preview",
                role: () => {
                    Preview(filePath);
                },
            },
        ],
        [
            {
                menu: await Translate("Unpin from Sidebar"),
                icon: "pin",
                role: () => {
                    Pin([filePath]);
                },
            },
        ],
    ];
};

export default SidebarMenu;
