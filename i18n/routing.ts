import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	// List of supported locales
	locales: ['en', 'fr', 'vi', 'zh', 'ja', 'ko'] as const,

	// Default locale
	defaultLocale: 'en',
});
