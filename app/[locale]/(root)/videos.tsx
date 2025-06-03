import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import { getListVideos } from '@/services/hoyolab/videos';
import { LANGUAGES } from '@/constants/lang';
import VideoCollection from '@/components/features/video-collection';
import { Box } from '@/components/ui/box';

async function Videos() {
	const [t, locale] = await Promise.all([getTranslations('HomePage'), getLocale()]);
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const videoCollection = await getListVideos({ langKey });
	return (
		<Box
			fullWidth
			showBgCorner
			className="flex-col items-start gap-4 pl-0"
			classNames={{ titleWrapper: 'pl-4' }}
			radius="md"
			size="lg"
			title={t('videoCollection')}
		>
			<VideoCollection videoCollection={videoCollection} />
		</Box>
	);
}

export default Videos;
