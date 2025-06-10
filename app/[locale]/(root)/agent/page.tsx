import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import { getListAgents } from '@/services/hakushin/api/agent';
import { LANGUAGES } from '@/constants/lang';
import PageHeader from '@/components/features/page-header';
import { Image } from '@/components/ui/image';
import { ListAgents } from '@/components/pages/list-agents';

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
	const locale = await getLocale();
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const agents = await getListAgents({ langKey });
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
			{!('error' in agents) ? <ListAgents agents={agents.items} className="min-h-[850px]" /> : null}
		</>
	);
}

export default ListAgentsPage;
