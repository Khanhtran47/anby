import React from 'react';

import { cn } from '@/utils/common/misc';
import { ScrollArea } from '@/components/ui/scroll-area';
import { borderStyle } from '@/styles/primitives';

interface MainContentProps {
	children: React.ReactNode;
}

function MainContent(props: MainContentProps) {
	const { children } = props;

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
			<div className="pattern-diagonal-lines pattern-bg-muted pattern-background pattern-opacity-30 pattern-size-2 absolute top-0 left-0 z-[-1] mx-1 mt-1 h-14 w-[calc(100%-8px)] rounded-t-md" />
			<div className="pattern-diagonal-lines pattern-bg-muted pattern-background pattern-opacity-30 pattern-size-2 absolute bottom-0 left-0 z-[-1] mx-1 mb-1 h-14 w-[calc(100%-8px)] rounded-b-md" />
			<ScrollArea
				type="always"
				classNames={{
					root: 'h-[calc(100svh-5.75rem)] w-full',
				}}
			>
				<main className="size-full">{children}</main>
			</ScrollArea>
		</div>
	);
}

export default MainContent;
