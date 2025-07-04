'use client';

import React, { useEffect } from 'react';
import { useLayoutStore } from '@/store/use-layout-store';
import { useDebouncedEffect } from '@react-hookz/web';

import { usePathname } from '@/i18n/navigation';
import { cn } from '@/utils/common/misc';
import { ScrollArea } from '@/components/ui/scroll-area';
import { borderStyle } from '@/styles/primitives';

interface MainContentProps {
	children: React.ReactNode;
}

function MainContent(props: MainContentProps) {
	const { children } = props;
	const viewportRef = React.useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const { setViewportRef } = useLayoutStore((state) => state);

	useEffect(() => {
		setViewportRef(viewportRef);
		// eslint-disable-next-line react-hooks/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useDebouncedEffect(
		() => {
			if (viewportRef.current) {
				viewportRef.current.scrollTo({ top: 0, left: 0 });
			}
		},
		[pathname],
		100,
	);

	return (
		<div
			className={cn(
				'relative size-full overflow-hidden rounded-xl backdrop-blur-sm',
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
			<div className="pattern-diagonal-lines pattern-bg-muted pattern-background pattern-opacity-30 pattern-size-2 absolute bottom-0 left-0 z-[-1] mx-1 mb-1 h-14 w-[calc(100%-8px)] rounded-b-md" />
			{/* TODO: add scroll restoration for scroll area layout */}
			<ScrollArea
				type="always"
				viewportRef={viewportRef}
				classNames={{
					root: 'h-[calc(100svh-7.5rem)] sm:h-[calc(100svh-5.75rem)] w-full !p-0',
					scrollbar: 'z-50',
				}}
			>
				<main className="relative flex size-full items-center justify-center">{children}</main>
			</ScrollArea>
		</div>
	);
}

export default MainContent;
