import { config as defaultConfig } from '@khanhtran47/config/prettier';

/** @type {import("prettier").Options} */
export const config = {
	...defaultConfig,
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-sort-json',
	],
	importOrder: [
		'<BUILTIN_MODULES>',
		'^(react/(.*)$)|^(react$)',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@/app/(.*)$',
		'^@/services/(.*)$',
		'^@/utils/(.*)$',
		'^@/context/(.*)$',
		'^@/constants/(.*)$',
		'^@/components/layout/(.*)$',
		'^@/components/containers/(.*)$',
		'^@/components/features/(.*)$',
		'^@/components/ui/(.*)$',
		'^@/components/(.*)$',
		'^@/assets/(.*)$',
		'^@/styles/(.*)$',
		'',
		'^[./]',
		'',
		'<TYPES>^(node:)',
		'<TYPES>',
		'<TYPES>^[~]',
		'<TYPES>^[.]',
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.0.0',
};

export default config;
