'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
		classNames?: {
			wrapper?: string;
			pattern?: string;
			root?: string;
			track?: string;
			range?: string;
			thumb?: string;
		};
	}
>(({ className, classNames, disabled, ...props }, ref) => (
	<div
		className={cn(
			'relative flex h-12 w-full touch-none items-center rounded-full px-2 py-4 select-none',
			disabled ? 'pointer-events-none opacity-50' : '',
			borderStyle({
				showBorder: true,
				borderColor: 'background',
				showShadowInset: true,
				shadowColor: 'border',
				removeOnActive: false,
			}),
			className,
			classNames?.wrapper,
		)}
	>
		<div
			className={cn(
				'pattern-rhombus pattern-bg-pattern pattern-opacity-100 pattern-size-1 pattern-bg-background absolute top-0 left-0 z-[-1] size-full rounded-full',
				classNames?.pattern,
			)}
		/>
		<SliderPrimitive.Root
			ref={ref}
			className={cn('relative flex w-full touch-none items-center select-none', classNames?.root)}
			disabled={disabled}
			{...props}
		>
			<SliderPrimitive.Track
				className={cn(
					'bg-muted relative mx-2 h-3 w-full grow overflow-hidden rounded-full',
					classNames?.track,
				)}
			>
				<SliderPrimitive.Range
					className={cn('bg-muted-foreground absolute h-full', classNames?.range)}
				/>
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb
				aria-label="Thumb"
				className={cn(
					'bg-muted-foreground border-background ring-offset-background focus-visible:ring-border focus-visible:animate-bg-gradient active:animate-bg-gradient block size-7 rounded-full border-4 transition-colors focus-visible:border-2 focus-visible:ring-2 focus-visible:outline-none active:border-2',
					classNames?.thumb,
				)}
			/>
		</SliderPrimitive.Root>
	</div>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
