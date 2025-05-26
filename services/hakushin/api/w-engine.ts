import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hakushin } from '../utils';

import type { WEngine } from '../models/w-engine';

export const getListWEngine = async () => {
	const result = await fetchWithErrorHandling<Record<string, WEngine>>(Hakushin.listWEngine(), {
		next: {
			revalidate: 60 * 60 * 24 * 7, // 7 day
		},
		headers: {
			'Content-Type': 'application/json',
		},
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
};
