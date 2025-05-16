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
		default: 'dark',
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
