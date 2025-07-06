import nextIntl from './next-intl';

import type { Preview } from '@storybook/react';

import '@/styles/globals.css';

import { themes } from 'storybook/theming';

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
	// backgrounds: {
	// 	options: {
	// 		dark: { name: 'Dark', value: '#333' },
	// 		light: { name: 'Light', value: '#F7F9F2' },
	// 	},
	// },
	backgrounds: {
		options: {
			dark: { name: 'dark', value: '#000' },
			light: { name: 'light', value: '#fff' },
			grey: { name: 'grey', value: '#333' },
			'bg-dark': {
				name: 'bg-dark',
				value: 'url(https://anby.trandk.live/assets/images/bg-dark.webp)',
			},
			'bg-light': {
				name: 'bg-light',
				value: 'url(https://anby.trandk.live/assets/images/bg-light.webp)',
			},
		},
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
	nextIntl,
};

const initialGlobals: Preview['initialGlobals'] = {
	backgrounds: { value: 'grey' },
	locale: 'en',
	locales: {
		en: { title: 'English', right: 'EN' },
		fr: { title: 'Français', right: 'FR' },
		vi: { title: 'Tiếng Việt', right: 'VI' },
		ja: { title: '日本語', right: 'JA' },
		ko: { title: '한국어', right: 'KO' },
		zh: { title: '中文', right: 'ZH' },
	},
};

const preview: Preview = {
	initialGlobals,
	decorators,
	parameters,
};

export default preview;
