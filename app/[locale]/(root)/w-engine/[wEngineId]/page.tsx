import React from 'react';

import PageHeader from '@/components/features/page-header';

async function WEngineDetailPage({ params }: { params: Promise<{ wEngineId: string }> }) {
	const { wEngineId } = await params;
	return (
		<>
			<PageHeader title="W-Engine" />
			<div>W-Engine Id: {wEngineId}</div>
		</>
	);
}

export default WEngineDetailPage;
