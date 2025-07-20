import { Redis } from '@upstash/redis';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { routing } from './i18n/routing';

import type { NextRequest } from 'next/server';

const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL!,
	token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// const RATE_LIMIT_WINDOW = 60;
// const MAX_REQUESTS = 100;

const API_RATE_LIMIT_WINDOW = 60;
const API_MAX_REQUESTS = 30;

const nextIntlMiddleware = createMiddleware(routing);

// const rateLimitMatcher = /^(?!\/(api\/|_next\/|_vercel\/|assets\/|.*\..*))/;
const apiRateLimitMatcher = /^\/api\//;
const routingMatcher = /^(?!\/(?:api|_next|_vercel|assets|.*\..*))/;

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (apiRateLimitMatcher.test(pathname)) {
		const ip =
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			request.headers.get('x-real-ip') ||
			'unknown';

		const key = `api-rate-limit:${ip}`;

		try {
			const current = await redis.incr(key);
			if (current === 1) {
				await redis.expire(key, API_RATE_LIMIT_WINDOW);
			}
			if (current > API_MAX_REQUESTS) {
				return new NextResponse('API Rate Limit Exceeded', {
					status: 429,
					headers: {
						'Retry-After': API_RATE_LIMIT_WINDOW.toString(),
						'X-RateLimit-Limit': API_MAX_REQUESTS.toString(),
						'X-RateLimit-Remaining': '0',
						'X-RateLimit-Reset': new Date(Date.now() + API_RATE_LIMIT_WINDOW * 1000).toISOString(),
						'Content-Type': 'application/json',
					},
				});
			}
		} catch (error) {
			console.error('API rate limiting error:', error);
		}
	}

	// if (rateLimitMatcher.test(pathname)) {
	// 	const ip =
	// 		request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
	// 		request.headers.get('x-real-ip') ||
	// 		'unknown';

	// 	const key = `rate-limit:${ip}`;

	// 	try {
	// 		const current = await redis.incr(key);
	// 		if (current === 1) {
	// 			await redis.expire(key, RATE_LIMIT_WINDOW);
	// 		}
	// 		if (current > MAX_REQUESTS) {
	// 			return new NextResponse('Too Many Requests', {
	// 				status: 429,
	// 				headers: {
	// 					'Retry-After': RATE_LIMIT_WINDOW.toString(),
	// 					'X-RateLimit-Limit': MAX_REQUESTS.toString(),
	// 					'X-RateLimit-Remaining': '0',
	// 					'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT_WINDOW * 1000).toISOString(),
	// 				},
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.error('Rate limiting error:', error);
	// 	}
	// }

	if (routingMatcher.test(pathname)) {
		return nextIntlMiddleware(request);
	}
}

export const config = {
	matcher: ['/api/(.*)', '/((?!_next|_vercel|assets|.*\\..*).*)'],
};
