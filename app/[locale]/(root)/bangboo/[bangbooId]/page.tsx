import React from 'react';

import Development from '@/components/features/development';

async function BangbooDetailPage() {
	// { params }: { params: Promise<{ bangbooId: string }> }
	// const { bangbooId } = await params;
	return (
		<>
			<Development />
		</>
	);
}

export default BangbooDetailPage;
