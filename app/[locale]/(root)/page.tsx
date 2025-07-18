import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/link';
import { SHORTCUTS } from '@/constants/shortcuts';
import ServerResetTimeCountdown from '@/components/features/server-reset-countdown';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import GameRecord from '@/components/pages/home/game-record';
import News from '@/components/pages/home/news';
import Videos from '@/components/pages/home/videos';
import Wallpaper from '@/components/pages/home/wallpaper';

async function Page() {
	const t = await getTranslations('HomePage');
	const ts = await getTranslations('SidebarMenu');
	return (
		<div className="3xl:grid-cols-3 mt-14 grid grid-cols-1 gap-3 p-4 lg:grid-cols-2">
			<div className="flex flex-col gap-3">
				<Box
					fullWidth
					showBgCorner
					className="flex-col items-start"
					radius="md"
					size="lg"
					title={t('projectAnby')}
				>
					<p className="s4 text-justify">{t('introDescription')}</p>
				</Box>
				<ServerResetTimeCountdown />
				<Box
					fullWidth
					showBgCorner
					className="flex-row flex-wrap items-start gap-6"
					radius="md"
					size="lg"
					title={t('shortcuts')}
				>
					{SHORTCUTS.navMain.map((item) => (
						<Link
							key={item.title}
							className="hover:[&>span]:text-foreground/80 flex items-center gap-1"
							href={item.url}
							isExternal={item.isExternal}
						>
							{item.image ? (
								<Image
									optimizeImg
									alt={ts(item.title)}
									fit="cover"
									height={32}
									src={item.image}
									width={32}
									classNames={{
										wrapper: 'w-8 aspect-square',
										img: 'size-full object-cover',
									}}
								/>
							) : null}
							<span>{ts(item.title)}</span>
						</Link>
					))}
				</Box>
			</div>
			<div className="flex flex-col gap-3">
				<Box
					fullWidth
					showBgCorner
					className="flex-col items-start gap-4 pl-0"
					classNames={{ titleWrapper: 'ml-4' }}
					radius="md"
					size="lg"
					title={t('news')}
				>
					<Suspense
						fallback={
							<Skeleton className="bg-muted-foreground ml-4 aspect-video w-[calc(100%-1rem)]" />
						}
					>
						<News />
					</Suspense>
				</Box>
				<GameRecord />
			</div>
			<div className="flex flex-col gap-3">
				<Box
					fullWidth
					className="flex-col items-start pl-0"
					radius="md"
					showDecorImgs={false}
					size="lg"
				>
					<Suspense
						fallback={
							<Skeleton className="bg-muted-foreground ml-4 aspect-video w-[calc(100%-1rem)]" />
						}
					>
						<Wallpaper />
					</Suspense>
				</Box>
				<Box
					fullWidth
					showBgCorner
					className="flex-col items-start gap-4 pl-0"
					classNames={{ titleWrapper: 'ml-4' }}
					radius="md"
					size="lg"
					title={t('videoCollection')}
				>
					<Suspense
						fallback={
							<div className="mt-3 ml-4 flex w-[calc(100%-1rem)] flex-col gap-y-3">
								<Skeleton className="bg-muted-foreground h-12 w-full" />
								<Skeleton className="bg-muted-foreground aspect-video w-full" />
								<Skeleton className="bg-muted-foreground aspect-[5/1] w-full" />
							</div>
						}
					>
						<Videos />
					</Suspense>
				</Box>
			</div>
		</div>
	);
}

export default Page;
