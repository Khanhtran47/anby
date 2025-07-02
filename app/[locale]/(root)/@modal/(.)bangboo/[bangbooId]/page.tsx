import React from 'react';

import ModalRoute from '@/components/features/modal-route';

async function BangbooDetailModalPage({ params }: { params: Promise<{ bangbooId: string }> }) {
	const { bangbooId } = await params;
	return (
		<ModalRoute development dialogTitle="Bangboo">
			<div>Bangboo Id: {bangbooId}</div>
		</ModalRoute>
	);
}

export default BangbooDetailModalPage;
