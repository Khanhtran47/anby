import React from 'react';

import PageHeader from '@/components/features/page-header';

async function AgentDetailPage({ params }: { params: Promise<{ agentId: string }> }) {
	const { agentId } = await params;
	return (
		<>
			<PageHeader title="Agent" />
			<div>Agent Id: {agentId}</div>
		</>
	);
}

export default AgentDetailPage;
