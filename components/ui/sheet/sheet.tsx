'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { useMediaQuery } from '@react-hookz/web';
import { isMobileOnly } from 'react-device-detect';
import { lazily } from 'react-lazily';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import VisuallyHidden from '@/utils/react/visually-hidden';
import { borderStyle } from '@/styles/primitives';

import { Button } from '../button';
import { DrawerContent, DrawerRoot, DrawerTrigger } from '../drawer';

import type * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { Ref } from 'react';
import type { VariantProps } from 'tailwind-variants';

const { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } = lazily(
	() => import('../tooltip'),
);

const SheetRoot = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

function SheetPortal({ ...props }: SheetPrimitive.DialogPortalProps) {
	return <SheetPrimitive.Portal {...props} />;
}
SheetPortal.displayName = SheetPrimitive.Portal.displayName;

const SheetOverlay = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> & {
		classNames?: {
			overlay?: string;
			pattern?: string;
		};
	}
>(({ className, classNames, ...props }, ref) => (
	<SheetPrimitive.Overlay
		className={cn(
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:animation-duration-200 data-[state=open]:animation-duration-150 fixed inset-0 z-40 cursor-pointer bg-black/10 backdrop-blur-sm',
			className,
			classNames?.overlay,
		)}
		{...props}
		ref={ref}
	>
		<div
			className={cn(
				'pattern-diagonal-lines pattern-bg-background pattern-bg-pattern pattern-opacity-60 pattern-size-2 size-full',
				classNames?.pattern,
			)}
		/>
	</SheetPrimitive.Overlay>
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

function SheetHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('relative flex flex-col gap-y-1.5 p-6', className)} {...props}>
			<div className="bg-background/80 absolute top-0 left-0 z-[-1] mx-1 mt-1 h-full w-[calc(100%-8px)] rounded-t-md" />
			{children}
		</div>
	);
}
SheetHeader.displayName = 'SheetHeader';

function SheetBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('bg-background m-6 shrink grow rounded-xl p-3', className)} {...props} />
	);
}
SheetBody.displayName = 'SheetBody';

function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'border-default border-border flex flex-col-reverse gap-y-2 border-t-4 p-6 sm:flex-row sm:justify-end sm:gap-x-2',
				className,
			)}
			{...props}
		/>
	);
}
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Title
		ref={ref}
		className={cn('text-foreground text-lg font-semibold', className)}
		{...props}
	/>
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Description
		ref={ref}
		className={cn('text-muted-foreground text-sm', className)}
		{...props}
	/>
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

const sheetVariants = tv({
	base: [
		'fixed z-50 flex flex-col overflow-hidden shadow-md will-change-transform focus:outline-none bg-background rounded-l-xl rounded-br-xl',
		borderStyle({
			showBorder: true,
			borderColor: 'background',
			showShadowInset: true,
			shadowColor: 'border',
			removeOnActive: false,
		}),
	],
	variants: {
		side: {
			top: 'inset-x-0 top-0 mx-auto my-2 max-h-[95dvh] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
			right:
				'inset-y-0 right-0 m-2 h-[calc(100dvh-1rem)] w-screen min-w-[150px] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
			bottom:
				'inset-x-0 bottom-0 mx-auto my-2 max-h-[95dvh] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
			left: 'inset-y-0 left-0 m-2 h-[calc(100dvh-1rem)] w-screen min-w-[150px] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
		},
		contentHeight: {
			auto: 'h-auto',
			fit: 'h-fit',
			full: 'h-[calc(100dvh-1rem)] justify-between',
		},
		contentWidth: {
			xs: 'max-w-xs',
			sm: 'max-w-sm',
			md: 'max-w-md',
			lg: 'max-w-lg',
			xl: 'max-w-xl',
			'2xl': 'sm:max-w-2xl',
			'3xl': 'sm:max-w-2xl md:max-w-3xl',
			'4xl': 'sm:max-w-2xl md:max-w-3xl lg:max-w-4xl',
			'5xl': 'sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl',
			full: 'max-w-full',
			fit: 'w-fit',
		},
		reducedMotion: {
			true: '!animate-none',
			false: [
				'data-[state=open]:animate-in data-[state=open]:animation-duration-150',
				'data-[state=closed]:animate-out data-[state=closed]:animation-duration-200',
			],
		},
		disableAnimations: {
			true: 'transition-none',
			false: 'transition ease-in-out',
		},
	},
	defaultVariants: {
		side: 'right',
		contentWidth: 'md',
		reducedMotion: false,
		disableAnimations: false,
	},
});

