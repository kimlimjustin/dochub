import { elementClassNameContains } from '../../Functions/elementClassNameContains';
import Storage from '../../../Service/storage';
import { UpdateInfo } from '../../Layout/infobar';
import FileAPI from '../../../Service/files';
import formatBytes from '../../Functions/filesize';
import Preview from '../File Preview/preview';
import { ensureElementInViewPort } from '../../Functions/viewport';

let latestSelected: HTMLElement;
let latestShiftSelected: HTMLElement;

/**
 * Call this function whenever user selected (a) file grid(s).
 * @returns {Promise<void>}
 */
const ChangeSelectedEvent = async (): Promise<void> => {
	const selectedFileGrid = document.querySelectorAll('.file-grid.selected');
	if (!selectedFileGrid.length) UpdateInfo('selected-files', '');
	else {
		const selectedFilePaths = Array.from(selectedFileGrid).map((element) => decodeURI((element as HTMLElement).dataset.path));
		const total_sizes = await new FileAPI(selectedFilePaths).calculateFilesSize();
		UpdateInfo('selected-files', `${selectedFileGrid.length} file${selectedFileGrid.length > 1 ? 's' : ''} selected ${formatBytes(total_sizes)}`);
		if (
			selectedFilePaths.length === 1 &&
			document.querySelectorAll('.preview').length > 0 &&
			((await Storage.get('preference'))?.automaticallyChangePreviewFile ?? true)
		) {
			Preview(selectedFilePaths[0]);
		}
	}
};
/**
 * Select a file grid...
 *
 * Unselect all selected files and select the clicked file if user's not pressing ctrl nor shift key...
 *
 * If user pressing ctrl key, select the clicked file without unselect selected files...
 *
 * If user pressing shift key, select all the range from the clicked file to the latest clicked file
 * @param {HTMLElement} element - element you want to selefct
 * @param {boolean} ctrl - does user pressing ctrl while clicking the file grid
 * @param {boolean} shift - does user pressing shift while clicking the file grid
 * @returns {void}
 */
const Select = (element: HTMLElement, ctrl: boolean, shift: boolean): void => {
	if (!ctrl && !shift) unselectAllSelected();
	// add 'selected' class if element classlist does not contain it...
	if (!element.classList.contains('selected')) element.classList.add('selected');
	// ...Otherwise, remove it
	else element.classList.remove('selected');
	if (shift && latestSelected) {
		let start = false;
		for (const _element of document.querySelectorAll('.file')) {
			if (start) _element.classList.add('selected');
			else _element.classList.remove('selected');
			if (_element === latestSelected) {
				start = !start;
				_element.classList.add('selected');
			} else if (_element === element) {
				start = !start;
				_element.classList.add('selected');
			}
		}
	} else {
		const { getSelectedAllStatus } = require('../../Shortcut/shortcut'); //eslint-disable-line
		if (getSelectedAllStatus() && ctrl) return;
		latestSelected = element;
		latestShiftSelected = element;
	}
	ChangeSelectedEvent();
	ensureElementInViewPort(element);
};

/**
 * Select the first file there in case the latest selected file is not exist
 * @returns {Promise<void>}
 */
const selectFirstFile = async (): Promise<void> => {
	const hideHiddenFiles = (await Storage.get('preference'))?.hideHiddenFiles ?? true;
	const firstFileElement = document.getElementById('workspace').querySelector(`.file${hideHiddenFiles ? ':not([data-hidden-file])' : ''}`);
	firstFileElement.classList.add('selected');
	ChangeSelectedEvent();
	latestSelected = firstFileElement as HTMLElement;
};

const elementIndex = (element: HTMLElement): number => {
	return Array.from(element.parentNode.children).indexOf(element);
};

/**
 * Initialize select files function
 * @returns {void}
 */
