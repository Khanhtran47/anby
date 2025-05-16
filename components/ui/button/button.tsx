import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';
import { Icon } from '../icon';
import type { IconName } from '../icon';

const buttonVariants = tv({
	base: [
		'relative group inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
		'active:animate-bg-gradient active:text-background',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0',
	],
	variants: {
		variant: {
			default: [
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
				}),
				'rounded-full text-foreground hover:text-foreground/70',
			],
			destructive: [
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
				}),
				'shadow-destructive text-destructive hover:text-destructive/70 rounded-tl-sm rounded-r-3xl rounded-bl-4xl',
			],
		},
		size: {
			sm: 'h-9 px-3',
			md: 'h-10 px-4 py-2',
			lg: 'h-11 px-8',
			icon: 'h-12 w-12',
		},
		isDisabled: {
			true: 'opacity-50 pointer-events-none',
			false: 'cursor-pointer',
		},
		wrapIcon: {
			true: '!pl-0 !py-0 justify-between',
		},
		showBgPattern: {
			true: 'bg-transparent overflow-hidden',
			false: 'bg-background',
		},
	},
	compoundVariants: [
		{
			isDisabled: true,
			showBgPattern: true,
			class: 'bg-background',
		},
	],
	defaultVariants: {
		variant: 'default',
		size: 'md',
		isDisabled: false,
		wrapIcon: false,
		showBgPattern: false,
	},
});

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	icon?: IconName;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			isDisabled,
			asChild = false,
			icon,
			wrapIcon,
			children,
			showBgPattern = true,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		const ButtonIcon = icon ? <Icon className="text-inherit" name={icon} size="md" /> : null;
		return (
			<Comp
				ref={ref}
				disabled={isDisabled}
				className={cn(
					buttonVariants({ variant, size, wrapIcon, isDisabled, showBgPattern, className }),
				)}
				{...props}
			>
				{showBgPattern && !isDisabled ? (
					<div className="pattern-rhombus pattern-bg-background pattern-opacity-100 pattern-size-1 pattern-bg-pattern absolute top-0 left-0 z-[-1] size-full" />
				) : null}
				{icon ? (
					wrapIcon ? (
						<div
							className={cn(
								'flex aspect-square h-full items-center justify-center rounded-full',
								borderStyle({ showBorder: false, showShadowInset: true, shadowColor: 'border' }),
							)}
						>
							{ButtonIcon}
						</div>
					) : (
						ButtonIcon
					)
				) : null}
				{children}
			</Comp>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
