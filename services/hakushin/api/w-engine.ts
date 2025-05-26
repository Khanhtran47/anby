import { cache } from 'react';

import { fetcher, lruCache } from '@/utils/server/cache';

import { Hakushin } from '../utils';

import type { WEngine } from '../models/w-engine';

export const getListWEngine = cache(async () => {
	const result = await fetcher<Record<string, WEngine>>({
		url: Hakushin.listWEngine(),
		key: 'hakushin-wEngine-list',
		ttl: 1000 * 60 * 60 * 24 * 7,
		staleWhileRevalidate: 1000 * 60 * 60 * 24 * 30,
		cache: lruCache,
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return Object.entries(result).map(([id, wEngine]) => ({
		id: Number(id),
		code: wEngine.EN,
		names: [
			{ id: 'CHS', name: wEngine.CHS },
			{ id: 'EN', name: wEngine.EN },
			{ id: 'JA', name: wEngine.JA },
			{ id: 'KO', name: wEngine.KO },
		],
		desc: wEngine.desc,
		icon: wEngine.icon
			? `https://api.hakush.in/zzz/UI/${wEngine.icon.replace(/^.*\/([^/]+)\.png$/, '$1')}.webp`
			: undefined,
		rarity: wEngine.rank,
		specialty: wEngine.type,
	}));
});
