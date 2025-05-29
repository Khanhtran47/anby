import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getListBangboo } from '@/services/hakushin/api/bangboo';
import PageHeader from '@/components/features/page-header';
import { Image } from '@/components/ui/image';
import ListBangboos from '@/components/pages/list-bangboo';

import type { Locale } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
	const { locale } = await props.params;

	const t = await getTranslations({ locale, namespace: 'BangbooPage' });
	const tb = await getTranslations({ locale, namespace: 'Brand' });

	return {
		title: `${t('title')} | ${tb('name')}`,
		description: t('description'),
	};
}

async function ListBangbooPage() {
	const bangboos = await getListBangboo();
	const t = await getTranslations('BangbooPage');
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
			{!('error' in bangboos) ? (
				<ListBangboos bangboos={bangboos} className="min-h-[850px]" />
			) : null}
		</>
	);
}

export default ListBangbooPage;
