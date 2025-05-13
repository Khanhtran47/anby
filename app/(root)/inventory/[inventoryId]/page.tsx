import React from 'react';

async function Page({ params }: { params: Promise<{ inventoryId: string }> }) {
	const { inventoryId } = await params;
	return <div>Inventory: {inventoryId}</div>;
}

export default Page;
