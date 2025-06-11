'use client';

import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { cn } from '@/utils/common/misc';
import { toggleVariants } from '@/components/ui/toggle';

import type { VariantProps } from 'tailwind-variants';

const ToggleGroupContext = React.createContext<
	VariantProps<typeof toggleVariants> & {
		groupType?: 'separate' | 'joined';
	}
>({
	size: 'md',
	variant: 'default',
});

function ToggleGroup({
	className,
	variant,
	size,
	children,
	groupType = 'separate',
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
	VariantProps<typeof toggleVariants> & {
		groupType?: 'separate' | 'joined';
	}) {
	return (
		<ToggleGroupPrimitive.Root
			data-size={size}
			data-slot="toggle-group"
			data-variant={variant}
			className={cn(
				'group/toggle-group flex w-fit items-center rounded-full',
				groupType === 'separate' ? 'gap-4' : '',
				className,
			)}
			{...props}
		>
			<ToggleGroupContext.Provider value={{ variant, size, groupType }}>
				{children}
			</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	);
}

function ToggleGroupItem({
	className,
	children,
	variant,
	size,
	...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
	const context = React.useContext(ToggleGroupContext);

	return (
		<ToggleGroupPrimitive.Item
			data-size={context.size || size}
			data-slot="toggle-group-item"
			data-variant={context.variant || variant}
			className={cn(
				toggleVariants({
					variant: context.variant || variant,
					size: context.size || size,
				}),
				context.groupType === 'joined'
					? 'min-w-0 flex-1 shrink-0 rounded-none first:rounded-l-full last:rounded-r-full focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l-2'
					: context.groupType === 'separate'
						? ''
						: '',
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	);
}

export { ToggleGroup, ToggleGroupItem };
