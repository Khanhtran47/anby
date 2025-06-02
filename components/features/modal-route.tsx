'use client';

import React from 'react';

import { useRouter } from '@/i18n/navigation';
import { Dialog } from '@/components/ui/dialog';

function ModalRoute({ children }: { children: React.ReactNode }) {
	const [showDialog, setShowDialog] = React.useState(true);
	const router = useRouter();
	return (
		<Dialog
			contentHeight="full"
			contentWidth="5xl"
			dialogTitle="Agent"
			setShowDialog={setShowDialog}
			showDialog={showDialog}
			onClose={() => router.back()}
		>
			{children}
		</Dialog>
	);
}

export default ModalRoute;
