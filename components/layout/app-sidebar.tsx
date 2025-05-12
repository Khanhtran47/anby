'use client';

import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader></SidebarHeader>
			<SidebarContent></SidebarContent>
			<SidebarFooter></SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
