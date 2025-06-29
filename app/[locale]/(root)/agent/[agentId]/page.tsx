import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getAgentDetails } from '@/services/hakushin/api/agent';
import { LANGUAGES } from '@/constants/lang';
import { AGENTS_MAPPING } from '@/constants/mapping';
import ErrorToast from '@/components/features/error-toast';
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
			{agentDetail ? (
				'error' in agentDetail ? (
					<ErrorToast title={agentDetail.error || 'Error fetching agent details'} />
				) : (
					<AgentDetail
						agentId={agentId}
						attackType={agentDetail?.attackType}
						baseInfo={agentDetail?.baseInfo}
						className="px-6 pt-4 pb-8"
						codeName={agentDetail?.codeName}
						color={agentDetail?.customization?.color}
						description={agentDetail?.desc}
						faction={agentDetail?.faction}
						img={agentDetail?.img}
						name={agentDetail?.name}
						rarity={agentDetail?.rarity}
						specialty={agentDetail?.specialty}
						stat={agentDetail?.stat}
					/>
				)
			) : null}
		</>
	);
}

export default AgentDetailPage;
