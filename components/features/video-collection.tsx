'use client';

import { YouTubeEmbed } from '@next/third-parties/google';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselThumbContent,
	CarouselThumbItem,
} from '@/components/ui/carousel';
import { Image } from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VideoCollectionProps {
	videoCollection?: {
		id?: string;
		videos?: {
			videoId: string;
			name?: string;
			duration?: string;
			title?: string;
			thumbnail?: string;
		}[];
		is_shield?: boolean;
		name?: string;
		updated_at?: string;
	}[];
}

function VideoCollection(props: VideoCollectionProps) {
	const { videoCollection } = props;

	if (!videoCollection || videoCollection.length === 0) {
		return null;
	}

	return (
		<Tabs
			className="mt-3 w-full"
			defaultValue={videoCollection[0].id || videoCollection[0].name || `video-0`}
		>
			<TabsList className="ml-4 flex w-[calc(100%-1rem)]">
				<Carousel
					className="w-full px-9"
					mainOptions={{ containScroll: 'keepSnaps', dragFree: true }}
				>
					<CarouselContent>
						{videoCollection?.map(({ name, id }, index) => (
							<TabsTrigger
								key={id || name || `video-${index}`}
								className="w-fit shrink-0"
								value={id || name || `video-${index}`}
							>
								{name}
							</TabsTrigger>
						))}
					</CarouselContent>
					<CarouselPrevious className="-left-1.5" />
					<CarouselNext className="-right-1.5" />
				</Carousel>
			</TabsList>
			{videoCollection?.map(({ id, videos, name }, index) => (
				<TabsContent
					key={id || name || `video-${index}`}
					className="flex w-full flex-col items-center justify-center gap-2"
					value={id || name || `video-${index}`}
				>
					<Carousel className="max-w-2xl" mainOptions={{ loop: true }}>
						<CarouselContent>
							{videos?.map((video, index) => (
								<CarouselItem
									key={`${id}-video-${video?.videoId}-${index}`}
									className="aspect-video w-full"
								>
									<YouTubeEmbed
										params="playsinline=1&autoplay=0"
										style={`background-image: url('${video?.thumbnail}');border-radius: calc(var(--radius) + 4px);max-width: 100%;`}
										// @ts-expect-error
										title={video?.title}
										videoid={video?.videoId}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselThumbContent>
							{videos?.map((video, index) => (
								<CarouselThumbItem
									key={`${id}-thumb-${video.videoId}-${index}`}
									className="aspect-video h-auto bg-transparent"
									index={index}
									title={video?.title}
								>
									<Image
										optimizeImg
										alt={video?.title}
										height={94}
										loading="lazy"
										radius="sm"
										src={video?.thumbnail}
										width={152}
										classNames={{
											wrapper: 'size-full',
											img: 'size-full object-cover',
										}}
									/>
								</CarouselThumbItem>
							))}
						</CarouselThumbContent>
					</Carousel>
				</TabsContent>
			))}
		</Tabs>
	);
}

export default VideoCollection;
