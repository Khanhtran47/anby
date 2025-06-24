import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import { getListAgents } from '@/services/hakushin/api/agent';
import { getMenuFilters } from '@/services/hoyolab/api/menu-filters';
import { LANGUAGES } from '@/constants/lang';
import ErrorToast from '@/components/features/error-toast';
import MenuFilters from '@/components/features/menu-filters';
import PageHeader from '@/components/features/page-header';
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

async function ListAgentsPage(props: {
	searchParams: Promise<{
		filter_ids?: string;
	}>;
}) {
	const [locale, searchParams] = await Promise.all([getLocale(), props.searchParams]);
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const filterIds = searchParams?.filter_ids ? searchParams.filter_ids.split(',') : [];
	const agents = await getListAgents({ langKey, filters: filterIds });
	const menuFilters = await getMenuFilters({ langKey, menuId: 8 });
	const t = await getTranslations('AgentsPage');
	return (
		<>
			<PageHeader
				title={t('title')}
				rightContent={
					'error' in menuFilters ? (
						<ErrorToast title={menuFilters.error} />
					) : (
						<MenuFilters menuFilters={menuFilters} />
					)
				}
			/>
			{'error' in agents ? (
				<ErrorToast title={agents.error} />
			) : (
				<ListAgents
					key={`list-agents-${locale}-${filterIds.join('-')}`}
					infiniteScroll
					agents={agents}
					className="min-h-[850px]"
				/>
			)}
		</>
	);
}

export default ListAgentsPage;
