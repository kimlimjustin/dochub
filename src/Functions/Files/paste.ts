import clipboardy from 'clipboardy';
import path from 'path';
import fs from 'fs';
import cpy from 'cpy';
import { dialog } from '@electron/remote';
import { ErrorLog, InfoLog } from '../Logs/log';

/**
 * copy a file
 * @param {Array<string>} filePaths - array of file paths to be copied
 * @param {string} target - desitnation of copying file
 * @returns {any}
 */
const COPY = (filePaths: Array<string>, target: string) => {
	return new Promise<void>((resolve) => {
		for (const filePath of filePaths) {
			if (fs.lstatSync(filePath).isDirectory()) {
				if (target === path.dirname(filePath)) {
					cpy(
						filePath,
						path.join(target, path.basename(filePath) + ' - Copy')
					).then(() => resolve());
				} else if (
					fs.existsSync(path.join(target, path.basename(filePath)))
				) {
					const options = {
						buttons: ['Replace', 'Skip'],
						message: `Another folder with the same name already exists in "${target}". Replacing it will overwrite its content.`,
						title: `Replace folder ${path.basename(filePath)}`,
					};
					if (dialog.showMessageBoxSync(options) === 0)
						cpy(
							filePath,
							path.join(target, path.basename(filePath))
						);
				} else {
					cpy(
						filePath,
						path.join(target, path.basename(filePath))
					).then(() => resolve());
				}
			} else {
				if (target === path.dirname(filePath)) {
					cpy(filePath, target, {
						rename: (basename) =>
							`${basename
								.split('.')
								.splice(0, basename.split('.').length - 1)
								.join('.')} - Copy.${basename
								.split('.')
								.splice(basename.split('.').length - 1)}`,
					}).then(() => resolve());
				} else if (
					fs.existsSync(path.join(target, path.basename(filePath)))
				) {
					const options = {
						buttons: ['Replace', 'Skip'],
						message: `Another file with the same name already exists in "${target}". Replacing it will overwrite its content.`,
						title: `Replace file ${path.basename(filePath)}`,
					};
					if (dialog.showMessageBoxSync(options) === 0)
						cpy(filePath, target).then(() => resolve());
				} else {
					cpy(filePath, target).then(() => resolve());
				}
			}
		}
	});
};

/**
 * Paste copied files into a folder
 * @param {string} target - Folder you want to paste copied files into
 * @returns {void}
 */
const Paste = async (target: string): Promise<void> => {
	const clipboard = clipboardy.readSync();
	// CHeck if the copied text is Xplorer command
	if (!clipboard.startsWith('Xplorer command')) {
		return;
	} else {
		const commandType = clipboard
			.split('\n')[0]
			.replace('Xplorer command - ', '');
		const filePaths: string[] = [];
		for (let i = 1; i < clipboard.split('\n').length; i++) {
			filePaths.push(clipboard.split('\n')[i]);
		}
		if (commandType === 'COPY') {
			await COPY(filePaths, target);
			InfoLog(`Copy ${filePaths.length} into ${target}`);
		} else if (commandType === 'CUT') {
			await COPY(filePaths, target).then(() => {
				for (const filePath of filePaths) {
					if (fs.lstatSync(filePath).isDirectory()) {
						fs.rmdirSync(filePath, { recursive: true });
					} else {
						fs.unlink(filePath, (err) => {
							if (err) {
								dialog.showMessageBoxSync({
									message:
										'Something went wrong, please try again or open an issue on GitHub.',
									type: 'error',
								});
								ErrorLog(err);
							}
						});
					}
				}
				InfoLog(`Cut ${filePaths.length} into ${target}`);
			});
		}
	}
};

export default Paste;
