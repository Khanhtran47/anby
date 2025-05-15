import { addons } from '@storybook/manager-api';

addons.setConfig({
	navSize: 300,
	bottomPanelHeight: 300,
	rightPanelWidth: 300,
	panelPosition: 'right',
	enableShortcuts: true,
	showToolbar: true,
	initialActive: 'sidebar',
	toolbar: {
		title: { hidden: false },
		zoom: { hidden: false },
		eject: { hidden: false },
		copy: { hidden: false },
		fullscreen: { hidden: false },
	},
});
