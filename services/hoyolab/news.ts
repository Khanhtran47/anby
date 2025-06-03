import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from './utils';

export interface ListNews {
	data: Data;
	message: string;
	retcode: number;
}

export interface Data {
	iTotal: number;
	list: List[];
}

export interface List {
	dtCreateTime: Date;
	dtEndTime: Date;
	dtStartTime: Date;
	iInfoId: number;
	sAuthor: string;
	sCategoryName: string;
	sChanId: string[];
	sContent: string;
	sExt: string;
	sIntro: string;
	sSign: string;
	sTagName: any[];
	sTitle: string;
	sUrl: string;
}

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
