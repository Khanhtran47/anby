import React from 'react';
import { getLocale } from 'next-intl/server';

import { getListVideos } from '@/services/hoyolab/api/videos';
import { LANGUAGES } from '@/constants/lang';
import VideoCollection from '@/components/features/video-collection';

async function Videos() {
	const locale = await getLocale();
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const videoCollection = await getListVideos({ langKey });
	return <VideoCollection videoCollection={videoCollection} />;
}

export default Videos;
