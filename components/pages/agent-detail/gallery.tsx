'use client';

import React from 'react';
import { useMediaQuery } from '@react-hookz/web';
import { lazily } from 'react-lazily';

import { defaultGetSrc } from '@/context/global-image-configs.context';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { Gallery as GalleryType } from '@/services/main/models/agent';

const { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } = lazily(
	() => import('@/components/ui/carousel'),
);
const { Gallery: ImageGallery, Item } = lazily(() => import('@/components/ui/gallery'));

function Gallery(props: { gallery?: GalleryType }) {
	const { gallery } = props;
	const { data, name } = gallery || {};
	const isXl = useMediaQuery('(max-width: 1280px)', { initializeWithValue: false });

	if (!data || !data.list || data.list.length === 0) {
		return null;
	}
	return (
		<ImageGallery downloadButton rotateButton withCaption>
			<Box
				fullWidth
				showBgCorner
				showDecorImgs
				className="z-10"
				radius="lg"
				size={isXl ? 'sm' : 'lg'}
				title={name}
			>
				<div className="mt-8 flex size-full flex-col gap-5 divide-solid xl:flex-row xl:gap-3">
					<Tabs className="w-full" defaultValue={data?.list?.[0]?.id || 'image-0'}>
						<TabsList className="w-full justify-start">
							<Carousel
								className="w-full px-9"
								mainOptions={{ containScroll: 'keepSnaps', dragFree: true }}
							>
								<CarouselContent>
									{data?.list && data?.list.length > 0
										? data?.list.map((item, index) => (
												<CarouselItem
													key={`trigger-${item?.id || item?.key}`}
													className="w-fit basis-auto select-none"
												>
													<TabsTrigger value={item?.id || `image-${index}` || ''}>
														<span className="s5 !font-black !text-shadow-none">
															{item?.key || ''}
														</span>
													</TabsTrigger>
												</CarouselItem>
											))
										: null}
								</CarouselContent>
								<CarouselPrevious className="-left-1.5" />
								<CarouselNext className="-right-1.5" />
							</Carousel>
						</TabsList>
						{data?.list && data?.list.length > 0
							? data?.list.map((item, index) => (
									<TabsContent
										key={`content-${item?.id || item?.key}`}
										forceMount
										className="flex w-full justify-center"
										value={item?.id || `image-${index}` || ''}
									>
										{item?.img ? (
											<Item<HTMLButtonElement>
												alt={item?.imgDesc || item?.key}
												height="900"
												original={`${process.env.NEXT_PUBLIC_CORS_PROXY}?url=${item?.img}`}
												thumbnail={`${process.env.NEXT_PUBLIC_CORS_PROXY}?url=${item?.img}`}
												width="1600"
												caption={`
                          <span class="s7 not-prose text-foreground">
                            ${item?.key || ''}
                          </span>
                          ${
														item?.imgDesc
															? `
                                <div class="hidden xl:block s4 not-prose text-muted-foreground [&>p]:!m-0">
                                ${item?.imgDesc || ''}
                                </div>
                              `
															: ''
													}
                        `}
											>
												{({ ref, open }) => (
													<button
														ref={ref}
														aria-label={item?.imgDesc || item?.key}
														className="gallery-item flex h-fit w-fit cursor-pointer flex-col items-center justify-center"
														type="button"
														onClick={open}
													>
														<Image
															addCorsProxy
															optimizeImg
															alt={item?.imgDesc || item?.key}
															fit="contain"
															height={isXl ? 192 : 500}
															loading="lazy"
															src={item?.img}
															width={isXl ? 192 : 500}
															classNames={{
																wrapper: 'w-48 xl:w-[500px] aspect-square',
																img: 'size-full object-contain',
															}}
															{...(item?.img && item?.img.includes('gif')
																? {
																		optimizeOptions: {
																			n: '-1',
																			default: defaultGetSrc({
																				src: `${process.env.NEXT_PUBLIC_CORS_PROXY}?url=${item?.img}`,
																				width: 500,
																				height: 500,
																				fit: 'contain',
																				format: 'webp',
																				optimizerEndpoint:
																					process.env.NEXT_PUBLIC_OPTIMIZE_IMAGES_ENDPOINT || '',
																				otherParams: { n: '200' },
																			}),
																		},
																	}
																: {})}
														/>
														<div
															className="mt-5 mb-3 [&>p]:!mt-0"
															dangerouslySetInnerHTML={{
																__html: item?.imgDesc || '',
															}}
														/>
													</button>
												)}
											</Item>
										) : null}
									</TabsContent>
								))
							: null}
					</Tabs>
					<Separator
						className="w-auto xl:h-auto xl:w-0.5"
						orientation={isXl ? 'horizontal' : 'vertical'}
					/>
					{data?.pic ? (
						<div className="mt-2 flex flex-col items-center gap-4 px-4 xl:items-start">
							<span className="not-prose s8 !font-black">Card</span>
							<Item<HTMLButtonElement>
								alt="Card"
								caption={undefined}
								height="900"
								original={`${process.env.NEXT_PUBLIC_CORS_PROXY}?url=${data?.pic}`}
								thumbnail={`${process.env.NEXT_PUBLIC_CORS_PROXY}?url=${data?.pic}`}
								width="1600"
							>
								{({ ref, open }) => (
									<button
										ref={ref}
										aria-label="Card"
										className="size-fit cursor-pointer"
										type="button"
										onClick={open}
									>
										<Image
											optimizeImg
											alt="Card"
											fit="cover"
											height={isXl ? 320 : 512}
											loading="lazy"
											src={data?.pic}
											width={isXl ? 160 : 256}
											classNames={{
												wrapper: 'w-40 xl:w-64 shrink-0 aspect-[1/2]',
												img: 'size-full object-cover',
											}}
										/>
									</button>
								)}
							</Item>
						</div>
					) : null}
				</div>
			</Box>
		</ImageGallery>
	);
}

export default Gallery;
