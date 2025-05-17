import React from 'react';

import ThemeToggle from '@/components/features/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
	breadcrumb?: React.ReactNode;
}

function Header(props: HeaderProps) {
	const { breadcrumb } = props;
	return (
		<div className="flex h-16 items-center justify-between">
			<div className="flex items-center gap-3">
				<SidebarTrigger className="-ml-1" />
				{breadcrumb}
			</div>
			<div className="flex items-center">
				<ThemeToggle />
			</div>
		</div>
	);
}

export default Header;
