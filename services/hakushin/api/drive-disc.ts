import { unstable_cache } from 'next/cache';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hakushin } from '../utils';

import type { DriveDisc } from '../models/drive-disc';

export const getListDriveDisc = async ({
	ids = [],
}:
	| {
			ids?: number[]; // Optional parameter to filter by specific drive disc IDs
	  }
	| undefined = {}) => {
	const cacheKey = `list-drive-disc-${ids.join('-')}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<Record<string, DriveDisc>>(
				Hakushin.listDriveDisc(),
				{
					next: {
						revalidate: 60 * 60 * 24 * 7, // 7 day
					},
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			if (result && 'error' in result) {
				return { error: result.error as string };
			}

			const formatResult = Object.entries(result).map(([id, driveDisc]) => ({
				id: Number(id),
				...driveDisc,
				icon: driveDisc.icon
					? `https://api.hakush.in/zzz/UI/${driveDisc.icon.replace(/^.*\/([^/]+)\.png$/, '$1')}.webp`
					: undefined,
			}));

			if (ids.length > 0) {
				return formatResult.filter((disc) => ids.includes(disc.id));
			}
			return formatResult;
		},
		[cacheKey],
		{
			tags: [cacheKey, 'list-drive-disc'],
			revalidate: 60 * 60 * 24 * 7, // 7 day
		},
	)();
};
