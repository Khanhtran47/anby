'use client';

import * as React from 'react';

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { NavMain } from './nav-main';

const data = {
	versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
	navMain: [
		{
			title: 'Home',
			url: '/',
			image: 'https://api.hakush.in/zzz/UI/zzz_homepage.webp',
		},
		{
			title: 'Changelog',
			url: '/changelog',
			image: 'https://api.hakush.in/zzz/UI/zzz_diff.webp',
		},
		{
			title: 'Agents',
			url: '/agents',
			image: 'https://api.hakush.in/zzz/UI/zzz_character.webp',
		},
		{
			title: 'Bangboo',
			url: '/bangboo',
			image: 'https://api.hakush.in/zzz/UI/zzz_bangboo.webp',
		},
		{
			title: 'W-Engine',
			url: '/w-engine',
			image: 'https://api.hakush.in/zzz/UI/zzz_weapon.webp',
		},
		{
			title: 'Drive Disc',
			url: '/drive-disc',
			image: 'https://api.hakush.in/zzz/UI/zzz_DriveDisc.webp',
		},
		{
			title: 'Achievements',
			url: '/achievements',
			image: 'https://api.hakush.in/zzz/UI/zzz_achievement.webp',
		},
		{
			title: 'Inventory',
			url: '/inventory',
			image: 'https://api.hakush.in/zzz/UI/zzz_item.webp',
		},
		{
			title: 'Enemy Creatures',
			url: '/enemies',
			image: 'https://api.hakush.in/zzz/UI/zzz_monster.webp',
		},
		{
			title: 'Shiyu Defense',
			url: '/shiyu-defense',
			image: 'https://api.hakush.in/zzz/UI/zzz_shiyu.webp',
		},
		{
			title: 'Deadly Assault',
			url: '/deadly-assault',
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
