'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

export type TooltipProps = {
	provider?: React.ComponentProps<typeof TooltipPrimitive.Provider>;
	root?: React.ComponentProps<typeof TooltipPrimitive.Root>;
	content?: React.ComponentProps<typeof TooltipPrimitive.Content>;
};

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
		showBgPattern?: boolean;
		classNames?: {
			content?: string;
			pattern?: string;
		};
	}
>(({ className, sideOffset = 4, showBgPattern = true, children, classNames, ...props }, ref) => (
	<TooltipPrimitive.Content
		ref={ref}
		sideOffset={sideOffset}
		className={cn(
			'bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[--radix-tooltip-content-transform-origin] overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md',
			borderStyle({
				showBorder: true,
				borderColor: 'background',
				showShadowInset: true,
				shadowColor: 'border',
				removeOnActive: false,
			}),
			className,
			classNames?.content,
		)}
		{...props}
	>
		{showBgPattern ? (
			<div
				className={cn(
					'pattern-rhombus pattern-bg-pattern pattern-bg-popover pattern-opacity-100 pattern-size-1 absolute top-0 left-0 z-[-1] size-full rounded-full',
					classNames?.pattern,
				)}
			/>
		) : null}
		{children}
	</TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
