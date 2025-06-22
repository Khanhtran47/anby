'use client';

import React from 'react';

import { useRouter } from '@/i18n/navigation';
import { Dialog } from '@/components/ui/dialog';

import type { DialogProps } from '@/components/ui/dialog';

interface ModalRouteProps extends Omit<DialogProps, 'showDialog' | 'setShowDialog'> {}

function ModalRoute(props: ModalRouteProps) {
	const { children, contentHeight = 'full', contentWidth = '5xl', onClose, ...rest } = props;
	const [showDialog, setShowDialog] = React.useState(true);
	const router = useRouter();
	return (
		<Dialog
			contentHeight={contentHeight}
			contentWidth={contentWidth}
			setShowDialog={setShowDialog}
			showDialog={showDialog}
			onClose={() => {
				router.back();
				if (onClose) {
					onClose();
				}
			}}
			{...rest}
		>
			{children}
		</Dialog>
	);
}

export default ModalRoute;
