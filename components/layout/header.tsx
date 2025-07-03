import React from 'react';

import { Link } from '@/i18n/link';
import LocaleSwitcherSelect from '@/components/features/locale-switcher-select';
import ThemeToggle from '@/components/features/theme-toggle';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
	breadcrumb?: React.ReactNode;
}

function Header(props: HeaderProps) {
	const { breadcrumb } = props;
	return (
		<div className="hidden h-16 items-center justify-between sm:flex">
			<div className="flex items-center gap-3">
				<SidebarTrigger className="-ml-1" />
				{breadcrumb}
			</div>
			<div className="flex items-center gap-3">
				<LocaleSwitcherSelect />
				<ThemeToggle />
				<Button asChild aria-label="Settings" size="icon">
					<Link animateOptions={{ animateName: 'none' }} href="/settings">
						<Icon name="settings-bold" size="md" />
					</Link>
				</Button>
			</div>
		</div>
	);
}

export default Header;
