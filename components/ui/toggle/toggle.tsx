'use client';

import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

import type { VariantProps } from 'tailwind-variants';

const toggleVariants = tv({
	base: [
		'inline-flex items-center justify-center rounded-full text-sm font-medium transition-[color,box-shadow] whitespace-nowrap',
		'disabled:pointer-events-none disabled:opacity-50',
		'hover:text-foreground/70',
		'active:animate-bg-gradient',
		'data-[state=on]:bg-yellow-500 data-[state=on]:text-background',
		"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0",
		'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none',
		'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
	],
	variants: {
		variant: {
			default: 'bg-transparent hover:bg-muted',
			outline: borderStyle({
				showBorder: true,
				borderColor: 'background',
				showShadowInset: true,
				shadowColor: 'border',
				class:
					'data-[state=on]:shadow-transparent data-[state=on]:border-transparent text-foreground',
			}),
		},
		size: {
			sm: 'h-9 px-1.5 min-w-9',
			md: 'h-10 px-2 min-w-10',
			lg: 'h-11 px-2.5 min-w-11',
			icon: 'h-12 w-12',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'md',
	},
});

function Toggle({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			className={cn(toggleVariants({ variant, size, className }))}
			data-slot="toggle"
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
