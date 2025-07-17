import { NextResponse } from 'next/server';

import { postCheckinSign } from '@/services/hoyolab/api/check-in';

import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.nextUrl);
		const langKey = searchParams.get('langKey');
		const ltoken = searchParams.get('ltoken');
		const ltuid = searchParams.get('ltuid');

		if (!langKey || !ltoken || !ltuid) {
			return NextResponse.json(
				{ ok: false, error: 'Missing required query parameters' },
				{ status: 400 },
			);
		}

		const data = await postCheckinSign({ langKey, ltoken, ltuid });

		if (data && 'error' in data) {
			return NextResponse.json({ ok: false, error: data.error }, { status: 500 });
		} else if (!data) {
			return NextResponse.json({ ok: false, error: 'No data found' }, { status: 404 });
		}

		return NextResponse.json({ ok: true, data });
	} catch (error) {
		return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
	}
}
