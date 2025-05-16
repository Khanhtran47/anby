import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';
import { Icon } from '../icon';
import type { IconName } from '../icon';

const buttonVariants = tv({
	base: 'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	variants: {
		variant: {
			default: [
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
				}),
				'bg-background rounded-full text-foreground hover:text-foreground/70',
			],
			destructive: [
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
				}),
				'shadow-destructive bg-background text-destructive hover:text-destructive/70 rounded-tl-sm rounded-r-3xl rounded-bl-4xl',
			],
		},
		size: {
			sm: 'h-9 px-3',
			md: 'h-10 px-4 py-2',
			lg: 'h-11 px-8',
			icon: 'h-10 w-10',
		},
		isDisabled: {
			true: 'opacity-50',
			false: 'cursor-pointer',
		},
		wrapIcon: {
			true: '!pl-0 !py-0 justify-between',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'md',
		isDisabled: false,
		wrapIcon: false,
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
		{ className, variant, size, isDisabled, asChild = false, icon, wrapIcon, children, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		const ButtonIcon = icon ? <Icon className="text-inherit" name={icon} /> : null;
		return (
			<Comp
				ref={ref}
				className={cn(buttonVariants({ variant, size, wrapIcon, isDisabled, className }))}
				disabled={isDisabled}
				{...props}
			>
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
