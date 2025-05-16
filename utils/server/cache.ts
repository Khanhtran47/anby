import { totalTtl, verboseReporter } from '@epic-web/cachified';
import * as C from '@epic-web/cachified';
import { LRUCache } from 'lru-cache';

import { catchErrorTyped } from '@/utils/common/function';

import { singleton } from './singleton';

import type { Cache, CacheEntry } from '@epic-web/cachified';

const lruOptions = {
	// let just say 1kb is an object which after being stringified having length of 1000
	sizeCalculation: (_value: unknown) => Math.ceil(JSON.stringify(_value).length / 1000),

	// we won't cache object bigger than 800kb
	maxSize: 800,

	// max nb of objects, less than 500mb
	max: 640,
};

const lru = singleton('lru-cache', () => new LRUCache<string, CacheEntry<unknown>>(lruOptions));

const lruCache = {
	name: 'app-memory-cache',
	set: (key, value) => {
		const ttl = totalTtl(value?.metadata);
		lru.set(key, value, {
			ttl: ttl === Infinity ? undefined : ttl,
			start: value?.metadata?.createdTime,
		});
		return value;
	},
	get: (key) => lru.get(key),
	delete: (key) => lru.delete(key),
} satisfies Cache;

const getAllCacheKeys = async () => [...lru.keys()];
const searchCacheKeys = async (search: string) =>
	[...lru.keys()].filter((key) => key.includes(search));

async function shouldForceFresh({
	forceFresh,
	request,
	key,
}: {
	forceFresh?: boolean | string;
	request?: Request;
	key: string;
}) {
	if (process.env.LRU_CACHE === 'OFF') return true;
	if (typeof forceFresh === 'boolean') return forceFresh;
	if (typeof forceFresh === 'string') return forceFresh.split(',').includes(key);
	if (!request) return false;
	const fresh = new URL(request.url).searchParams.get('fresh');
	if (typeof fresh !== 'string') return false;
	if (fresh === '') return true;
	return fresh.split(',').includes(key);
}

async function cachified<Value>({
	request,
	...options
}: Omit<C.CachifiedOptions<Value>, 'forceFresh'> & {
	request?: Request;
	forceFresh?: boolean | string;
}): Promise<Value> {
	let cachifiedResolved = false;
	const cachifiedPromise = C.cachified(
		{
			...options,
			forceFresh: await shouldForceFresh({
				forceFresh: options.forceFresh,
				request,
				key: options.key,
			}),
			getFreshValue: async (context) => {
				if (!cachifiedResolved) {
					const freshValue = await options.getFreshValue(context);
					return freshValue;
				}
				return options.getFreshValue(context);
			},
		},
		verboseReporter<Value>(),
	);
	cachifiedResolved = true;
	return cachifiedPromise;
}

async function fetcher<Value>({
	url,
	requestInit,
	...options
}: Omit<
	C.CachifiedOptions<(Value & { error?: undefined }) | { error?: Error }>,
	'getFreshValue' | 'forceFresh'
> & {
	url: string;
	requestInit?: RequestInit;
	forceFresh?: boolean | string;
	getFreshValue?: undefined;
}) {
	const results = await cachified({
		...options,
		request: undefined,
		getFreshValue: async () => {
			const [error, res] = await catchErrorTyped(fetch(url, requestInit));
			if (error) {
				console.error(error);
				return { error };
			} else {
				const data = (await res.json()) as Value;
				return data;
			}
		},
		checkValue: (value: unknown) => {
			if (typeof value === 'object' && value !== null) {
				return Object.keys(value).length > 0;
			}
			return false;
		},
	});
	return results;
}

export { lru, lruCache, getAllCacheKeys, searchCacheKeys, shouldForceFresh, cachified, fetcher };
