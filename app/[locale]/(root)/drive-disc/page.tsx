import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getListDriveDisc } from '@/services/hakushin/api/drive-disc';
import ErrorToast from '@/components/features/error-toast';
import PageHeader from '@/components/features/page-header';
import { Image } from '@/components/ui/image';
import { ListDriveDisc } from '@/components/pages/list-drive-disc';

import type { Locale } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
	const { locale } = await props.params;

	const t = await getTranslations({ locale, namespace: 'DriveDiscPage' });
	const tb = await getTranslations({ locale, namespace: 'Brand' });

	return {
		title: `${t('title')} | ${tb('name')}`,
		description: t('description'),
	};
}

async function DriveDiscPage() {
	const t = await getTranslations('DriveDiscPage');
	const driveDiscs = await getListDriveDisc();
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
			{'error' in driveDiscs ? (
				<ErrorToast title={driveDiscs.error} />
			) : (
				<ListDriveDisc className="min-h-[850px]" driveDiscs={driveDiscs} />
			)}
		</>
	);
}

export default DriveDiscPage;
