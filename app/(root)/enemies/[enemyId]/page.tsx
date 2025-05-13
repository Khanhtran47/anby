import React from 'react';

async function Page({ params }: { params: Promise<{ enemyId: string }> }) {
	const { enemyId } = await params;
	return <div>Enemy: {enemyId}</div>;
}

export default Page;
