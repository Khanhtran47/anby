import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from './utils';

export interface ListVideos {
	data: {
		video: {
			categorizations: {
				collections: Collection[];
			};
		};
	};
	message: string;
	retcode: number;
}

export interface Collection {
	is_shield: boolean;
	name: string;
	updated_at: string;
	videos: Video[];
}

export interface Video {
	duration: string;
	ep_abstract: {
		entry_page_id: string;
		name: string;
		icon_url: string;
	};
	img: string;
	title: string;
	url: string;
}

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
