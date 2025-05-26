import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hakushin } from '../utils';

import type { DriveDisc } from '../models/drive-disc';

export const getListDriveDisc = async () => {
	const result = await fetchWithErrorHandling<Record<string, DriveDisc>>(Hakushin.listDriveDisc(), {
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
	return Object.entries(result).map(([id, driveDisc]) => ({
		id: Number(id),
		...driveDisc,
		icon: driveDisc.icon
			? `https://api.hakush.in/zzz/UI/${driveDisc.icon.replace(/^.*\/([^/]+)\.png$/, '$1')}.webp`
			: undefined,
	}));
};
