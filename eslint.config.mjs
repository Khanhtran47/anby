import { config as defaultConfig } from '@khanhtran47/config/eslint';
import nextPlugin from '@next/eslint-plugin-next';
import { globalIgnores } from 'eslint/config';

const eslintConfig = [
	...defaultConfig,
	globalIgnores(['.next/**']),
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
		},
	},
];

export default eslintConfig;
