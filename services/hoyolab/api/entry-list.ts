import { unstable_cache } from 'next/cache';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from '../utils';

import type { EntryList } from '../models/entry-list';

export const getEntryList = async ({
	langKey = 'en-us',
	filters = [],
	menuId,
	page = 1,
	pageSize = 10,
}: {
	langKey?: string;
	filters?: string[];
	menuId: string;
	page: number;
	pageSize: number;
}) => {
	const cacheKey = `entry-list-${langKey}-${filters.join('-')}-${menuId}-${page}-${pageSize}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<EntryList>(Hoyolab.entryList(), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=UTF-8',
					'X-Rpc-Language': langKey,
					'X-Rpc-Wiki_app': 'zzz',
					Origin: 'https://wiki.hoyolab.com',
					Referer: 'https://wiki.hoyolab.com/',
				},
				body: JSON.stringify({
					filters,
					menu_id: menuId,
					page_num: page,
					page_size: pageSize,
					use_es: true,
				}),
			});
			if (result && 'error' in result) {
				return { error: result.error };
			}
			return result;
		},
		[cacheKey],
		{
			tags: [cacheKey, 'entry-list'],
			revalidate: 60 * 60 * 24 * 7, // 7 days
		},
	)();
};
