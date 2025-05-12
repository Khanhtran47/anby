import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';

const config: StorybookConfig = {
	stories: [
		// '../stories/**/*.mdx',
		// '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
		'../**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@storybook/addon-a11y',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@chromatic-com/storybook',
		'@storybook/experimental-addon-test',
	],
	framework: {
		name: '@storybook/experimental-nextjs-vite',
		options: {
			builder: {
				viteConfigPath: './.storybook/vite.config.mts',
			},
		},
	},
	core: {
		disableTelemetry: true,
	},
	staticDirs: ['..\\public'],
};
export default config;
