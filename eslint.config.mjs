import { config as defaultConfig } from '@khanhtran47/config/eslint';
import nextPlugin from '@next/eslint-plugin-next';
import { globalIgnores } from 'eslint/config';

const eslintConfig = [
	...defaultConfig,
	globalIgnores(['.next/**', 'public/assets/icons/*.d.ts', 'components/ui/icons/*.md']),
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'@next/next': nextPlugin,
		},
		rules: {
			...nextPlugin.configs.recommended.rules,
			'@next/next/no-img-element': 'off',
			'no-restricted-imports': [
				'error',
				{
					name: 'next/link',
					message: 'Please import from `@/i18n/navigation` instead.',
				},
				{
					name: 'next/navigation',
					importNames: ['redirect', 'permanentRedirect', 'useRouter', 'usePathname'],
					message: 'Please import from `@/i18n/navigation` instead.',
				},
			],
		},
	},
];

export default eslintConfig;
