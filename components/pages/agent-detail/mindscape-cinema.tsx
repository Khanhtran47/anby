import { Fragment } from 'react';

import { Badge } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Gallery, Item } from '@/components/ui/gallery';
import { Image } from '@/components/ui/image';

import type { MindscapeCinema as MindscapeCinemaType } from '@/services/main/models/agent';

function MindscapeCinema(props: { mindscapeCinema?: MindscapeCinemaType }) {
	const { mindscapeCinema } = props;
	const { data } = mindscapeCinema || {};
	return (
		<Box
			fullWidth
			showBgCorner
			showDecorImgs
			className="z-10"
			radius="lg"
			size="lg"
			title={mindscapeCinema?.name}
		>
			<div className="mt-10 flex w-full flex-col gap-4">
				{data?.list && data.list.length > 0
					? data.list.map((item, index) => (
							<Fragment key={`${item.id}-${index}`}>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										{item.icon_url ? (
											<Image
												optimizeImg
												alt={item?.name || `${mindscapeCinema?.name} ${index + 1}`}
												height={48}
												loading="lazy"
												src={item.icon_url}
												width={48}
												classNames={{
													wrapper: 'size-12 aspect-square',
													img: 'size-full object-cover ',
												}}
											/>
										) : (
											<Badge>{index + 1}</Badge>
										)}
										<span className="not-prose s8 !font-black">
											{item.name || `${mindscapeCinema?.name} ${index + 1}`}
										</span>
									</div>
									{item?.desc ? (
										<div
											className="[&>p]:text-muted-foreground [&>p]:!mt-0 [&>p]:!text-lg [&>p>span]:!text-lg"
											dangerouslySetInnerHTML={{
												__html: item.desc,
											}}
										/>
									) : null}
								</div>
								{index < data.list!.length - 1 ? (
									<hr className="border-border my-4 border-t" />
								) : null}
							</Fragment>
						))
					: null}
			</div>
			{data?.img_list && data.img_list.length > 0 ? (
				<Gallery downloadButton rotateButton>
					<Carousel
						className="border-border mt-8 w-full rounded-sm border-2 p-6"
						mainOptions={{ containScroll: 'keepSnaps', dragFree: true }}
					>
						<CarouselContent>
							{data.img_list.map((img, index) => (
								<CarouselItem key={`${img.id}-${index}`} className="w-fit basis-auto select-none">
									<Item<HTMLButtonElement>
										alt={img?.desc || `${mindscapeCinema?.name} ${index + 1}`}
										height="900"
										original={`${process.env.NEXT_PUBLIC_CORS_PROXY}?url=${img?.icon_url}`}
										width="1600"
									>
										{({ ref, open }) => (
											<button
												ref={ref}
												aria-label={img?.desc || `${mindscapeCinema?.name} ${index + 1}`}
												className="gallery-item w-full cursor-pointer"
												onClick={open}
											>
												<Image
													optimizeImg
													alt={img?.desc || `${mindscapeCinema?.name} ${index + 1}`}
													height={315}
													loading="lazy"
													src={img.icon_url}
													width={560}
													classNames={{
														wrapper: 'size-full aspect-video',
														img: 'size-full object-cover',
													}}
												/>
											</button>
										)}
									</Item>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="-left-1.5" />
						<CarouselNext className="-right-1.5" />
					</Carousel>
				</Gallery>
			) : null}
		</Box>
	);
}

export default MindscapeCinema;
