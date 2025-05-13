import React from 'react';

async function Page({ params }: { params: Promise<{ agentId: string }> }) {
	const { agentId } = await params;
	return <div>Agent: {agentId}</div>;
}

export default Page;
