import React from 'react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { getSearchZZZWallhaven } from '@/services/wallhaven/search';
import { SHORTCUTS } from '@/constants/shortcuts';
import PageHeader from '@/components/features/page-header';
import ServerResetTimeCountdown from '@/components/features/server-reset-countdown';
import WallpaperCarousel from '@/components/features/wallpaper-carousel';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';

async function Page() {
	const search = await getSearchZZZWallhaven();
	const t = await getTranslations('HomePage');
	const ts = await getTranslations('SidebarMenu');
	return (
		<>
			<PageHeader
				title={t('title')}
				rightContent={
					<Image
						optimizeImg
						height={27}
						radius="none"
						src="https://anby.trandk.live/assets/images/zzz-logo-horizontal.png"
						width={100}
						classNames={{
							wrapper: 'w-[100px] h-[27px]',
							img: 'size-full',
						}}
					/>
				}
			/>
			<div className="grid grid-cols-1 gap-3 p-4 lg:grid-cols-2">
				<div className="grid gap-3">
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
						className="flex-wrap items-start gap-6"
						radius="md"
						size="lg"
						title={t('shortcuts')}
					>
						{SHORTCUTS.navMain.map((item) => (
							<Link
								key={item.title}
								className="hover:[&>span]:text-foreground/80 flex items-center gap-1"
								href={item.url}
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
				<div className="grid gap-3">
					<WallpaperCarousel search={search} />
					<Box
						fullWidth
						showBgCorner
						className="flex-col items-start"
						radius="md"
						size="lg"
						title={'nnn'}
					/>
				</div>
			</div>
		</>
	);
}

export default Page;
