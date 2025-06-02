import React from 'react';

import ModalRoute from '@/components/features/modal-route';

async function AgentDetailModalPage({ params }: { params: Promise<{ agentId: string }> }) {
	const { agentId } = await params;
	return (
		<ModalRoute>
			<div>Agent Id: {agentId}</div>
		</ModalRoute>
	);
}

export default AgentDetailModalPage;
