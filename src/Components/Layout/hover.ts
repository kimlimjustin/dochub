import FileAPI from '../../Api/files';
import { IMAGE_TYPES } from '../../Config/file.config';
import getBasename from '../Functions/path/basename';
import Storage from '../../Api/storage';

const getExtension = (filename: string): string => {
	const basename = getBasename(filename);
	const index = basename.lastIndexOf('.');
	if (index === -1) {
		return '';
	}
	return basename.substr(index + 1);
};
/**
 * Listen to mouse hovering
 * @returns {void}
 */
const Hover = (): void => {
	let timeOut: number;
	let displayName: string;
	let hoveringElement: HTMLElement;
	const hoverPreviewElement = document.createElement('div');

	document.querySelector('#workspace').addEventListener('mousemove', (e) => {
		const x = (e as MouseEvent).clientX;
		const y = (e as MouseEvent).clientY;
		window.clearTimeout(timeOut);
		hoverPreviewElement?.parentNode?.removeChild(hoverPreviewElement);

		// Ignore workspace hovering
		if ((e.target as HTMLElement).id === 'workspace') {
			if (hoveringElement?.dataset?.path && displayName) hoveringElement.querySelector('.file-grid-filename').innerHTML = displayName;
			return;
		}
		const isOnSearch = document.querySelector<HTMLInputElement>('.path-navigator').value.startsWith('Search: ');

		hoveringElement?.classList?.remove('hovering');

		const target = (e.target as HTMLElement)?.dataset?.path ? (e.target as HTMLElement) : ((e.target as HTMLElement)?.parentNode as HTMLElement);

		const filenameGrid = target.querySelector('.file-grid-filename');

		if (!filenameGrid) return;

		if (target !== hoveringElement) {
			displayName = undefined;
		}
		hoveringElement = target;

		timeOut = window.setTimeout(async () => {
			displayName = filenameGrid.innerHTML;
			const path = unescape(target.dataset.path);
			filenameGrid.innerHTML = isOnSearch ? path : getBasename(path);
			target?.classList?.add('hovering');

			const previewImageOnHover = (await Storage.get('appearance')).previewImageOnHover ?? true;
			if (IMAGE_TYPES.indexOf(getExtension(filenameGrid.innerHTML)) !== -1 && previewImageOnHover) {
				hoverPreviewElement.innerHTML = `<img src="${new FileAPI(path).readAsset()}">`;
				hoverPreviewElement.classList.add('hover-preview');
				hoverPreviewElement.style.top = y + 'px';
				hoverPreviewElement.style.left = x + 'px';
				hoverPreviewElement.dataset.path = target.dataset.path;
				document.body.appendChild(hoverPreviewElement);
			}
		}, 500);
	});
};

export default Hover;
