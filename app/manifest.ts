import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import type { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
	const t = await getTranslations({
		locale: routing.defaultLocale,
		namespace: 'Brand',
	});

	return {
		name: t('name'),
		start_url: '/',
		theme_color: '#000000',
	};
}
