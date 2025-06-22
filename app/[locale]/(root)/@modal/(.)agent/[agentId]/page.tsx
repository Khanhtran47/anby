import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import { getAgentDetails } from '@/services/hakushin/api/agent';
import { LANGUAGES } from '@/constants/lang';
import ModalRoute from '@/components/features/modal-route';
import AgentDetail from '@/components/pages/agent-detail';

async function AgentDetailModalPage({ params }: { params: Promise<{ agentId: string }> }) {
	const [locale, { agentId }, t] = await Promise.all([
		getLocale(),
		params,
		getTranslations('AgentsPage'),
	]);
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const agentDetail = await getAgentDetails({ langKey, id: agentId });
	return (
		<ModalRoute contentWidth="8xl" dialogTitle={t('agent')}>
			<AgentDetail agentId={agentId} name={agentDetail?.name} />
		</ModalRoute>
	);
}

export default AgentDetailModalPage;
