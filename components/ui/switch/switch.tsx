'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
		classNames?: {
			wrapper?: string;
			root?: string;
			pattern?: string;
			thumb?: string;
		};
	}
>(({ className, classNames, ...props }, ref) => (
	<div
		className={cn(
			'peer flex items-center rounded-full p-1',
			borderStyle({
				showBorder: true,
				borderColor: 'background',
				showShadowInset: true,
				shadowColor: 'border',
				removeOnActive: false,
			}),
			classNames?.wrapper,
		)}
	>
		<SwitchPrimitives.Root
			className={cn(
				'border-background relative inline-flex h-6 w-16 shrink-0 cursor-pointer items-center overflow-hidden rounded-full border-2 transition-colors',
				'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
				'data-[state=unchecked]:bg-muted',
				'data-[state=checked]:bg-green-600',
				'disabled:cursor-not-allowed disabled:opacity-50',
				className,
				classNames?.root,
			)}
			{...props}
			ref={ref}
		>
			<div
				className={cn(
					'pattern-rhombus pattern-background pattern-opacity-20 pattern-size-1 pattern-bg-muted absolute top-0 left-0 size-full rounded-full',
					classNames?.pattern,
				)}
			/>
			<SwitchPrimitives.Thumb
				className={cn(
					'bg-muted-foreground shadow-background pointer-events-none block h-5 w-5 rounded-full shadow-[0_0_0_2px] ring-0 transition-transform',
					'data-[state=checked]:translate-x-10',
					'data-[state=unchecked]:translate-x-0',
					"data-[state=checked]:after:text-background data-[state=checked]:after:absolute data-[state=checked]:after:right-8 data-[state=checked]:after:text-sm data-[state=checked]:after:font-black data-[state=checked]:after:content-['ON']",
					"data-[state=unchecked]:after:text-background data-[state=unchecked]:after:absolute data-[state=unchecked]:after:left-7 data-[state=unchecked]:after:text-sm data-[state=unchecked]:after:font-black data-[state=unchecked]:after:content-['OFF']",
					classNames?.thumb,
				)}
			/>
		</SwitchPrimitives.Root>
	</div>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
