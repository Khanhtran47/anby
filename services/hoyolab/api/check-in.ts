import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from '../utils';

import type { CheckInInfo, CheckInInfoData } from '../models/check-in';
import type { Token } from '../models/game-record';

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

export const fetchCheckinInfo = async ({ langKey, ltoken, ltuid }: Token & { langKey: string }) => {
	const res = await fetch(`/api/check-in/info?langKey=${langKey}&ltoken=${ltoken}&ltuid=${ltuid}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const body = (await res.json()) as
		| { ok: false; error: string }
		| { ok: true; data: CheckInInfoData };
	if ((!res.ok || !body.ok) && 'error' in body) {
		throw new Error(body.error);
	}
	return body.data;
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

export const fetchCheckinSign = async ({ langKey, ltoken, ltuid }: Token & { langKey: string }) => {
	const res = await fetch(`/api/check-in/sign?langKey=${langKey}&ltoken=${ltoken}&ltuid=${ltuid}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const body = (await res.json()) as
		| { ok: false; error: string }
		| { ok: true; data: { success: true } };
	if ((!res.ok || !body.ok) && 'error' in body) {
		throw new Error(body.error);
	}
	return body.data;
};
