import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getListBangboo } from '@/services/hakushin/api/bangboo';
import PageTitle from '@/components/features/page-title';
import BangbooCard from '@/components/ui/card/bangboo-card';
import { Image } from '@/components/ui/image';

async function ListBangbooPage() {
	const bangboos = await getListBangboo();
	const t = await getTranslations('BangbooPage');
	return (
		<>
			<PageTitle
				title={t('pageTitle')}
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
				<section className="max-w-screen-4xl mx-auto flex min-h-[850px] w-full flex-col items-center">
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
