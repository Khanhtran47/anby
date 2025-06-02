import React from 'react';

import PageHeader from '@/components/features/page-header';

async function BangbooDetailPage({ params }: { params: Promise<{ bangbooId: string }> }) {
	const { bangbooId } = await params;
	return (
		<>
			<PageHeader title="Bangboo" />
			<div>Bangboo Id: {bangbooId}</div>
		</>
	);
}

export default BangbooDetailPage;
