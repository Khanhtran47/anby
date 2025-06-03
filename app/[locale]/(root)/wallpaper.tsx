import React from 'react';

import { getSearchZZZWallhaven } from '@/services/wallhaven/search';
import IndicatorCarousel from '@/components/features/indicator-carousel';
import { Box } from '@/components/ui/box';

async function Wallpaper() {
	const search = await getSearchZZZWallhaven();
	return (
		<Box fullWidth className="flex-col items-start pl-0" radius="md" size="lg">
			<IndicatorCarousel items={search} />
		</Box>
	);
}

export default Wallpaper;
