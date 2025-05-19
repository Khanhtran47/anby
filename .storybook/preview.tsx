import type { Preview } from '@storybook/react';

import '@/styles/globals.css';

import { themes } from '@storybook/theming';

const decorators: Preview['decorators'] = [
	(Story) => {
		return (
			<div className="flex size-full items-center justify-center">
				<Story />
			</div>
		);
	},
];

const commonTheme = {
	brandTitle: 'Anby',
	brandUrl: 'https://anby.trandk.live',
	brandTarget: '_self',
};

const parameters: Preview['parameters'] = {
	options: {
		storySort: {
			method: 'alphabetical',
			order: ['Components', 'Pages', 'Layouts', 'Utils'],
		},
	},
	backgrounds: {
		default: 'grey',
		values: [
			{ name: 'dark', value: '#000' },
			{ name: 'light', value: '#fff' },
			{ name: 'grey', value: '#333' },
			{ name: 'bg-dark', value: 'url(https://anby.trandk.live/assets/images/bg-dark.png)' },
			{ name: 'bg-light', value: 'url(https://anby.trandk.live/assets/images/bg-light.png)' },
		],
	},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/i,
		},
	},
	darkMode: {
		current: 'dark',
		stylePreview: true,
		darkClass: 'dark',
		lightClass: 'light',
		classTarget: 'html',
		dark: {
			...themes.dark,
			...commonTheme,
			appBorderRadius: 14,
		},
		light: {
			...themes.normal,
			...commonTheme,
			appBorderRadius: 14,
		},
	},
};

const preview: Preview = {
	decorators,
	parameters,
};

export default preview;