interface SheetContentProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
		VariantProps<typeof sheetVariants> {
	hideCloseButton?: boolean;
	hideTitle?: boolean;
	container?: HTMLElement;
	classNames?: {
		overlay?: string;
		pattern?: string;
		content?: string;
		closeButton?: string;
		header?: string;
		title?: string;
		description?: string;
		body?: string;
		footer?: string;
	};
	sheetHeader?: React.ReactNode;
	sheetTitle?: string;
	sheetDescription?: string;
	sheetFooter?: React.ReactNode;
	reducedTransparency?: boolean;
	ref?: Ref<HTMLDivElement>;
}

function SheetContent({
	children,
	hideCloseButton,
	hideTitle,
	container,
	className,
	classNames,
	side,
	contentWidth,
	contentHeight,
	sheetDescription,
	sheetFooter,
	sheetHeader,
	sheetTitle,
	reducedMotion = false,
	disableAnimations = false,
	ref,
	onPointerDownOutside,
	...props
}: SheetContentProps) {
	return (
		<SheetPortal container={container}>
			<SheetOverlay
				classNames={{
					overlay: classNames?.overlay,
					pattern: classNames?.pattern,
				}}
			/>
			<SheetPrimitive.Content
				ref={ref}
				className={cn(
					sheetVariants({ side, contentHeight, contentWidth, disableAnimations, reducedMotion }),
					className,
					classNames?.content,
				)}
				onPointerDownOutside={(e) => {
					// don't dismiss dialog when clicking inside the toast
					if (e.target instanceof Element && e.target.closest('[data-sonner-toast]')) {
						e.preventDefault();
					}
					onPointerDownOutside?.(e);
				}}
				{...props}
			>
				<div className="absolute top-0 left-0 z-[-3] m-1 size-[calc(100%-8px)] rounded-md bg-[url(/assets/images/zzz-text-bg.png)] bg-cover bg-no-repeat invert-[0.95] dark:invert-0" />
				<div className="pattern-rhombus pattern-bg-muted pattern-background pattern-opacity-10 pattern-size-2 absolute top-0 left-0 z-[-2] size-full rounded-t-xl" />
				{sheetHeader || sheetTitle ? (
					hideTitle ? (
						<VisuallyHidden>
							<SheetHeader
								className={cn(
									'shrink-0 grow-0',
									hideCloseButton ? '' : 'pr-16',
									classNames?.header,
								)}
							>
								{sheetHeader ? (
									<>{sheetHeader}</>
								) : (
									<>
										<SheetTitle className={classNames?.title}>{sheetTitle}</SheetTitle>
										{sheetDescription ? (
											<SheetDescription className={classNames?.description}>
												{sheetDescription}
											</SheetDescription>
										) : null}
									</>
								)}
							</SheetHeader>
						</VisuallyHidden>
					) : (
						<SheetHeader
							className={cn('shrink-0 grow-0', hideCloseButton ? '' : 'pr-16', classNames?.header)}
						>
							{sheetHeader ? (
								<>{sheetHeader}</>
							) : (
								<>
									<SheetTitle className={classNames?.title}>{sheetTitle}</SheetTitle>
									{sheetDescription ? (
										<SheetDescription className={classNames?.description}>
											{sheetDescription}
										</SheetDescription>
									) : null}
								</>
							)}
						</SheetHeader>
					)
				) : null}
				<SheetBody
					className={cn(
						'shrink-0 grow',
						`${sheetHeader || sheetTitle ? '' : 'rounded-t-medium'} ${
							sheetFooter ? '' : 'rounded-b-medium'
						}`,
						classNames?.body,
					)}
				>
					{children}
				</SheetBody>
				{sheetFooter ? (
					<SheetFooter className={cn('shrink-0 grow-0', classNames?.footer)}>
						{sheetFooter}
					</SheetFooter>
				) : null}
				{!hideCloseButton ? (
					<SheetPrimitive.Close
						asChild
						className={cn('absolute top-4 right-4', classNames?.closeButton)}
					>
						<Button
							showBgPattern
							aria-label="Close"
							icon="close-bold"
							size="sm"
							variant="destructive-invert"
						>
							<span className="sr-only">Close</span>
						</Button>
					</SheetPrimitive.Close>
				) : null}
			</SheetPrimitive.Content>
		</SheetPortal>
	);
}

