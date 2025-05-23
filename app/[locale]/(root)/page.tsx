import React from 'react';
import { useTranslations } from 'next-intl';

import PageTitle from '@/components/features/page-title';
import ServerResetTimeCountdown from '@/components/features/server-reset-countdown';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';

function Page() {
	const t = useTranslations('HomePage');
	return (
		<>
			<PageTitle
				title={t('pageTitle')}
				rightContent={
					<Image
						height={27}
						radius="none"
						src="/assets/images/zzz-logo-horizontal.png"
						width={100}
						classNames={{
							wrapper: 'w-[100px] h-[27px]',
							img: 'size-full',
						}}
					/>
				}
			/>
			<div className="grid grid-cols-1 gap-3 py-4 pl-2 lg:grid-cols-2">
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
				</div>
				<div className="grid gap-3"></div>
			</div>
		</>
	);
}

export default Page;
