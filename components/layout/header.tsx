import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

function Header() {
	return (
		<div className="flex h-16 items-center">
			<div>
				<SidebarTrigger className="-ml-1" />
			</div>
		</div>
	);
}

export default Header;
