import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getListWEngine } from '@/services/hakushin/api/w-engine';
import PageHeader from '@/components/features/page-header';
import { Image } from '@/components/ui/image';
import ListWEngines from '@/components/pages/list-w-engine';

import type { Locale } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
	const { locale } = await props.params;

	const t = await getTranslations({ locale, namespace: 'WEnginePage' });
	const tb = await getTranslations({ locale, namespace: 'Brand' });

	return {
		title: `${t('title')} | ${tb('name')}`,
		description: t('description'),
	};
}

async function ListWEnginePage() {
	const wEngines = await getListWEngine();
	const t = await getTranslations('WEnginePage');
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
			{!('error' in wEngines) ? (
				<ListWEngines className="min-h-[850px]" wEngines={wEngines} />
			) : null}
		</>
	);
}

export default ListWEnginePage;
