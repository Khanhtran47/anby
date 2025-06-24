import React from 'react';
import { getLocale } from 'next-intl/server';

import { getListNews } from '@/services/hoyolab/api/news';
import { LANGUAGES } from '@/constants/lang';
import ErrorToast from '@/components/features/error-toast';
import IndicatorCarousel from '@/components/features/indicator-carousel';

async function News() {
	const locale = await getLocale();
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const news = await getListNews({ langKey });
	if ('error' in news) {
		return <ErrorToast title={news.error} />;
	}
	return <IndicatorCarousel optimizeImg items={news} />;
}

export default News;
