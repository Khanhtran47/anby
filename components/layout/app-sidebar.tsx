'use client';

import * as React from 'react';
import { SHORTCUTS } from '@/constant/shortcuts';

import { Sidebar, SidebarContent } from '@/components/ui/sidebar';

import { NavMain } from './nav-main';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent>
				<NavMain items={SHORTCUTS.navMain} />
			</SidebarContent>
		</Sidebar>
	);
}