export interface SheetProps {
	children: React.ReactNode;
	trigger?: React.ReactNode;
	className?: string;
	classNames?: {
		overlay?: string;
		pattern?: string;
		content?: string;
		closeButton?: string;
		header?: string;
		title?: string;
		description?: string;
		body?: string;
		footer?: string;
		handle?: string;
	};
	showSheet: boolean;
	setShowSheet: React.Dispatch<React.SetStateAction<boolean>>;
	desktopOnly?: boolean;
	container?: HTMLElement;
	sheetHeader?: React.ReactNode;
	sheetTitle?: string;
	sheetDescription?: string;
	sheetFooter?: React.ReactNode;
	hideCloseButton?: boolean;
	side?: 'top' | 'right' | 'bottom' | 'left';
	contentHeight?: 'auto' | 'fit' | 'full';
	contentWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full' | 'fit';
	disableAnimations?: boolean;
	hideTitle?: boolean;
	onClose?: () => void;
	showTooltip?: boolean;
	tooltipProps?: {
		provider?: Omit<React.ComponentProps<typeof TooltipPrimitive.Provider>, 'children'>;
		root?: Omit<React.ComponentProps<typeof TooltipPrimitive.Root>, 'children'>;
		content?: React.ComponentProps<typeof TooltipPrimitive.Content>;
	};
}

function Sheet(props: SheetProps) {
	const {
		children,
		trigger,
		className,
		classNames,
		showSheet,
		setShowSheet,
		desktopOnly,
		container,
		sheetHeader,
		sheetTitle,
		sheetDescription,
		sheetFooter,
		hideCloseButton,
		side,
		contentHeight,
		contentWidth,
		disableAnimations = false,
		hideTitle,
		onClose,
		showTooltip = false,
		tooltipProps,
	} = props;
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });

	const closeSheet = () => {
		if (onClose) onClose();
		setShowSheet(false);
	};

	if ((isSm || isMobileOnly) && !desktopOnly) {
		const drawerTrigger = (
			<DrawerTrigger asChild className={!isMobileOnly && isSm ? 'sm:hidden' : ''}>
				{trigger}
			</DrawerTrigger>
		);
		return (
			<DrawerRoot
				open={showSheet}
				onOpenChange={(open: boolean) => {
					if (!open) {
						closeSheet();
					}
				}}
			>
				{trigger ? (
					showTooltip ? (
						<TooltipProvider {...tooltipProps?.provider}>
							<Tooltip {...tooltipProps?.root}>
								<TooltipTrigger asChild>{drawerTrigger}</TooltipTrigger>
								<TooltipContent {...tooltipProps?.content}>
									{tooltipProps?.content?.children || 'Open Sheet'}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						drawerTrigger
					)
				) : null}
				<DrawerContent
					hideCloseButton
					aria-describedby={sheetDescription || undefined}
					className={className}
					classNames={classNames}
					container={container}
					contentHeight={contentHeight}
					disableAnimations={disableAnimations}
					drawerDescription={sheetDescription}
					drawerFooter={sheetFooter}
					drawerHeader={sheetHeader}
					drawerTitle={sheetTitle}
					hideTitle={hideTitle}
				>
					{children}
				</DrawerContent>
			</DrawerRoot>
		);
	}

	const sheetTrigger = (
		<SheetTrigger asChild className="sm:inline-flex">
			{trigger}
		</SheetTrigger>
	);

	return (
		<SheetRoot
			open={showSheet}
			onOpenChange={(open) => {
				if (!open) {
					closeSheet();
				}
			}}
		>
			{trigger ? (
				showTooltip ? (
					<TooltipProvider {...tooltipProps?.provider}>
						<Tooltip {...tooltipProps?.root}>
							<TooltipTrigger asChild>{sheetTrigger}</TooltipTrigger>
							<TooltipContent {...tooltipProps?.content}>
								{tooltipProps?.content?.children || 'Open Sheet'}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					sheetTrigger
				)
			) : null}
			<SheetContent
				aria-describedby={sheetDescription || undefined}
				className={className}
				classNames={classNames}
				container={container}
				contentHeight={contentHeight}
				contentWidth={contentWidth}
				disableAnimations={disableAnimations}
				hideCloseButton={hideCloseButton}
				hideTitle={hideTitle}
				sheetDescription={sheetDescription}
				sheetFooter={sheetFooter}
				sheetHeader={sheetHeader}
				sheetTitle={sheetTitle}
				side={side}
			>
				{children}
			</SheetContent>
		</SheetRoot>
	);
}

export {
	Sheet,
	SheetRoot,
	SheetPortal,
	SheetOverlay,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
