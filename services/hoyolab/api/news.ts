'use server';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from '../utils';

import type { ListNews } from '../models/news';

export const getListNews = async ({
	langKey = 'en-us',
	pageSize = 6,
	page = 1,
}:
	| {
			langKey?: string;
			pageSize?: number;
			page?: number;
	  }
	| undefined = {}) => {
	const result = await fetchWithErrorHandling<ListNews>(
		Hoyolab.listNews({
			langKey,
			pageSize,
			page,
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
			next: {
				revalidate: 60 * 60 * 24, // 1 day
				tags: [langKey, 'news', 'zzz_news'],
			},
		},
	);
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return result.data.list.map((item) => ({
		id: item.iInfoId.toString(),
		href: `https://zenless.hoyoverse.com/${langKey}/news/${item.iInfoId}`,
		img: item.sExt ? JSON.parse(item.sExt)['news-banner'][0].url : undefined,
		imgAlt: item.sTitle,
	}));
};
