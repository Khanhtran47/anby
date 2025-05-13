import React from 'react';

async function Page({ params }: { params: Promise<{ driveDiscId: string }> }) {
	const { driveDiscId } = await params;
	return <div>Drive Disc: {driveDiscId}</div>;
}

export default Page;
