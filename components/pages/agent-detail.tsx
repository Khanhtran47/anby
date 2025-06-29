'use client';

import { Fragment } from 'react';
import { useMediaQuery } from '@react-hookz/web';
import { useTranslations } from 'next-intl';
import { lazily } from 'react-lazily';

import { Link } from '@/i18n/link';
import { cn } from '@/utils/common/misc';
import { defaultGetSrc } from '@/context/global-image-configs.context';
import { AGENTS_MAPPING } from '@/constants/mapping';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { ItemCard } from '@/components/ui/card/item-card';
import { Image } from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { AgentTalent, BaseInfo, FilterValue } from '@/services/hakushin/models/agent';

const { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } = lazily(
	() => import('@/components/ui/carousel'),
);

interface AgentDetailProps {
	agentId: string;
	name?: string;
	description?: string;
	img?: string;
	codeName?: string;
	className?: string;
	faction?: FilterValue[];
	attackType?: FilterValue[];
	rarity?: FilterValue;
	specialty?: FilterValue[];
	stat?: FilterValue[];
	baseInfo?: BaseInfo;
	color?: string;
	agentTalent?: AgentTalent;
}

function AgentDetail(props: AgentDetailProps) {
	const {
		// agentId,
		name,
		description,
		img,
		codeName,
		className,
		faction,
		// attackType,
		rarity,
		specialty,
		stat,
		baseInfo,
		agentTalent,
	} = props;

	const t = useTranslations('AgentDetail');
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });

	const getHref = ({ id, type }: { id: number; type: string }) => {
		if (type === 'agent') {
			const agentId = AGENTS_MAPPING.find((agent) => agent.hoyoId === id.toString());
			if (agentId) {
				return `/agent/${agentId.id}`;
			} else {
				return undefined;
			}
			// TODO: Support for w-engine and bangboo
		} else {
			return undefined;
		}
	};

	return (
		<div className={cn('w-full', className)}>
			<Tabs className="relative flex w-full flex-col gap-3 sm:flex-row" defaultValue="general">
				<div className="sticky top-0 h-fit w-full sm:w-1/2">
					<Image
						disableSkeleton
						optimizeImg
						alt={name || 'Agent Image'}
						height={750}
						src={img}
						width={750}
						classNames={{
							wrapper: 'w-full aspect-square relative',
							img: 'size-full object-cover',
						}}
					/>
					{rarity?.icon && isSm !== undefined ? (
						<Image
							optimizeImg
							alt={rarity?.value}
							height={isSm ? 32 : 64}
							radius="none"
							src={rarity.icon}
							width={isSm ? 32 : 64}
							classNames={{
								wrapper: 'size-8 sm:size-16 absolute top-0 left-0 z-10',
								img: 'size-full object-cover',
							}}
						/>
					) : null}
				</div>
				<TabsList className="z-20 h-16 w-full sm:absolute sm:right-0 sm:bottom-4 sm:w-1/2">
					{['general', 'skills', 'builds'].map((tab) => (
						<TabsTrigger
							key={tab}
							className="s7 h-12 w-1/3 !font-black !tracking-normal italic !text-shadow-none"
							value={tab}
						>
							{t(tab)}
						</TabsTrigger>
					))}
				</TabsList>
				<TabsContent
					forceMount
					className="z-10 mt-0 flex w-full flex-col gap-3 sm:w-1/2 sm:pb-24"
					value="general"
				>
					<Box fullWidth className="items-start" radius="lg" showDecorImgs={false} size="sm">
						<span className="not-prose s4 text-primary-foreground ml-4 !font-black sm:ml-6">
							AGENT INFO
						</span>
						<div className="bg-background relative mt-1 flex min-h-48 w-full justify-between overflow-hidden rounded-sm px-4 py-4 sm:px-6">
							{faction && faction[0] && faction[0]?.icon ? (
								<>
									<div className="from-background to-muted/90 absolute top-0 left-0 z-10 size-full bg-gradient-to-r" />
									<div className="absolute top-0 left-0 flex h-full w-full justify-end">
										<Image
											optimizeImg
											alt={`Faction Icon ${faction[0].value}`}
											height={160}
											src={faction[0].icon}
											width={160}
											classNames={{
												wrapper: 'aspect-square h-full scale-[3]',
												img: 'size-full object-cover',
											}}
										/>
									</div>
								</>
							) : null}
							<div className="z-20 flex flex-col">
								{faction && faction.length > 0 ? (
									<span className="not-prose s7 mb-4 !font-black opacity-80">
										{faction[0].value}
									</span>
								) : null}
								<h1 className="mb-2 !font-black">{name}</h1>
								{codeName ? (
									<span className="text-muted-foreground not-prose s5 !font-black !tracking-widest">
										{codeName}
									</span>
								) : null}
							</div>
							{faction && faction[0] && faction[0]?.icon && !isSm ? (
								<Image
									optimizeImg
									alt={`Faction Icon ${faction[0].value}`}
									height={160}
									src={faction[0].icon}
									width={160}
									classNames={{
										wrapper: 'aspect-square h-full z-20',
										img: 'size-full object-cover',
									}}
								/>
							) : null}
						</div>
						<div className="mt-5 flex w-full flex-col gap-4 px-0 sm:flex-row sm:px-4">
							<div className="w-full sm:w-1/2"></div>
							<div className="bg-background border-background flex h-16 w-full flex-nowrap items-center gap-5 overflow-hidden rounded-full border-[6px] sm:w-1/2 sm:gap-[6.8%]">
								{stat && stat[0] ? (
									<Button
										asChild
										className="bg-muted hover:bg-accent h-full w-1/2 scale-110 -skew-x-[30deg] rounded-none px-0"
										showBgPattern={false}
										size="lg"
										variant="ghost"
									>
										<Link
											isExternal
											className="active:text-foreground flex items-center justify-center"
											href={`/agent?filter_ids=${stat[0].id}`}
										>
											<Image
												optimizeImg
												alt={`Stat Icon ${stat[0].value}`}
												height={24}
												radius="none"
												src={stat[0].icon}
												width={24}
												classNames={{
													wrapper: 'size-6 skew-x-[30deg] shrink-0 ml-4',
													img: 'size-full object-cover',
												}}
											/>
											<span className="not-prose s5 mr-3 skew-x-[30deg] text-center !font-extrabold whitespace-pre-line opacity-80">
												{stat[0].value}
											</span>
										</Link>
									</Button>
								) : null}
								{specialty && specialty[0] ? (
									<Button
										asChild
										className="bg-muted hover:bg-accent h-full w-1/2 scale-110 -skew-x-[30deg] rounded-none px-0"
										showBgPattern={false}
										size="lg"
										variant="ghost"
									>
										<Link
											isExternal
											className="active:text-foreground flex items-center justify-center"
											href={`/agent?filter_ids=${specialty[0].id}`}
										>
											<Image
												optimizeImg
												alt={`Specialty Icon ${specialty[0].value}`}
												height={24}
												radius="none"
												src={specialty[0].icon}
												width={24}
												classNames={{
													wrapper: 'size-6 skew-x-[30deg] shrink-0',
													img: 'size-full object-cover',
												}}
											/>
											<span className="not-prose s5 skew-x-[30deg] text-center !font-extrabold whitespace-pre-line opacity-80">
												{specialty[0].value}
											</span>
										</Link>
									</Button>
								) : null}
							</div>
						</div>
					</Box>
					{description ? (
						<Box fullWidth showBgCorner radius="lg" showDecorImgs={false}>
							<div
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							/>
						</Box>
					) : null}
				</TabsContent>
				<TabsContent
					forceMount
					className="z-10 mt-0 flex w-full flex-col gap-3 sm:w-1/2 sm:pb-24"
					value="skills"
				>
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
													<span className="s5 !font-black !text-shadow-none">
														{skill?.title || ''}
													</span>
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
										? skill.children.map((child) => (
												<Box
													key={child.title}
													fullWidth
													className="gap-3"
													size="lg"
													title={child.title}
												>
													<div className="flex w-full flex-col gap-3 sm:flex-row">
														{child?.img ? (
															<Image
																addCorsProxy
																optimizeImg
																alt={`Skill Demo for ${child.title}`}
																height={180}
																loading="lazy"
																src={child?.img}
																width={320}
																classNames={{
																	wrapper: 'min-w-full sm:min-w-1/2 aspect-video h-fit',
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
				</TabsContent>
				<TabsContent
					forceMount
					className="z-10 mt-0 flex w-full flex-col gap-3 sm:w-1/2 sm:pb-24"
					value="builds"
				></TabsContent>
			</Tabs>
			<Box
				fullWidth
				showBgCorner
				showDecorImgs
				className="z-10"
				radius="lg"
				size="lg"
				title={baseInfo?.name}
			>
				<div className="flex flex-col flex-wrap gap-y-3 py-3 sm:flex-row">
					{baseInfo?.data && baseInfo.data.length > 0
						? baseInfo.data.map((item) => (
								<div
									key={item.id}
									className="border-border flex w-full flex-wrap items-center gap-y-3 border-b pb-3 sm:w-1/2"
								>
									<span className="s7 text-muted-foreground w-48 !font-bold whitespace-pre-line">
										{item.key}
									</span>
									{item.value ? (
										item.isMaterial ? (
											item.value.length > 0 ? (
												<div className="flex flex-wrap gap-3">
													{item.value.map((val, index) => (
														<Fragment key={index}>
															{typeof val === 'object' ? (
																val.icon && val.menuId ? (
																	<ItemCard
																		isExternalLink
																		classNames={{ text: 's1' }}
																		direction="col"
																		href={getHref({ id: val.ep_id, type: val.menuId })}
																		img={val.icon}
																		name={val.name}
																		title={val.name}
																		className={cn(
																			'w-24 p-1',
																			val.menuId === 'agent' ? '' : 'cursor-default',
																		)}
																	/>
																) : (
																	<span>
																		{val.name}
																		{index < (item.value?.length ?? 0) - 1 ? ', ' : ''}
																	</span>
																)
															) : null}
														</Fragment>
													))}
												</div>
											) : (
												<span className="text-muted-foreground">-</span>
											)
										) : (
											<div
												dangerouslySetInnerHTML={{
													__html: item.value,
												}}
											/>
										)
									) : null}
								</div>
							))
						: null}
				</div>
			</Box>
		</div>
	);
}

export default AgentDetail;
