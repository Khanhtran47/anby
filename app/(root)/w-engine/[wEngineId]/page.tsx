import React from 'react';

async function Page({ params }: { params: Promise<{ wEngineId: string }> }) {
	const { wEngineId } = await params;
	return <div>W-Engine: {wEngineId}</div>;
}

export default Page;
