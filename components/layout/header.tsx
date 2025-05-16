import React from 'react';

import ThemeToggle from '@/components/features/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

function Header() {
	return (
		<div className="flex h-16 items-center justify-between">
			<div className="flex items-center">
				<SidebarTrigger className="-ml-1" />
			</div>
			<div className="flex items-center">
				<ThemeToggle />
			</div>
		</div>
	);
}

export default Header;
