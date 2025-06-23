import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getAgentDetails } from '@/services/hakushin/api/agent';
import { LANGUAGES } from '@/constants/lang';
import { AGENTS_MAPPING } from '@/constants/mapping';
import PageHeader from '@/components/features/page-header';
import AgentDetail from '@/components/pages/agent-detail';

async function AgentDetailPage({ params }: { params: Promise<{ agentId: string }> }) {
	const [locale, { agentId }, t] = await Promise.all([
		getLocale(),
		params,
		getTranslations('AgentsPage'),
	]);
	const isAgentIdExists = AGENTS_MAPPING.some((agent) => agent.id === Number(agentId));
	if (!isAgentIdExists) {
		notFound();
	}
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const agentDetail = await getAgentDetails({ langKey, id: agentId });
	return (
		<>
			<PageHeader title={t('agent')} />
			<AgentDetail
				agentId={agentId}
				className="px-6 pb-8"
				codeName={agentDetail?.codeName}
				description={agentDetail?.desc}
				img={agentDetail?.img}
				name={agentDetail?.name}
			/>
		</>
	);
}

export default AgentDetailPage;
