import { readText, writeText } from "@tauri-apps/plugin-clipboard-manager";

/**
 * Write text into clipboard
 * @param {string} text - Text you want to write to clipboard
 * @returns {void}
 */
export const writeTextToClipboard = async (text: string): Promise<void> => writeText(text);

/**
 * Read clipboard text
 * @returns {Promise<string>}
 */
export const readTextFromClipboard = async (): Promise<string> => readText();
