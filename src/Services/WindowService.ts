import { event, window } from "@tauri-apps/api";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getCurrentWindow } from "@tauri-apps/api/window";

export const listenWindowClose = async (): Promise<void> => new Promise((resolve) => event.listen("tauri://close-requested", () => resolve()));

export const createNewWindow = (title = "Xplorer"): WebviewWindow =>
    new WebviewWindow(Math.random().toString(), { decorations: false, transparent: true, title });

export const changeWindowTitle = (title: string): void => {
    getCurrentWindow().setTitle(`${title} - Xplorer`);
};

export const setDecorations = (decorations: boolean): void => {
    getCurrentWindow().setDecorations(decorations);
};

export const maximizeWindow = (): void => {
    getCurrentWindow().maximize();
};

export const minimizeWindow = (): void => {
    getCurrentWindow().minimize();
};

export const closeWindow = (): void => {
    getCurrentWindow().close();
};
