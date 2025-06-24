'use client';

import { YouTubeEmbed } from '@next/third-parties/google';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselThumbContent,
	CarouselThumbItem,
} from '@/components/ui/carousel';
import { Image } from '@/components/ui/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VideoCollectionProps {
	videoCollection: {
		id: string;
		videos: {
			videoId: string;
			name: string;
			duration: string;
			title: string;
			thumbnail: string;
		}[];
		is_shield: boolean;
		name: string;
		updated_at: string;
	}[];
}

function VideoCollection(props: VideoCollectionProps) {
	const { videoCollection } = props;

	if (!videoCollection || videoCollection.length === 0) {
		return null;
	}

	return (
		<Tabs className="mt-3 w-full" defaultValue={videoCollection[0].id}>
			<TabsList className="ml-4 flex w-[calc(100%-1rem)]">
				<ScrollArea
					className="px-0"
					orientation="horizontal"
					scrollHideDelay={50}
					classNames={{
						viewport: 'overflow-hidden rounded-full',
						scrollbar: 'h-2',
					}}
				>
					<div className="flex w-full">
						{videoCollection.map(({ name, id }) => (
							<TabsTrigger key={id} className="w-fit shrink-0" value={id}>
								{name}
							</TabsTrigger>
						))}
					</div>
				</ScrollArea>
			</TabsList>
			{videoCollection.map(({ id, videos }) => (
				<TabsContent key={id} className="flex flex-col items-start justify-center gap-2" value={id}>
					<Carousel mainOptions={{ loop: true }}>
						<CarouselContent>
							{videos.map((video, index) => (
								<CarouselItem
									key={`${id}-video-${video.videoId}-${index}`}
									className="aspect-video"
								>
									<YouTubeEmbed
										params="playsinline=1&autoplay=0"
										style={`background-image: url('${video.thumbnail}');border-radius: calc(var(--radius) + 4px);`}
										// @ts-expect-error
										title={video.title}
										videoid={video.videoId}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselThumbContent>
							{videos.map((video, index) => (
								<CarouselThumbItem
									key={`${id}-thumb-${video.videoId}-${index}`}
									className="aspect-video h-auto bg-transparent"
									index={index}
									title={video.title}
								>
									<Image
										optimizeImg
										alt={video.title}
										height={94}
										loading="lazy"
										radius="sm"
										src={video.thumbnail}
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
