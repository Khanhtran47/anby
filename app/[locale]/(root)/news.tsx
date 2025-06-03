import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import { getListNews } from '@/services/hoyolab/news';
import { LANGUAGES } from '@/constants/lang';
import IndicatorCarousel from '@/components/features/indicator-carousel';
import { Box } from '@/components/ui/box';

async function News() {
	const [t, locale] = await Promise.all([getTranslations('HomePage'), getLocale()]);
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const news = await getListNews({ langKey });
	return (
		<Box
			fullWidth
			showBgCorner
			className="flex-col items-start gap-4 pl-0"
			classNames={{ titleWrapper: 'pl-4' }}
			radius="md"
			size="lg"
			title={t('news')}
		>
			<IndicatorCarousel items={news} />
		</Box>
	);
}

export default News;
