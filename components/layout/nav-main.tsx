'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { IconName } from '@/components/ui/icon';

type SidebarMenuItemProps = {
	title: string;
	url: string;
	icon?: IconName;
	image?: string;
};

function MenuItem({ item }: { item: SidebarMenuItemProps }) {
	const pathname = usePathname();
	const isActive = useMemo(() => pathname === item.url, [pathname, item.url]);
	return (
		<SidebarMenuItem className="group/collapsible">
			<SidebarMenuButton
				asChild
				className="h-12"
				isActive={isActive}
				size="lg"
				tooltip={item.title}
			>
				<Link prefetch href={item.url}>
					{item.icon ? <Icon name={item.icon} /> : null}
					{item.image ? (
						<Image
							optimizeImg
							alt={item.title}
							fit="cover"
							height={32}
							src={item.image}
							width={32}
							classNames={{
								wrapper: 'w-8 aspect-square',
								img: 'size-full object-cover',
							}}
						/>
					) : null}
					<span>{item.title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}

export function NavMain({ items }: { items: SidebarMenuItemProps[] }) {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<MenuItem key={item.title} item={item} />
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
