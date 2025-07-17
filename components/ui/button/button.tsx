import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

import { Icon } from '../icon';

import type { VariantProps } from 'tailwind-variants';
import type { IconName } from '../icon';

const buttonVariants = tv({
	base: [
		'relative group/button inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all',
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
			'destructive-invert': [
				'rounded-tr-sm rounded-l-3xl rounded-br-4xl border-2 border-background shadow-[inset_0_0_0_4px_var(--destructive),inset_0_0_0_6px_var(--background)] text-background hover:text-background/70 active:shadow-none active:border-none group-active/button:shadow-none group-active/button:border-none',
			],
			outline: [
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
				}),
				'rounded-full text-foreground hover:text-foreground/70',
			],
			ghost: ['rounded-full text-foreground hover:text-foreground/70 hover:bg-background'],
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
		},
	},
	compoundVariants: [
		{
			isDisabled: true,
			showBgPattern: true,
			variant: 'default',
			class: 'bg-background',
		},
		{
			isDisabled: true,
			showBgPattern: true,
			variant: 'destructive',
			class: 'bg-background',
		},
		{
			isDisabled: true,
			showBgPattern: true,
			variant: 'destructive-invert',
			class: 'bg-destructive',
		},
		{
			showBgPattern: false,
			variant: 'default',
			class: 'bg-background',
		},
		{
			showBgPattern: false,
			variant: 'destructive',
			class: 'bg-background',
		},
		{
			showBgPattern: false,
			variant: 'destructive-invert',
			class: 'bg-destructive',
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
	classNames?: {
		root?: string;
		pattern?: string;
		iconWrapper?: string;
		icon?: string;
	};
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			classNames,
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
		const ButtonIcon = icon ? (
			<Icon className={cn('text-inherit', classNames?.icon)} name={icon} size="md" />
		) : null;
		return (
			<Comp
				ref={ref}
				disabled={isDisabled}
				className={cn(
					buttonVariants({ variant, size, wrapIcon, isDisabled, showBgPattern }),
					className,
					classNames?.root,
				)}
				{...props}
			>
				{asChild ? (
					React.isValidElement(children) ? (
						React.cloneElement(
							children,
							undefined,
							showBgPattern && !isDisabled && variant !== 'ghost' && variant !== 'outline' ? (
								<div
									className={cn(
										'pattern-rhombus pattern-bg-pattern pattern-opacity-100 pattern-size-1 absolute top-0 left-0 z-[-1] size-full',
										variant === 'destructive-invert'
											? 'pattern-bg-destructive'
											: 'pattern-bg-background',
										classNames?.pattern,
									)}
								/>
							) : null,
							icon ? (
								wrapIcon ? (
									<div
										className={cn(
											'flex aspect-square h-full items-center justify-center rounded-full',
											borderStyle({
												showBorder: false,
												showShadowInset: true,
												shadowColor: 'border',
												className: 'group-active/button:shadow-transparent',
											}),
											classNames?.iconWrapper,
										)}
									>
										{ButtonIcon}
									</div>
								) : (
									ButtonIcon
								)
							) : null,
							// @ts-expect-error
							children.props.children,
							icon && wrapIcon ? <div /> : null,
						)
					) : null
				) : (
					<>
						{showBgPattern && !isDisabled && variant !== 'ghost' && variant !== 'outline' ? (
							<div
								className={cn(
									'pattern-rhombus pattern-bg-pattern pattern-opacity-100 pattern-size-1 absolute top-0 left-0 z-[-1] size-full',
									variant === 'destructive-invert'
										? 'pattern-bg-destructive'
										: 'pattern-bg-background',
									classNames?.pattern,
								)}
							/>
						) : null}
						{icon ? (
							wrapIcon ? (
								<div
									className={cn(
										'flex aspect-square h-full items-center justify-center rounded-full',
										borderStyle({
											showBorder: false,
											showShadowInset: true,
											shadowColor: 'border',
											className: 'group-active/button:shadow-transparent',
										}),
										classNames?.iconWrapper,
									)}
								>
									{ButtonIcon}
								</div>
							) : (
								ButtonIcon
							)
						) : null}
						{children}
						{icon && wrapIcon ? <div /> : null}
					</>
				)}
			</Comp>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
