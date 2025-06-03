import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { host } from '@/utils/common/host';

import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		...getEntries({ href: '/', changeFrequency: 'daily' }),
		...getEntries({ href: '/changelog', changeFrequency: 'weekly' }),
		...getEntries({ href: '/agent', changeFrequency: 'monthly' }),
		...getEntries({ href: '/bangboo', changeFrequency: 'monthly' }),
		...getEntries({ href: '/w-engine', changeFrequency: 'monthly' }),
		...getEntries({ href: '/drive-disc', changeFrequency: 'monthly' }),
		...getEntries({ href: '/settings', changeFrequency: 'never' }),
	];
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntries({
	href,
	changeFrequency,
	priority = 0.7,
}: {
	href: Href;
	changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}) {
	return routing.locales.map((locale) => ({
		url: getUrl(href, locale),
		lastModified: new Date().toISOString(),
		changeFrequency,
		priority,
	}));
}

function getUrl(href: Href, locale: Locale) {
	const pathname = getPathname({ locale, href });
	return host + pathname;
}
