'use server';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from '../../utils';

import type { CheckInInfo } from '../../models/check-in';
import type { Token } from '../../models/game-record';

export const getCheckinInfo = async ({ langKey, ltoken, ltuid }: Token & { langKey: string }) => {
	if (!ltoken || !ltuid) {
		return { error: 'Missing ltoken or ltuid' };
	}
	const result = await fetchWithErrorHandling<CheckInInfo>(Hoyolab.checkInInfo({ langKey }), {
		method: 'GET',
		headers: {
			origin: 'https://act.hoyolab.com',
			referer: 'https://act.hoyolab.com/',
			'X-Rpc-Signgame': 'zzz',
			...(ltoken && ltoken
				? {
						Cookie: `ltoken_v2=${ltoken}; ltuid_v2=${ltuid}`,
					}
				: {}),
		},
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return result.data;
};

export const postCheckinSign = async ({ langKey, ltoken, ltuid }: Token & { langKey: string }) => {
	if (!ltoken || !ltuid) {
		return { error: 'Missing ltoken or ltuid' };
	}
	const result = await fetchWithErrorHandling<CheckInInfo>(Hoyolab.checkInSign(), {
		method: 'POST',
		headers: {
			origin: 'https://act.hoyolab.com',
			referer: 'https://act.hoyolab.com/',
			'X-Rpc-Signgame': 'zzz',
			...(ltoken && ltoken
				? {
						Cookie: `ltoken_v2=${ltoken}; ltuid_v2=${ltuid}`,
					}
				: {}),
		},
		body: JSON.stringify({
			lang: langKey,
			act_id: 'e202406031448091',
		}),
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return result.message === 'OK' ? { success: true } : { error: result.message || 'Unknown error' };
};
