'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useMediaQuery } from '@react-hookz/web';
import { isMobileOnly } from 'react-device-detect';
import { lazily } from 'react-lazily';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import VisuallyHidden from '@/utils/react/visually-hidden';
import { borderStyle } from '@/styles/primitives';

import { Button } from '../button';
import { DrawerContent, DrawerRoot, DrawerTrigger } from '../drawer';

import type { Ref } from 'react';
import type { VariantProps } from 'tailwind-variants';
import type { TooltipProps } from '../tooltip';

const { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } = lazily(
	() => import('../tooltip'),
);

const DialogRoot = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

function DialogPortal({ ...props }: DialogPrimitive.DialogPortalProps) {
	return <DialogPrimitive.Portal {...props} />;
}
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
		classNames?: {
			overlay?: string;
			pattern?: string;
		};
	}
>(({ className, classNames, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:animation-duration-200 data-[state=open]:animation-duration-150 fixed inset-0 z-40 cursor-pointer bg-black/10 backdrop-blur-sm',
			className,
			classNames?.overlay,
		)}
		{...props}
	>
		<div
			className={cn(
				'pattern-diagonal-lines pattern-bg-background pattern-bg-pattern pattern-opacity-60 pattern-size-2 size-full',
				classNames?.pattern,
			)}
		/>
	</DialogPrimitive.Overlay>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

function DialogHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('relative flex flex-col gap-y-1.5 p-6', className)} {...props}>
			<div className="bg-background/80 absolute top-0 left-0 z-[-1] mx-1 mt-1 h-full w-[calc(100%-8px)] rounded-t-md" />
			{children}
		</div>
	);
}
DialogHeader.displayName = 'DialogHeader';

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'rounded-b-medium border-border flex flex-col-reverse gap-y-2 border-t-4 p-6 sm:flex-row sm:justify-end sm:gap-x-2',
				className,
			)}
			{...props}
		/>
	);
}
DialogFooter.displayName = 'DialogFooter';

function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('bg-background m-6 rounded-xl p-3', className)} {...props} />;
}
DialogBody.displayName = 'DialogBody';

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn(
			'text-center text-lg leading-none font-semibold tracking-tight sm:text-left',
			className,
		)}
		{...props}
	/>
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn('text-muted-foreground text-sm', className)}
		{...props}
	/>
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const dialogContentClasses = tv({
	base: [
		'fixed left-1/2 top-1/2 z-50 flex max-h-[95dvh] min-h-[150px] w-screen -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-l-xl rounded-br-xl shadow-md will-change-transform bg-background',
		'focus:outline-none',
		borderStyle({
			showBorder: true,
			borderColor: 'background',
			showShadowInset: true,
			shadowColor: 'border',
			removeOnActive: false,
		}),
	],
	variants: {
		contentHeight: {
			auto: 'h-auto',
			fit: 'h-fit',
			full: 'h-full justify-between',
		},
		contentWidth: {
			xs: 'max-w-xs',
			sm: 'max-w-sm',
			md: 'max-w-md',
			lg: 'max-w-lg',
			xl: 'max-w-xl',
			'2xl': 'max-w-2xl',
			'3xl': 'max-w-3xl',
			'4xl': 'max-w-4xl',
			'5xl': 'max-w-5xl',
			fit: 'max-w-fit',
			full: 'max-w-full',
		},
		reducedMotion: {
			true: '!animate-none',
			false: [
				'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-[48%] data-[state=open]:animation-duration-150',
				'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-[48%] data-[state=closed]:animation-duration-200',
			],
		},
	},
	defaultVariants: {
		contentHeight: 'fit',
		contentWidth: 'fit',
		reducedMotion: false,
	},
});

