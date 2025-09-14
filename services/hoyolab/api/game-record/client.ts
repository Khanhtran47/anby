import type { GameRecordData, MemDetailData, NoteData, Token } from '../../models/game-record';
import type { GameRecordParams } from '../../utils';

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

export async function fetchNote({
	server,
	uid,
	langKey,
	ltoken,
	ltuid,
}: Omit<GameRecordParams, 'scheduleType'> &
	Token & {
		langKey: string;
	}): Promise<NoteData> {
	const res = await fetch(
		`/api/record/note?server=${server}&uid=${uid}&langKey=${langKey}&ltoken=${ltoken}&ltuid=${ltuid}`,
	);
	const body = (await res.json()) as { ok: false; error: string } | { ok: true; data: NoteData };

	if ((!res.ok || !body.ok) && 'error' in body) {
		throw new Error(body.error);
	}
	return body.data;
}
