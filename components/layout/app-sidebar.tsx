'use client';

import * as React from 'react';

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { NavMain } from './nav-main';

const data = {
	versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
	navMain: [
		{
			title: 'Home',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_homepage.webp',
		},
		{
			title: 'Agents',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_character.webp',
		},
		{
			title: 'Bangboo',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_bangboo.webp',
		},
		{
			title: 'W-Engine',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_weapon.webp',
		},
		{
			title: 'Drive Disc',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_DriveDisc.webp',
		},
		{
			title: 'Achievements',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_achievement.webp',
		},
		{
			title: 'Inventory',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_item.webp',
		},
		{
			title: 'Enemy Creatures',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_monster.webp',
		},
		{
			title: 'Shiyu Defense',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_shiyu.webp',
		},
		{
			title: 'Deadly Assault',
			url: '#',
			image: 'https://api.hakush.in/zzz/UI/zzz_shiyu.webp',
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader></SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
