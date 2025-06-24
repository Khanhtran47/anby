import { unstable_cache } from 'next/cache';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hakushin } from '../utils';

import type { Bangboo } from '../models/bangboo';

export const getListBangboo = async ({
	ids = [],
}:
	| {
			ids?: number[]; // Optional parameter to filter by specific bangboo IDs
	  }
	| undefined = {}) => {
	const cacheKey = `list-bangboos-${ids.join('-')}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<Record<string, Bangboo>>(Hakushin.listBangboo(), {
				next: {
					revalidate: 60 * 60 * 24 * 7, // 7 day
				},
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (result && 'error' in result) {
				return { error: result.error as string };
			}

			const formatResult = Object.entries(result).map(([id, bangboo]) => ({
				id: Number(id),
				code: bangboo.codename,
				names: [
					{ id: 'CHS', name: bangboo.CHS },
					{ id: 'EN', name: bangboo.EN },
					{ id: 'JA', name: bangboo.JA },
					{ id: 'KO', name: bangboo.KO },
				],
				desc: bangboo.desc,
				icon: bangboo.icon
					? `https://api.hakush.in/zzz/UI/${bangboo.icon.replace(/^.*\/([^/]+)\.png$/, '$1')}.webp`
					: undefined,
				rarity: bangboo.rank,
			}));
			if (ids.length > 0) {
				return formatResult.filter((bangboo) => ids.includes(bangboo.id));
			}
			return formatResult;
		},
		[cacheKey],
		{
			tags: [cacheKey, 'list-bangboo'],
			revalidate: 60 * 60 * 24 * 7, // 7 days
		},
	)();
};
