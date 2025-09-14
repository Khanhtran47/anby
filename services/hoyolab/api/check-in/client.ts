import type { CheckInInfoData } from '../../models/check-in';
import type { Token } from '../../models/game-record';

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
