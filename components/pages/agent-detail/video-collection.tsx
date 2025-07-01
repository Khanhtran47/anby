import React from 'react';

import VideoGallery from '@/components/features/video-collection';
import { Box } from '@/components/ui/box';

import type { VideoCollection as VideoCollectionType } from '@/services/hakushin/models/agent';

function VideoCollection(props: { videoCollection?: VideoCollectionType }) {
	const { videoCollection } = props;
	const { data, name } = videoCollection || {};
	if (!data || !data.list || data.list.length === 0) {
		return null;
	}
	return (
		<Box fullWidth showBgCorner showDecorImgs className="z-10" radius="lg" size="lg" title={name}>
			<VideoGallery videoCollection={data?.list} />
		</Box>
	);
}

export default VideoCollection;
