import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from '../utils';

import type { ListVideos } from '../models/videos';

export const getListVideos = async ({
	langKey = 'en-us',
}:
	| {
			langKey?: string;
	  }
	| undefined = {}) => {
	const result = await fetchWithErrorHandling<ListVideos>(Hoyolab.listVideos(), {
		headers: {
			'Content-Type': 'application/json',
			'X-Rpc-Language': langKey,
			'X-Rpc-Wiki_app': 'zzz',
			Origin: 'https://wiki.hoyolab.com',
			Referer: 'https://wiki.hoyolab.com/',
		},
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return result?.data?.video?.categorizations?.collections?.map((collection) => ({
		...collection,
		id: collection.name.toLowerCase().replace(/\s+/g, '-'),
		videos: collection?.videos?.map((video) => ({
			videoId: video?.url.split('/').pop() || '',
			name: video?.ep_abstract?.name,
			duration: video?.duration,
			title: video?.title,
			thumbnail: video?.img,
		})),
	}));
};
