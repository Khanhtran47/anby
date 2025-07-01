'use client';

import { useMediaQuery } from '@react-hookz/web';
import { useTranslations } from 'next-intl';
import { lazily } from 'react-lazily';

import { defaultGetSrc } from '@/context/global-image-configs.context';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { AgentTalent } from '@/services/hakushin/models/agent';

const { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } = lazily(
	() => import('@/components/ui/carousel'),
);
const { Gallery, Item } = lazily(() => import('@/components/ui/gallery'));

function SkillTab(props: { agentTalent?: AgentTalent }) {
	const { agentTalent } = props;

	const t = useTranslations('AgentDetail');
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
	return (
		<Gallery downloadButton rotateButton withCaption>
			<Tabs className="w-full" defaultValue={agentTalent?.data?.[0]?.title || ''}>
				<TabsList className="w-full justify-start">
					<Carousel
						className="w-full px-9"
						mainOptions={{ containScroll: 'keepSnaps', dragFree: true }}
					>
						<CarouselContent>
							{agentTalent?.data && agentTalent.data.length > 0 ? (
								agentTalent.data.map((skill) => (
									<CarouselItem
										key={`trigger-${skill?.title}`}
										className="w-fit basis-auto select-none"
									>
										<TabsTrigger value={skill?.title || ''}>
											{skill?.icon_url ? (
												<Image
													disableSkeleton
													optimizeImg
													alt={`Skill Icon ${skill?.title || ''}`}
													height={32}
													radius="none"
													src={skill?.icon_url}
													width={32}
													classNames={{
														wrapper: 'size-8 mr-2',
														img: 'size-full object-cover',
													}}
												/>
											) : null}
											<span className="s5 !font-black !text-shadow-none">{skill?.title || ''}</span>
										</TabsTrigger>
									</CarouselItem>
								))
							) : (
								<TabsTrigger className="s7 text-muted-foreground" value="no-skills">
									{t('noSkills')}
								</TabsTrigger>
							)}
						</CarouselContent>
						<CarouselPrevious className="-left-1.5" />
						<CarouselNext className="-right-1.5" />
					</Carousel>
				</TabsList>
				{agentTalent?.data && agentTalent.data.length > 0 ? (
					agentTalent.data.map((skill) => (
						<TabsContent
							key={`content-${skill?.title}`}
							forceMount
							className="z-10 flex w-full flex-col gap-3"
							value={skill?.title || ''}
						>
							{skill?.children && skill.children.length > 0
								? skill.children.map((child, index) => (
										<Box
											key={`${child?.title}-${index}`}
											fullWidth
											className="gap-3"
											size="lg"
											title={child?.title || 'N/A'}
										>
											<div className="flex w-full flex-col gap-3 sm:flex-row">
												{child?.img ? (
													<Item<HTMLButtonElement>
														alt={`Skill Demo for ${child?.title}`}
														height="900"
														original={`${process.env.NEXT_PUBLIC_CORS_PROXY}?url=${child?.img}`}
														thumbnail={`${process.env.NEXT_PUBLIC_CORS_PROXY}?url=${child?.img}`}
														width="1600"
														caption={`
																		<span class="s7 not-prose text-foreground">
																		${child?.title}
																		</span>
																		${
																			isSm
																				? ''
																				: child?.talent_imgs?.[0] &&
																					  child?.talent_imgs?.[0].description
																					? `
																						<p class="!hidden sm:block s4 not-prose text-muted-foreground">
																						${child?.talent_imgs[0].description}
																						</p>
																					`
																					: `
																						<div class="hidden sm:block s4 not-prose text-muted-foreground [&>p]:!m-0">
																						${child?.desc || ''}
																						</div>
																					`
																		}
																	`}
													>
														{({ ref, open }) => (
															<button
																ref={ref}
																aria-label={`Skill Demo for ${child?.title}`}
																className="h-fit min-w-full cursor-pointer sm:min-w-1/2"
																type="button"
																onClick={open}
															>
																<Image
																	addCorsProxy
																	optimizeImg
																	alt={`Skill Demo for ${child?.title}`}
																	height={180}
																	loading="lazy"
																	src={child?.img}
																	width={320}
																	classNames={{
																		wrapper: 'w-full aspect-video',
																		img: 'size-full object-contain',
																	}}
																	optimizeOptions={{
																		n: '-1',
																		default: defaultGetSrc({
																			src: `${process.env.NEXT_PUBLIC_CORS_PROXY}?url=${child?.img}`,
																			width: 320,
																			height: 180,
																			format: 'webp',
																			optimizerEndpoint:
																				process.env.NEXT_PUBLIC_OPTIMIZE_IMAGES_ENDPOINT || '',
																			otherParams: { n: '300' },
																		}),
																	}}
																/>
															</button>
														)}
													</Item>
												) : null}
												{child?.desc ? (
													<div
														className="min-w-1/2 grow"
														dangerouslySetInnerHTML={{
															__html: child.desc,
														}}
													/>
												) : null}
											</div>
										</Box>
									))
								: null}
						</TabsContent>
					))
				) : (
					<TabsContent
						forceMount
						className="z-10 mt-0 flex w-full flex-col gap-3"
						value="no-skills"
					>
						<span className="s7 text-muted-foreground">{t('noSkillsDescription')}</span>
					</TabsContent>
				)}
			</Tabs>
		</Gallery>
	);
}

export default SkillTab;
