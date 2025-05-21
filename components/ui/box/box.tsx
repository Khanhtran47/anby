import { tv } from 'tailwind-variants';

import { borderStyle } from '@/styles/primitives';

import type { Ref } from 'react';
import type { VariantProps } from 'tailwind-variants';

export const boxVariants = tv({
	base: [
		'group box-border inline-flex select-none appearance-none items-center overflow-hidden outline-none bg-muted text-foreground',
		borderStyle({
			showBorder: true,
			borderColor: 'background',
			removeOnActive: false,
		}),
	],
	variants: {
		size: {
			sm: 'p-2',
			md: 'p-3',
			lg: 'p-4',
		},
		radius: {
			none: 'rounded-none',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-ld',
			full: 'rounded-full',
		},
		shadow: {
			none: 'shadow-none',
			sm: 'shadow-sm',
			md: 'shadow-md',
			lg: 'shadow-ld',
		},
		fullWidth: {
			true: 'w-full',
		},
		isDisabled: {
			true: 'pointer-events-none opacity-50',
		},
	},
	defaultVariants: {
		size: 'md',
		radius: 'md',
		shadow: 'md',
		fullWidth: false,
		isDisabled: false,
	},
});

function Box({
	className,
	size,
	radius,
	fullWidth,
	shadow,
	isDisabled,
	ref,
	...props
}: React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof boxVariants> & {
		ref?: Ref<HTMLDivElement>;
	}) {
	return (
		<div
			ref={ref}
			className={boxVariants({
				size,
				radius,
				fullWidth,
				shadow,
				isDisabled,
				className,
			})}
			{...props}
		/>
	);
}

export { Box };
