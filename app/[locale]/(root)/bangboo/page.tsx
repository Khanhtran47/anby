import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getListBangboo } from '@/services/hakushin/api/bangboo';
import PageHeader from '@/components/features/page-header';
import BangbooCard from '@/components/ui/card/bangboo-card';
import { Image } from '@/components/ui/image';

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
				<section className="max-w-screen-4xl mx-auto flex min-h-[850px] w-full flex-col items-center py-2 pr-4 pl-2">
					<div className="relative my-5 grid min-h-[300px] w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(125px,1fr))] items-stretch justify-items-center gap-3 lg:px-10">
						{bangboos?.map((bangboo) => (
							<BangbooCard
								key={bangboo.id}
								id={bangboo.id}
								img={bangboo.icon}
								name={bangboo.code}
								rarity={bangboo.rarity}
							/>
						))}
					</div>
				</section>
			) : null}
		</>
	);
}

export default ListBangbooPage;
