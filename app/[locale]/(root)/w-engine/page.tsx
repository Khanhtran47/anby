import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getListWEngine } from '@/services/hakushin/api/w-engine';
import PageHeader from '@/components/features/page-header';
import WEngineCard from '@/components/ui/card/w-engine-card';
import { Image } from '@/components/ui/image';

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
				<section className="max-w-screen-4xl mx-auto flex min-h-[850px] w-full flex-col items-center py-2 pr-4 pl-2">
					<div className="relative my-5 grid min-h-[300px] w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(125px,1fr))] items-stretch justify-items-center gap-3 lg:px-10">
						{wEngines?.map((wEngine) => (
							<WEngineCard
								key={wEngine.id}
								id={wEngine.id}
								img={wEngine.icon}
								name={wEngine.code}
								rarity={wEngine.rarity}
								specialty={wEngine.specialty}
							/>
						))}
					</div>
				</section>
			) : null}
		</>
	);
}

export default ListWEnginePage;
