'use client';

import { useMediaQuery } from '@react-hookz/web';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

import { Image } from '../image';

import type { Ref } from 'react';
import type { VariantProps } from 'tailwind-variants';

export const boxVariants = tv({
	base: [
		'group box-border inline-flex select-none appearance-none items-center overflow-hidden outline-none text-foreground relative',
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
			xl: 'rounded-xl',
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
		radius: 'xl',
		shadow: 'none',
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
	title,
	children,
	showBgPattern = true,
	showBgCorner = false,
	...props
}: React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof boxVariants> & {
		ref?: Ref<HTMLDivElement>;
		title?: string;
		showBgPattern?: boolean;
		showBgCorner?: boolean;
	}) {
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
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
		>
			{showBgPattern ? (
				<div
					className={cn(
						'pattern-rhombus pattern-bg-muted pattern-bg-pattern pattern-opacity-100 pattern-size-2 absolute top-0 left-0 z-[-1] size-full',
						// classNames?.pattern,
					)}
				/>
			) : null}
			{showBgCorner ? (
				<Image
					disableSkeleton
					radius="none"
					src="/assets/images/bg-info-corner.png"
					classNames={{
						wrapper: 'h-[250px] w-[324px] absolute top-0 right-0 z-10 pointer-events-none',
						img: 'size-full',
					}}
				/>
			) : null}
			{title ? (
				<div className="flex w-full justify-between">
					<div className="flex items-center justify-center gap-1">
						<Image
							height={18}
							radius="none"
							src="/assets/images/decoIcon-zzz.png"
							width={14}
							classNames={{
								wrapper: 'w-[14px] h-[18px]',
								img: 'size-full invert-100 dark:invert-0',
							}}
						/>
						<span className="not-prose s8">{title}</span>
						<Image
							height={16}
							radius="none"
							src="/assets/images/decoIcon-text.png"
							width={27}
							classNames={{
								wrapper: 'w-[27px] h-[16px]',
								img: 'size-full invert-100 dark:invert-0',
							}}
						/>
					</div>
					{isSm ? null : (
						<div className="hidden items-center justify-center gap-1 sm:flex">
							<Image
								height={22}
								radius="none"
								src="/assets/images/decoIcon-base-info.png"
								width={88}
								classNames={{
									wrapper: 'w-[88px] h-[22px]',
									img: 'size-full invert-100 dark:invert-0',
								}}
							/>
							<Image
								height={24}
								radius="none"
								src="/assets/images/decoIcon-right.png"
								width={24}
								classNames={{
									wrapper: 'w-[24px] h-[24px]',
									img: 'size-full invert-100 dark:invert-0',
								}}
							/>
						</div>
					)}
				</div>
			) : null}
			{children}
		</div>
	);
}

export { Box };
