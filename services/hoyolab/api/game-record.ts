import { unstable_cache } from 'next/cache';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from '../utils';

import type {
	GameRecord,
	GameRecordData,
	MemDetail,
	MemDetailData,
	Token,
} from '../models/game-record';
import type { GameRecordParams } from '../utils';

// ================================================
// =============== Game Record API ================
// ================================================

export const getGameRecord = async ({
	server,
	uid,
	langKey = 'en-us',
	ltoken,
	ltuid,
}: Omit<GameRecordParams, 'scheduleType'> &
	Token & {
		langKey: string;
	}) => {
	const cacheKey = `game-record-${server}-${uid}-${langKey}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<GameRecord>(Hoyolab.index({ server, uid }), {
				method: 'GET',
				headers: {
					origin: 'https://act.hoyolab.com',
					referer: 'https://act.hoyolab.com/',
					'X-Rpc-Lang': langKey,
					'X-Rpc-Language': langKey,
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
		},
		[cacheKey],
		{
			tags: [cacheKey, 'game-record'],
			revalidate: 60 * 60 * 12, // 12 hours
		},
	)();
};

export async function fetchGameRecord({
	server,
	uid,
	langKey,
	ltoken,
	ltuid,
}: Omit<GameRecordParams, 'scheduleType'> &
	Token & {
		langKey: string;
	}): Promise<GameRecordData> {
	const res = await fetch(
		`/api/record/index?server=${server}&uid=${uid}&langKey=${langKey}&ltoken=${ltoken}&ltuid=${ltuid}`,
	);
	const body = (await res.json()) as
		| { ok: false; error: string }
		| { ok: true; data: GameRecordData };

	if ((!res.ok || !body.ok) && 'error' in body) {
		throw new Error(body.error);
	}
	return body.data;
}

// ================================================
// ================ Mem Detail API ================
// ================================================

export const getMemDetail = async ({
	server,
	uid,
	scheduleType,
	langKey = 'en-us',
	ltoken,
	ltuid,
}: GameRecordParams &
	Token & {
		langKey: string;
	}) => {
	const cacheKey = `mem-detail-${server}-${uid}-${scheduleType}-${langKey}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<MemDetail>(
				Hoyolab.memDetail({ server, uid, scheduleType }),
				{
					method: 'GET',
					headers: {
						origin: 'https://act.hoyolab.com',
						referer: 'https://act.hoyolab.com/',
						'X-Rpc-Lang': langKey,
						'X-Rpc-Language': langKey,
						...(ltoken && ltoken
							? {
									Cookie: `ltoken_v2=${ltoken}; ltuid_v2=${ltuid}`,
								}
							: {}),
					},
				},
			);
			if (result && 'error' in result) {
				return { error: result.error };
			}
			return result.data;
		},
		[cacheKey],
		{
			tags: [cacheKey, 'mem-detail'],
			revalidate: 60 * 60 * 12, // 12 hours
		},
	)();
};

export async function fetchMemDetail({
	server,
	uid,
	langKey,
	scheduleType,
	ltoken,
	ltuid,
}: GameRecordParams &
	Token & {
		langKey: string;
	}): Promise<MemDetailData> {
	const res = await fetch(
		`/api/record/mem_detail?server=${server}&uid=${uid}&scheduleType=${scheduleType}&langKey=${langKey}&ltoken=${ltoken}&ltuid=${ltuid}`,
	);
	const body = (await res.json()) as
		| { ok: false; error: string }
		| { ok: true; data: MemDetailData };

	if ((!res.ok || !body.ok) && 'error' in body) {
		throw new Error(body.error);
	}
	return body.data;
}
