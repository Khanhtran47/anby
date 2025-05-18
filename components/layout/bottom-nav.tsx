import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/common/misc';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { borderStyle } from '@/styles/primitives';

function BottomNav() {
	const pathname = usePathname();
	return (
		<div
			className={cn(
				'relative flex h-20 items-center justify-around rounded-xl backdrop-blur-sm sm:hidden',
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
					removeOnActive: false,
				}),
			)}
		>
			<div className="pattern-rhombus pattern-bg-muted pattern-background pattern-opacity-10 pattern-size-2 absolute top-0 left-0 z-[-2] size-full rounded-t-xl" />
			<Button
				asChild
				icon="home-bold"
				variant="ghost"
				className={cn(
					'aspect-square h-full flex-col items-center justify-center',
					pathname === '/' ? 'animate-bg-gradient text-background' : '',
				)}
			>
				<Link prefetch href="/">
					Home
				</Link>
			</Button>
			<Button
				icon="settings-bold"
				variant="ghost"
				className={cn(
					'aspect-square h-full flex-col items-center justify-center',
					pathname === '/settings' ? 'animate-bg-gradient text-background' : '',
				)}
			>
				<Link prefetch href="/settings">
					Settings
				</Link>
			</Button>
			<SidebarTrigger
				className="aspect-square h-full flex-col"
				icon="menu-bold"
				size="md"
				variant="ghost"
			>
				Menu
			</SidebarTrigger>
		</div>
	);
}

export default BottomNav;
