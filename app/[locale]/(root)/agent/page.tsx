import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getListAgents } from '@/services/hakushin/api/agent';
import PageHeader from '@/components/features/page-header';
import AgentCard from '@/components/ui/card/agent-card';
import { Image } from '@/components/ui/image';

import type { Locale } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
	const { locale } = await props.params;

	const t = await getTranslations({ locale, namespace: 'AgentsPage' });
	const tb = await getTranslations({ locale, namespace: 'Brand' });

	return {
		title: `${t('title')} | ${tb('name')}`,
		description: t('description'),
	};
}

async function ListAgentsPage() {
	const agents = await getListAgents();
	const t = await getTranslations('AgentsPage');
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
			{!('error' in agents) ? (
				<section className="max-w-screen-4xl mx-auto flex min-h-[850px] w-full flex-col items-center py-2 pr-4 pl-2">
					<div className="relative my-5 grid min-h-[300px] w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch justify-items-center lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:px-10">
						{agents?.map((agent) => (
							<AgentCard
								key={agent.id}
								faction={agent.faction}
								id={agent.id}
								img={agent.img}
								name={agent.code}
								rarity={agent.rarity}
								specialty={agent.specialty}
								spStat={agent.spStat}
								stat={agent.stat}
							/>
						))}
					</div>
				</section>
			) : null}
		</>
	);
}

export default ListAgentsPage;
