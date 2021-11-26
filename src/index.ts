import { updateTheme } from './Components/Theme/theme';
import { windowManager } from './Components/Layout/windowManager';
import createSidebar from './Components/Layout/sidebar';
import Home from './Components/Layout/home';
import { detectDriveInit } from './Components/Drives/drives';
import { OpenDir, OpenInit } from './Components/Open/open';
import { createNewTab, Tab } from './Components/Layout/tab';
import { Shortcut } from './Components/Shortcut/shortcut';
import { SelectInit } from './Components/Files/File Operation/select';
import CLIInformations from './Api/cli';
import Storage from './Api/storage';
import Setting from './Components/Setting/setting';
import ContextMenu from './Components/ContextMenu/contextMenu';
import Hover from './Components/Layout/hover';
import LAZY_LOAD_INIT from './Components/Functions/lazyLoadingImage';
import Infobar from './Components/Layout/infobar';
import Search from './Components/Files/File Operation/search';
// Wait DOM Loaded to be loaded
document.addEventListener('DOMContentLoaded', async () => {
	// Read user preferences
	const _preference = await Storage.get('preference');
	// Listen to minimize, maximize, exit and reload button
	windowManager();
	// Initialize drive detection
	detectDriveInit();
	// Build sidebar
	createSidebar();
	// Initialize folder to open
	const cli = await CLIInformations();
	if (!cli.args.length) {
		if ((_preference.on_startup ?? 'new') === 'new') {
			Home();
		}
		// Initialize Tabs

		Tab();
	} else {
		let reveal = false;
		if (cli.flags.indexOf('--reveal') !== -1 || cli.flags.indexOf('-r') !== -1) {
			reveal = true;
		}
		OpenDir(cli.args[0], reveal);
		for (let i = 1; i < cli.args.length; i++) {
			createNewTab(cli.args[i]);
		}

		// Initialize Tabs
		Tab(reveal);
	}
	// Update the page styling
	updateTheme('root');
	// Initialize open dir/files listener
	OpenInit();
	// Intialize shortcuts
	Shortcut();
	// Initialize select files listener
	SelectInit();
	// Initialize user preference
	document.getElementById('workspace').dataset.hideHiddenFiles = String(_preference.hideHiddenFiles ?? true);
	// Initialize settings
	Setting();
	// Initialize info bar
	Infobar();
	// Initialize context menu
	ContextMenu();
	// Initialize hover handler
	Hover();
	// Initialize search feature
	Search();
	// Initialize lazy loading image handler (for performance)
	LAZY_LOAD_INIT();
});
