import React from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';

import { Icon } from '../icon';

import type { VariantProps } from 'tailwind-variants';

const spinner = tv({
	slots: {
		wrapper:
			'flex-col items-center justify-center border-2 border-foreground bg-background p-2 rounded-full w-fit',
		icon: 'animate-spin text-foreground',
	},
	variants: {
		hidden: {
			true: {
				wrapper: 'hidden',
			},
			false: {
				wrapper: 'flex',
			},
		},
		size: {
			sm: {
				icon: 'size-6',
			},
			md: {
				icon: 'size-8',
			},
			lg: {
				icon: 'size-12',
			},
		},
	},
	defaultVariants: {
		hidden: false,
		size: 'md',
	},
});

interface SpinnerContentProps extends VariantProps<typeof spinner> {
	className?: string;
	children?: React.ReactNode;
	classNames?: {
		wrapper?: string;
		icon?: string;
	};
}

export function Spinner({ size, hidden, children, className, classNames }: SpinnerContentProps) {
	const { wrapper, icon } = spinner({ hidden, size });
	return (
		<span className={cn(wrapper(), className, classNames?.wrapper)}>
			<Icon className={cn(icon(), classNames?.icon)} name="loader-circle-bold" />
			{children}
		</span>
	);
}
