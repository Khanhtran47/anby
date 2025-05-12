'use client';

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { IconName } from '@/components/ui/icon';
import { Icon } from '@/components/ui/icon';
import { Image } from '@/components/ui/image';

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: IconName;
		image?: string;
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title} className="group/collapsible">
						<SidebarMenuButton className="h-10" tooltip={item.title}>
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
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