const SelectInit = (): void => {
	document.getElementById('workspace').addEventListener('click', (e) => {
		if (
			!(e.target as HTMLElement).className.split(' ').some(function (c) {
				return /file/.test(c);
			})
		) {
			unselectAllSelected();
			latestSelected = null;
			latestShiftSelected = null;
		}
		let fileTarget = e.target as HTMLElement;
		while (fileTarget?.classList && !fileTarget.classList.contains('file')) fileTarget = fileTarget.parentNode as HTMLElement;
		if (fileTarget.id === 'workspace' || !fileTarget?.classList?.contains('file')) return;

		Select(fileTarget, e.ctrlKey, e.shiftKey);
	});

	const selectShortcut = async (e: KeyboardEvent) => {
		// Ignore keyboard shortcuts for select files if input element has focus.
		if (document.activeElement.tagName === 'INPUT') return;

		const hideHiddenFiles = (await Storage.get('preference'))?.hideHiddenFiles ?? true;

		const keyHandlers: {
			[key: string]: (e: KeyboardEvent, hideHiddenFiles: boolean) => void;
		} = {
			ArrowRight: arrowRightHandler,
			ArrowLeft: arrowLeftHandler,
			ArrowDown: arrowDownHandler,
			ArrowUp: arrowUpHandler,
		};

		if (!e.altKey && keyHandlers[e.key]) {
			if (!document.contains(latestSelected)) {
				await selectFirstFile();
				return;
			}

			keyHandlers[e.key](e, hideHiddenFiles);
		}
	};
	document.addEventListener('keydown', selectShortcut);
};
/**
 * Unselect all selected file grids.
 * @returns {void}
 */
const unselectAllSelected = (): void => {
	document.querySelectorAll('.selected').forEach((element) => element.classList.remove('selected'));
	ChangeSelectedEvent();
	return;
};

/**
 * Get selected files array
 * @returns {NodeListOf<HTMLElement>}
 */
const getSelected = (): NodeListOf<HTMLElement> => {
	return document.querySelectorAll<HTMLElement>('.selected');
};

const arrowRightHandler = (e: KeyboardEvent, hideHiddenFiles: boolean): void => {
	if (latestShiftSelected && elementIndex(latestShiftSelected) < elementIndex(latestSelected)) {
		latestShiftSelected = latestSelected;
	}
	e.preventDefault();
	let nextSibling = (e.shiftKey ? latestShiftSelected.nextSibling : latestSelected.nextSibling) as HTMLElement;
	if (hideHiddenFiles) {
		while (nextSibling && nextSibling.dataset.isHidden === 'true') {
			nextSibling = nextSibling.nextSibling as HTMLElement;
		}
	}
	if (elementClassNameContains(nextSibling, /file/)) {
		ensureElementInViewPort(nextSibling);
		unselectAllSelected();
		if (e.shiftKey) {
			let start = false;
			for (const sibling of latestSelected.parentNode.children) {
				if (start || sibling === nextSibling || sibling === latestSelected) {
					if (!(hideHiddenFiles && (sibling as HTMLElement).dataset.isHidden === 'true')) sibling.classList.add('selected');
				}
				if (sibling === latestSelected) start = true;
				if (sibling === nextSibling) break;
			}
			latestShiftSelected = nextSibling;
		} else {
			latestSelected.classList.remove('selected');
			latestSelected = nextSibling;
			nextSibling.classList.add('selected');
		}
		ChangeSelectedEvent();
	}
};

const arrowLeftHandler = (e: KeyboardEvent, hideHiddenFiles: boolean): void => {
	if (latestShiftSelected && elementIndex(latestShiftSelected) > elementIndex(latestSelected)) latestShiftSelected = latestSelected;

	e.preventDefault();
	let previousSibling = (e.shiftKey ? latestShiftSelected.previousSibling : latestSelected.previousSibling) as HTMLElement;
	if (hideHiddenFiles) {
		while (previousSibling && previousSibling.dataset.isHidden === 'true') {
			previousSibling = previousSibling.previousSibling as HTMLElement;
		}
	}
	if (elementClassNameContains(previousSibling, /file/)) {
		ensureElementInViewPort(previousSibling);
		let start = false;
		unselectAllSelected();
		if (e.shiftKey) {
			for (const sibling of latestSelected.parentNode.children) {
				if (start || sibling === previousSibling || sibling === latestSelected) {
					if (!(hideHiddenFiles && (sibling as HTMLElement).dataset.isHidden === 'true')) sibling.classList.add('selected');
				}
				if (sibling === previousSibling) start = true;
				if (sibling === latestSelected) break;
			}
			latestShiftSelected = previousSibling;
		} else {
			latestSelected.classList.remove('selected');
			latestSelected = previousSibling;
			previousSibling.classList.add('selected');
		}
		ChangeSelectedEvent();
	}
};

