import React from 'react';

import ModalRoute from '@/components/features/modal-route';

async function WEngineDetailModalPage({ params }: { params: Promise<{ wEngineId: string }> }) {
	const { wEngineId } = await params;
	return (
		<ModalRoute development dialogTitle="W-Engine">
			<div>W-Engine Id: {wEngineId}</div>
		</ModalRoute>
	);
}

export default WEngineDetailModalPage;
