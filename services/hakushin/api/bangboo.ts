import { cache } from 'react';

import { fetcher, lruCache } from '@/utils/server/cache';

import { Hakushin } from '../utils';

import type { Bangboo } from '../models/bangboo';

export const getListBangboo = cache(async () => {
	const result = await fetcher<Record<string, Bangboo>>({
		url: Hakushin.listBangboo(),
		key: 'hakushin-bangboo-list',
		ttl: 1000 * 60 * 60 * 24 * 7,
		staleWhileRevalidate: 1000 * 60 * 60 * 24 * 30,
		cache: lruCache,
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return Object.entries(result).map(([id, bangboo]) => ({
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
});
