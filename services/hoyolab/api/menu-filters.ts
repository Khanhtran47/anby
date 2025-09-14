'use server';

import { unstable_cache } from 'next/cache';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from '../utils';

import type { MenuFilters } from '../models/menu-filters';

export const getMenuFilters = async ({
	langKey = 'en-us',
	menuId,
}: {
	langKey?: string;
	menuId: number;
}) => {
	const cacheKey = `menu-filters-${langKey}-${menuId}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<MenuFilters>(Hoyolab.menuFilter({ menuId }), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Rpc-Language': langKey,
					'X-Rpc-Wiki_app': 'zzz',
					Origin: 'https://wiki.hoyolab.com',
					Referer: 'https://wiki.hoyolab.com/',
				},
			});
			if (result && 'error' in result) {
				return { error: result.error };
			}
			return result.data.filters.map((filter) => ({
				id: filter.id,
				key: filter.key,
				text: filter.text,
				values: filter.values.map((value) => ({
					id: value.id,
					icon: value.icon,
					value: value.value,
					enumString: value.enum_string,
				})),
			}));
		},
		[cacheKey],
		{
			tags: [cacheKey, 'menu-filters'],
			revalidate: 60 * 60 * 24 * 30, // 30 days
		},
	)();
};