function DialogContent({
	className,
	classNames,
	children,
	hideCloseButton,
	container,
	dialogHeader,
	dialogTitle,
	dialogDescription,
	dialogFooter,
	contentHeight = 'fit',
	contentWidth = 'fit',
	reducedMotion = false,
	disableAnimations = false,
	hideTitle,
	ref,
	onPointerDownOutside,
	...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
	VariantProps<typeof dialogContentClasses> & {
		hideCloseButton?: boolean;
		container?: HTMLElement;
		classNames?: {
			overlay?: string;
			content?: string;
			closeButton?: string;
			header?: string;
			title?: string;
			description?: string;
			body?: string;
			footer?: string;
		};
		dialogHeader?: React.ReactNode;
		dialogTitle?: string;
		dialogDescription?: string;
		dialogFooter?: React.ReactNode;
		disableAnimations?: boolean;
		reducedTransparency?: boolean;
		hideTitle?: boolean;
		ref?: Ref<HTMLDivElement>;
	}) {
	return (
		<DialogPortal container={container}>
			<DialogOverlay className={cn(classNames?.overlay)} />
			<DialogPrimitive.Content
				ref={ref}
				className={dialogContentClasses({
					contentHeight,
					contentWidth,
					reducedMotion: disableAnimations || reducedMotion,
					className: className || classNames?.content,
				})}
				onPointerDownOutside={(e) => {
					// don't dismiss dialog when clicking inside the toast
					if (e.target instanceof Element && e.target.closest('[data-sonner-toast]')) {
						e.preventDefault();
					}
					onPointerDownOutside?.(e);
				}}
				{...props}
			>
				<div className="absolute top-0 left-0 z-[-3] m-1 size-[calc(100%-8px)] rounded-md bg-[url(/assets/images/zzz-text-bg.png)] invert-[0.95] dark:invert-0" />
				<div className="pattern-rhombus pattern-bg-muted pattern-background pattern-opacity-10 pattern-size-2 absolute top-0 left-0 z-[-2] size-full rounded-t-xl" />
				{dialogHeader || dialogTitle ? (
					hideTitle ? (
						<VisuallyHidden>
							<DialogHeader
								className={cn(
									'shrink-0 grow-0',
									hideCloseButton ? '' : 'pr-16',
									classNames?.header,
								)}
							>
								{dialogHeader ? (
									<>{dialogHeader}</>
								) : (
									<>
										<DialogTitle className={classNames?.title}>{dialogTitle}</DialogTitle>
										{dialogDescription ? (
											<DialogDescription className={classNames?.description}>
												{dialogDescription}
											</DialogDescription>
										) : null}
									</>
								)}
							</DialogHeader>
						</VisuallyHidden>
					) : (
						<DialogHeader
							className={cn('shrink-0 grow-0', hideCloseButton ? '' : 'pr-16', classNames?.header)}
						>
							{dialogHeader ? (
								<>{dialogHeader}</>
							) : (
								<>
									<DialogTitle className={classNames?.title}>{dialogTitle}</DialogTitle>
									{dialogDescription ? (
										<DialogDescription className={classNames?.description}>
											{dialogDescription}
										</DialogDescription>
									) : null}
								</>
							)}
						</DialogHeader>
					)
				) : null}
				<DialogBody
					className={cn(
						'shrink-0 grow',
						`${dialogHeader || dialogTitle ? '' : 'rounded-t-medium'} ${
							dialogFooter ? '' : 'rounded-b-medium'
						}`,
						classNames?.body,
					)}
				>
					{children}
				</DialogBody>
				{dialogFooter ? (
					<DialogFooter className={cn('shrink-0 grow-0', classNames?.footer)}>
						{dialogFooter}
					</DialogFooter>
				) : null}
				{!hideCloseButton ? (
					<DialogPrimitive.Close
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
					</DialogPrimitive.Close>
				) : null}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

export interface DialogProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
	children: React.ReactNode;
	trigger?: React.ReactNode;
	className?: string;
	classNames?: {
		overlay?: string;
		content?: string;
		closeButton?: string;
		header?: string;
		title?: string;
		description?: string;
		body?: string;
		footer?: string;
		handle?: string;
	};
	showDialog: boolean;
	setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
	desktopOnly?: boolean;
	container?: HTMLElement;
	dialogHeader?: React.ReactNode;
	dialogTitle?: string;
	dialogDescription?: string;
	dialogFooter?: React.ReactNode;
	hideCloseButton?: boolean;
	contentHeight?: 'auto' | 'fit' | 'full';
	contentWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'fit' | 'full';
	reducedMotion?: boolean;
	disableAnimations?: boolean;
	hideTitle?: boolean;
	onClose?: () => void;
	showTooltip?: boolean;
	tooltipProps?: TooltipProps;
}

function Dialog(props: DialogProps) {
	const {
		children,
		trigger,
		className,
		classNames,
		showDialog,
		setShowDialog,
		desktopOnly,
		container,
		dialogHeader,
		dialogTitle,
		dialogDescription,
		dialogFooter,
		hideCloseButton,
		contentHeight,
		contentWidth,
		reducedMotion = false,
		disableAnimations = false,
		hideTitle,
		onClose,
		showTooltip,
		tooltipProps,
		...rest
	} = props;

	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
	const closeDialog = () => {
		if (onClose) onClose();
		setShowDialog(false);
	};

	if ((isSm || isMobileOnly) && !desktopOnly) {
		const drawerTrigger = (
			<DrawerTrigger asChild className={!isMobileOnly && isSm ? 'sm:hidden' : ''}>
				{trigger}
			</DrawerTrigger>
		);
		return (
			<DrawerRoot
				open={showDialog}
				onOpenChange={(open) => {
					if (!open) {
						closeDialog();
					}
				}}
			>
				{trigger ? (
					showTooltip ? (
						<TooltipProvider {...tooltipProps?.provider}>
							<Tooltip {...tooltipProps?.root}>
								<TooltipTrigger asChild>{drawerTrigger}</TooltipTrigger>
								<TooltipContent {...tooltipProps?.content}>
									{tooltipProps?.content?.children || 'Open Dialog'}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						drawerTrigger
					)
				) : null}
				<DrawerContent
					hideCloseButton
					aria-describedby={dialogDescription || undefined}
					className={className}
					classNames={classNames}
					container={container}
					contentHeight={contentHeight}
					disableAnimations={disableAnimations}
					drawerDescription={dialogDescription}
					drawerFooter={dialogFooter}
					drawerHeader={dialogHeader}
					drawerTitle={dialogTitle}
					hideTitle={hideTitle}
				>
					{children}
				</DrawerContent>
			</DrawerRoot>
		);
	}
	const dialogTrigger = (
		<DialogTrigger asChild className="sm:inline-flex">
			{trigger}
		</DialogTrigger>
	);

	return (
		<DialogRoot
			open={showDialog}
			onOpenChange={(open) => {
				if (!open) {
					closeDialog();
				}
			}}
		>
			{trigger ? (
				showTooltip ? (
					<TooltipProvider {...tooltipProps?.provider}>
						<Tooltip {...tooltipProps?.root}>
							<TooltipTrigger asChild>{dialogTrigger}</TooltipTrigger>
							<TooltipContent {...tooltipProps?.content}>
								{tooltipProps?.content?.children || 'Open Dialog'}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					dialogTrigger
				)
			) : null}
			<DialogContent
				aria-describedby={dialogDescription || undefined}
				className={className}
				classNames={classNames}
				container={container}
				contentHeight={contentHeight}
				contentWidth={contentWidth}
				dialogDescription={dialogDescription}
				dialogFooter={dialogFooter}
				dialogHeader={dialogHeader}
				dialogTitle={dialogTitle}
				disableAnimations={disableAnimations}
				hideCloseButton={hideCloseButton}
				hideTitle={hideTitle}
				reducedMotion={reducedMotion}
				{...rest}
			>
				{children}
			</DialogContent>
		</DialogRoot>
	);
}

export {
	Dialog,
	DialogRoot,
	DialogPortal,
	DialogOverlay,
	DialogClose,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
