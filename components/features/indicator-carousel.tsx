'use client';

import { useEffect } from 'react';
import AutoPlay from 'embla-carousel-autoplay';
import { toast } from 'sonner';

import { Link } from '@/i18n/link';
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

interface CarouselIndicatorProps {
	items:
		| {
				id: string;
				href: string;
				img: string;
				imgAlt: string;
		  }[]
		| {
				error: string;
		  };
}

function IndicatorCarousel(props: CarouselIndicatorProps) {
	const { items } = props;
	useEffect(() => {
		if ('error' in items) {
			toast.error(`Error fetching wallpaper: ${items.error}`);
		}
		// eslint-disable-next-line react-hooks/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if ('error' in items || !items || items.length === 0) {
		return null;
	}

	return (
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
					{items.map((item) => (
						<CarouselItem key={item.id}>
							<Link isExternal href={item.href} title={item.imgAlt}>
								<Image
									alt={item.imgAlt}
									height={720}
									loading="lazy"
									radius="sm"
									src={item.img}
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
						{Array.from({ length: 6 }).map((_, index) => (
							<CarouselIndicator key={index} index={index} />
						))}
					</CarouselThumbContent>
				</div>
			</div>
			<CarouselNext className="opacity-0 group-hover:-right-2 group-hover:opacity-100" />
			<CarouselPrevious className="opacity-0 group-hover:left-2 group-hover:opacity-100" />
		</Carousel>
	);
}

export default IndicatorCarousel;
