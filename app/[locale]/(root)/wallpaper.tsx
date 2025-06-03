import React from 'react';

import { getSearchZZZWallhaven } from '@/services/wallhaven/search';
import IndicatorCarousel from '@/components/features/indicator-carousel';

async function Wallpaper() {
	const search = await getSearchZZZWallhaven();
	return <IndicatorCarousel items={search} />;
}

export default Wallpaper;
