import React from 'react';

import ModalRoute from '@/components/features/modal-route';

async function SettingsModalPage() {
	return (
		<ModalRoute development dialogTitle="Settings">
			<div>
				<h1>Settings</h1>
				<p>This is the settings modal page.</p>
			</div>
		</ModalRoute>
	);
}

export default SettingsModalPage;
