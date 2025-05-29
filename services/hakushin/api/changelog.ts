import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hakushin } from '../utils';

import type { Changelog } from '../models/changelog';

export const getChangelog = async () => {
	const result = await fetchWithErrorHandling<Changelog>(Hakushin.changelog(), {
		next: {
			revalidate: 60 * 60 * 24, // 1 day
		},
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return {
		bangboo: result.bangboo,
		version: result.version,
		agents: result.character,
		wEngine: result.weapon,
		driveDisc: result.equipment,
		item: result.item,
	};
};
