import React from 'react';

import { getSearchZZZWallhaven } from '@/services/wallhaven/search';
import ErrorToast from '@/components/features/error-toast';
import IndicatorCarousel from '@/components/features/indicator-carousel';

async function Wallpaper() {
	const search = await getSearchZZZWallhaven();
	if ('error' in search) {
		return <ErrorToast title={search.error} />;
	}
	return <IndicatorCarousel items={search} />;
}

export default Wallpaper;
