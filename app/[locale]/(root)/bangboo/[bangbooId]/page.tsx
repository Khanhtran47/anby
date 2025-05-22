import React from 'react';

async function Page({ params }: { params: Promise<{ bangbooId: string }> }) {
	const { bangbooId } = await params;
	return <div>Bangboo: {bangbooId}</div>;
}

export default Page;
