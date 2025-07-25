import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import { getListAgents } from '@/services/main/api/agent';
import { LANGUAGES } from '@/constants/lang';
import ErrorToast from '@/components/features/error-toast';
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

	return (
		<>
			{'error' in agents ? (
				<ErrorToast title={agents.error} />
			) : (
				<ListAgents
					key={`list-agents-${locale}-${filterIds.join('-')}`}
					infiniteScroll
					agents={agents}
					className="mt-14 min-h-[850px]"
				/>
			)}
		</>
	);
}

export default ListAgentsPage;
