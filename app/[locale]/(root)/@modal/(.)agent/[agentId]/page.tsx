import React from 'react';
import { getLocale } from 'next-intl/server';

import { getAgentDetails } from '@/services/hakushin/api/agent';
import { LANGUAGES } from '@/constants/lang';
import ModalRoute from '@/components/features/modal-route';

async function AgentDetailModalPage({ params }: { params: Promise<{ agentId: string }> }) {
	const { agentId } = await params;
	const locale = await getLocale();
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const agentDetail = await getAgentDetails({ langKey, id: agentId });
	return (
		<ModalRoute contentWidth="8xl" dialogTitle="Agent">
			<div>{agentDetail?.name}</div>
		</ModalRoute>
	);
}

export default AgentDetailModalPage;
