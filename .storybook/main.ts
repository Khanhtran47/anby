import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
	stories: [
		// '../stories/**/*.mdx',
		// '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@vueless/storybook-dark-mode',
		'@storybook/addon-a11y',
		'@storybook/addon-onboarding',
		'@chromatic-com/storybook',
		'@storybook/addon-vitest',
		'storybook-next-intl',
		'@storybook/addon-docs',
	],
	framework: {
		name: '@storybook/nextjs-vite',
		options: {},
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
	core: {
		disableTelemetry: true,
	},
	staticDirs: ['../public'],
};
export default config;
