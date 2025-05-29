'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import { Link } from '@/i18n/navigation';
import { Box } from '@/components/ui/box';
import {
	Carousel,
	CarouselContent,
	CarouselIndicator,
	CarouselItem,
	CarouselThumbContent,
} from '@/components/ui/carousel';
import { Image } from '@/components/ui/image';

import type { SearchWallHaven } from '@/services/wallhaven/search';

function WallpaperCarousel({
	search,
}: {
	search:
		| SearchWallHaven
		| {
				error: string;
		  };
}) {
	useEffect(() => {
		if ('error' in search) {
			toast.error(`Error fetching wallpaper: ${search.error}`);
		}
		// eslint-disable-next-line react-hooks/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if ('error' in search) {
		return null;
	}

	return (
		<Box fullWidth className="flex-col items-start pl-0" radius="md" size="lg">
			<Carousel
				opts={{
					loop: true,
				}}
			>
				<div className="relative size-full">
					<CarouselContent>
						{search.data.map((wallpaper) => (
							<CarouselItem key={wallpaper.id}>
								<Link
									href={wallpaper.source || wallpaper.url}
									rel="noopener noreferrer"
									target="_blank"
								>
									<Image
										alt={`${wallpaper.category} Zenless Zone Zero ${wallpaper.resolution}`}
										height={720}
										loading="lazy"
										radius="sm"
										src={wallpaper.thumbs.large || wallpaper.path}
										width={1280}
										classNames={{
											wrapper: 'aspect-video w-full',
											img: 'size-full object-cover',
										}}
									/>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 pl-4">
						<CarouselThumbContent className="gap-x-2">
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselIndicator key={index} index={index} />
							))}
						</CarouselThumbContent>
					</div>
				</div>
			</Carousel>
		</Box>
	);
}

export default WallpaperCarousel;
