import React from 'react';
import { getLocale } from 'next-intl/server';

import { getListNews } from '@/services/hoyolab/news';
import { LANGUAGES } from '@/constants/lang';
import IndicatorCarousel from '@/components/features/indicator-carousel';

async function News() {
	const locale = await getLocale();
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const news = await getListNews({ langKey });
	return <IndicatorCarousel items={news} />;
}

export default News;
