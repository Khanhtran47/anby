'use client';

import { useEffect } from 'react';
import AutoPlay from 'embla-carousel-autoplay';
import { toast } from 'sonner';

import { Link } from '@/i18n/navigation';
import { Box } from '@/components/ui/box';
import {
	Carousel,
	CarouselContent,
	CarouselIndicator,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
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
				className="group"
				mainOptions={{ loop: true }}
				thumbsOptions={{ active: false }}
				plugins={[
					AutoPlay({
						delay: 5000,
						stopOnInteraction: false,
						stopOnMouseEnter: true,
					}),
				]}
			>
				<div className="relative size-full">
					<CarouselContent>
						{search.data.map((wallpaper) => (
							<CarouselItem key={wallpaper.id}>
								<Link isExternal href={wallpaper.source || wallpaper.url}>
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
					<div className="absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 pl-4 opacity-0 transition-[bottom,opacity] group-hover:bottom-2 group-hover:opacity-100">
						<CarouselThumbContent className="gap-x-2">
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselIndicator key={index} index={index} />
							))}
						</CarouselThumbContent>
					</div>
				</div>
				<CarouselNext className="opacity-0 group-hover:-right-2 group-hover:opacity-100" />
				<CarouselPrevious className="opacity-0 group-hover:left-2 group-hover:opacity-100" />
			</Carousel>
		</Box>
	);
}

export default WallpaperCarousel;
