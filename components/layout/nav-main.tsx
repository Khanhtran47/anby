'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/link';
import { usePathname } from '@/i18n/navigation';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
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
	const t = useTranslations('SidebarMenu');
	const { setOpenMobile, state } = useSidebar();
	return (
		<SidebarMenuItem className="group/collapsible">
			<SidebarMenuButton
				asChild
				className="h-12 rounded-sm"
				isActive={isActive}
				size="lg"
				tooltip={t(item.title)}
			>
				<Link aria-label={t(item.title)} href={item.url} onClick={() => setOpenMobile(false)}>
					{item.icon ? <Icon name={item.icon} /> : null}
					{item.image ? (
						<Image
							optimizeImg
							alt={`${item.title} icon`}
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
					{state === 'expanded' ? (
						<span className="not-prose shrink text-lg font-bold tracking-tight">
							{t(item.title)}
						</span>
					) : null}
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
