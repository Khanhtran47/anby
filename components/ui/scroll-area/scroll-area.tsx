'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/utils/common/misc';

const ScrollBar = React.forwardRef<
	React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
	React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
		classNames?: {
			scrollbar?: string;
			thumb?: string;
		};
	}
>(({ className, orientation = 'vertical', classNames, ...props }, ref) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			'flex touch-none transition-colors select-none',
			orientation === 'vertical' &&
				'mr-[4px] h-full w-1.5 border-l border-l-transparent px-[1px] py-[6px] sm:w-2.5',
			orientation === 'horizontal' &&
				'mb-[4px] h-1.5 flex-col border-t border-t-transparent px-[6px] py-[1px] sm:h-2.5',
			className,
			classNames?.scrollbar,
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb
			className={cn('bg-ring relative flex-1 rounded-full', classNames?.thumb)}
		/>
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

const ScrollArea = React.forwardRef<
	React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
		classNames?: {
			root?: string;
			viewport?: string;
			scrollbar?: string;
			thumb?: string;
			corner?: string;
		};
		orientation?: 'horizontal' | 'vertical';
		viewportRef?: React.RefObject<HTMLDivElement | null>;
	}
>(({ className, children, classNames, orientation, viewportRef, ...props }, ref) => (
	<ScrollAreaPrimitive.Root
		ref={ref}
		className={cn('relative overflow-hidden py-2 pr-2 pl-2 sm:pr-4', className, classNames?.root)}
		{...props}
	>
		<ScrollAreaPrimitive.Viewport
			ref={viewportRef}
			className={cn('size-full', classNames?.viewport)}
		>
			{children}
		</ScrollAreaPrimitive.Viewport>
		<ScrollBar
			orientation={orientation}
			classNames={{
				scrollbar: classNames?.scrollbar,
				thumb: classNames?.thumb,
			}}
		/>
		<ScrollAreaPrimitive.Corner className={classNames?.corner} />
	</ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export { ScrollArea, ScrollBar };
