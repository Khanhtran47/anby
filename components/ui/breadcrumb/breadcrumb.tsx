import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

import { Icon } from '../icon';

import type { VariantProps } from 'tailwind-variants';

export const breadcrumbVariants = tv({
	slots: {
		base: [
			'relative rounded-full h-12 inline-flex items-center',
			borderStyle({
				showBorder: true,
				borderColor: 'background',
				showShadowInset: true,
				shadowColor: 'border',
				removeOnActive: false,
			}),
		],
		item: 'inline-flex items-center justify-center gap-1.5',
	},
	variants: {
		showBgPattern: {
			true: {
				base: 'bg-transparent overflow-hidden',
			},
			false: {
				base: 'bg-background',
			},
		},
		showHomeIcon: {
			true: {
				base: 'pr-4 justify-between',
				item: [
					'h-11 aspect-square rounded-full',
					borderStyle({
						showBorder: false,
						showShadowInset: true,
						shadowColor: 'border',
						removeOnActive: false,
					}),
				],
			},
			false: {
				base: 'px-4 justify-center',
				item: 'py-2',
			},
		},
	},
	defaultVariants: {
		showBgPattern: true,
		showHomeIcon: false,
	},
});

const Breadcrumb = React.forwardRef<
	HTMLElement,
	React.ComponentPropsWithoutRef<'nav'> &
		VariantProps<typeof breadcrumbVariants> & {
			separator?: React.ReactNode;
		}
>(({ children, className, showBgPattern = true, showHomeIcon, ...props }, ref) => {
	const { base } = breadcrumbVariants({ showBgPattern });
	return (
		<nav
			ref={ref}
			aria-label="breadcrumb"
			className={cn(base({ showBgPattern, showHomeIcon }), className)}
			{...props}
		>
			{showBgPattern ? (
				<div className="pattern-rhombus pattern-bg-background pattern-opacity-100 pattern-size-1 pattern-bg-pattern absolute top-0 left-0 z-[-1] size-full" />
			) : null}
			{children}
		</nav>
	);
});
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
	({ className, ...props }, ref) => (
		<ol
			ref={ref}
			className={cn(
				'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
				className,
			)}
			{...props}
		/>
	),
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentPropsWithoutRef<'li'> & VariantProps<typeof breadcrumbVariants>
>(({ className, showBgPattern, showHomeIcon, ...props }, ref) => {
	const { item } = breadcrumbVariants({ showBgPattern, showHomeIcon });
	return <li ref={ref} className={item({ className })} {...props} />;
});
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithoutRef<'a'> & {
		asChild?: boolean;
	}
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : 'a';

	return (
		<Comp
			ref={ref}
			className={cn('hover:text-foreground transition-colors', className)}
			{...props}
		/>
	);
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
	({ className, ...props }, ref) => (
		<span
			ref={ref}
			aria-current="page"
			aria-disabled="true"
			className={cn('text-foreground font-normal', className)}
			role="link"
			{...props}
		/>
	),
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li aria-hidden="true" className={cn('text-border', className)} role="presentation" {...props}>
			{children ?? <Icon name="chevron-right-bold" size="sm" />}
		</li>
	);
}
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden="true"
			className={cn('flex h-9 w-9 items-center justify-center', className)}
			role="presentation"
			{...props}
		>
			<Icon className="h-4 w-4" name="more-horizontal-light" />
			<span className="sr-only">More</span>
		</span>
	);
}
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
