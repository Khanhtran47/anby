import { unstable_cache } from 'next/cache';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from '../utils';

import type { EntryPage } from '../models/entry-page';

export const getEntryPage = async ({
	langKey = 'en-us',
	id,
}: {
	langKey?: string;
	id: string | number;
}) => {
	const cacheKey = `entry-page-${langKey}-${id}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<EntryPage>(Hoyolab.entryPage({ id }), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'X-Rpc-Language': langKey,
					'X-Rpc-Wiki_app': 'zzz',
					Origin: 'https://wiki.hoyolab.com',
					Referer: 'https://wiki.hoyolab.com/',
				},
			});
			if (result && 'error' in result) {
				return { error: result.error };
			}
			return result;
		},
		[cacheKey],
		{
			tags: [cacheKey, 'entry-page'],
			revalidate: 60 * 60 * 24 * 7, // 7 days
		},
	)();
};