const arrowDownHandler = (e: KeyboardEvent, hideHiddenFiles: boolean): void => {
	if (latestShiftSelected && elementIndex(latestShiftSelected) < elementIndex(latestSelected)) latestShiftSelected = latestSelected;

	e.preventDefault();
	const totalGridInArrow = Math.floor(
		(latestSelected.parentNode as HTMLElement).offsetWidth /
			(latestSelected.offsetWidth + parseInt(getComputedStyle(latestSelected).marginLeft) * 2)
	); // Calculate the total of grids in arrow
	const siblings = latestSelected.parentNode.children;
	let elementBelow = siblings[Array.from(siblings).indexOf(e.shiftKey ? latestShiftSelected : latestSelected) + totalGridInArrow] as HTMLElement;
	if (hideHiddenFiles) {
		while (elementBelow && elementBelow.dataset.isHidden === 'true') {
			elementBelow = siblings[Array.from(siblings).indexOf(elementBelow) + totalGridInArrow] as HTMLElement;
		}
	}
	if (elementClassNameContains(elementBelow, /file/)) {
		ensureElementInViewPort(elementBelow);
		let start = false;
		unselectAllSelected();
		if (e.shiftKey) {
			for (const sibling of latestSelected.parentNode.children) {
				if (start || sibling === elementBelow || sibling === latestSelected) {
					if (!(hideHiddenFiles && (sibling as HTMLElement).dataset.isHidden === 'true')) sibling.classList.add('selected');
				}
				if (sibling === latestSelected) start = true;
				if (sibling === elementBelow) break;
			}
			latestShiftSelected = elementBelow;
		} else {
			latestSelected.classList.remove('selected');
			latestSelected = elementBelow;
			elementBelow.classList.add('selected');
		}
		ChangeSelectedEvent();
	}
};

const arrowUpHandler = (e: KeyboardEvent, hideHiddenFiles: boolean): void => {
	if (latestShiftSelected && elementIndex(latestShiftSelected) > elementIndex(latestSelected)) latestShiftSelected = latestSelected;

	e.preventDefault();
	const totalGridInArrow = Math.floor(
		(latestSelected.parentNode as HTMLElement).offsetWidth /
			(latestSelected.offsetWidth + parseInt(getComputedStyle(latestSelected).marginLeft) * 2)
	); // Calculate the total of grids in arrow
	const siblings = latestSelected.parentNode.children;
	let elementAbove = siblings[Array.from(siblings).indexOf(e.shiftKey ? latestShiftSelected : latestSelected) - totalGridInArrow] as HTMLElement;
	if (hideHiddenFiles) {
		while (elementAbove && elementAbove.dataset.isHidden === 'true') {
			elementAbove = siblings[Array.from(siblings).indexOf(elementAbove) - totalGridInArrow] as HTMLElement;
		}
	}
	if (elementClassNameContains(elementAbove, /file/)) {
		ensureElementInViewPort(elementAbove);
		let start = false;
		unselectAllSelected();
		if (e.shiftKey) {
			for (const sibling of latestSelected.parentNode.children) {
				if (start || sibling === elementAbove || sibling === latestSelected) {
					if (!(hideHiddenFiles && (sibling as HTMLElement).dataset.isHidden === 'true')) sibling.classList.add('selected');
				}
				if (sibling === elementAbove) start = true;
				if (sibling === latestSelected) break;
			}
			latestShiftSelected = elementAbove;
		} else {
			latestSelected.classList.remove('selected');
			latestSelected = elementAbove;
			elementAbove.classList.add('selected');
		}
		ChangeSelectedEvent();
	}
};

export { Select, SelectInit, getSelected, ChangeSelectedEvent, unselectAllSelected };
