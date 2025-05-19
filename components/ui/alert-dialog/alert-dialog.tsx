'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
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

const AlertDialogRoot = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.AlertDialogPortalProps) {
	return <AlertDialogPrimitive.Portal {...props} />;
}

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> & {
		classNames?: {
			overlay?: string;
			pattern?: string;
		};
	}
>(({ className, classNames, ...props }, ref) => (
	<AlertDialogPrimitive.Overlay
		ref={ref}
		className={cn(
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:animation-duration-200 data-[state=open]:animation-duration-150 fixed inset-0 z-40 bg-black/10 backdrop-blur-sm',
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
	</AlertDialogPrimitive.Overlay>
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

function AlertDialogHeader({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('relative flex flex-col gap-y-1.5 p-6', className)} {...props}>
			<div className="bg-background/80 absolute top-0 left-0 z-[-1] mx-1 mt-1 h-full w-[calc(100%-8px)] rounded-t-md" />
			{children}
		</div>
	);
}
AlertDialogHeader.displayName = 'AlertDialogHeader';

function AlertDialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('bg-background m-6 rounded-xl p-3', className)} {...props} />;
}
AlertDialogBody.displayName = 'AlertDialogBody';

function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
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
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Title
		ref={ref}
		className={cn(
			'text-center text-lg leading-none font-semibold tracking-tight sm:text-left',
			className,
		)}
		{...props}
	/>
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Description
		ref={ref}
		className={cn('text-muted-foreground text-sm', className)}
		{...props}
	/>
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Action>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, children, ...props }, ref) => (
	<AlertDialogPrimitive.Action ref={ref} asChild className={className} {...props}>
		<Button
			wrapIcon
			icon="check-circle-bold"
			classNames={{
				root: 'w-full',
				icon: 'text-green-500',
			}}
		>
			{children || <VisuallyHidden>Confirm</VisuallyHidden>}
		</Button>
	</AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, children, ...props }, ref) => (
	<AlertDialogPrimitive.Cancel ref={ref} asChild className={className} {...props}>
		<Button
			wrapIcon
			icon="close-circle-bold"
			classNames={{
				root: 'w-full',
				icon: 'text-red-500',
			}}
		>
			{children || <VisuallyHidden>Cancel</VisuallyHidden>}
		</Button>
	</AlertDialogPrimitive.Cancel>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

const alertDialogContentClasses = tv({
	base: [
		'fixed left-1/2 top-1/2 z-50 flex max-h-[95dvh] min-h-[150px] w-screen -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl shadow-md will-change-transform bg-background',
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
function AlertDialogContent({
	className,
	classNames,
	children,
	container,
	alertDialogHeader,
	alertDialogTitle,
	alertDialogDescription,
	alertDialogFooter,
	contentHeight = 'fit',
	contentWidth = 'fit',
	alertDialogAction,
	alertDialogCancel,
	onClickAction,
	onClickCancel,
	hideTitle,
	reducedMotion = false,
	disableAnimations = false,
	setShowAlertDialog,
	ref,
	...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> &
	VariantProps<typeof alertDialogContentClasses> & {
		container?: HTMLElement;
		classNames?: {
			overlay?: string;
			content?: string;
			header?: string;
			title?: string;
			description?: string;
			body?: string;
			footer?: string;
			cancelButton?: string;
			actionButton?: string;
		};
		alertDialogHeader?: React.ReactNode;
		alertDialogFooter?: React.ReactNode;
		alertDialogCancel?: React.ReactNode;
		alertDialogAction?: React.ReactNode;
		onClickCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
		onClickAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
		alertDialogTitle?: string;
		alertDialogDescription?: string;
		hideTitle?: boolean;
		reducedMotion?: boolean;
		disableAnimations?: boolean;
		setShowAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
		ref?: Ref<HTMLDivElement>;
	}) {
	return (
		<AlertDialogPortal container={container}>
			<AlertDialogOverlay className={classNames?.overlay} />
			<AlertDialogPrimitive.Content
				ref={ref}
				className={alertDialogContentClasses({
					contentHeight,
					contentWidth,
					reducedMotion: disableAnimations || reducedMotion,
					className: className || classNames?.content,
				})}
				{...props}
			>
				<div className="absolute top-0 left-0 z-[-3] m-1 size-[calc(100%-8px)] rounded-md bg-[url(/assets/images/zzz-text-bg.png)] bg-cover bg-no-repeat invert-[0.95] dark:invert-0" />
				<div className="pattern-rhombus pattern-bg-muted pattern-background pattern-opacity-10 pattern-size-2 absolute top-0 left-0 z-[-2] size-full rounded-t-xl" />
				{alertDialogHeader || alertDialogTitle ? (
					hideTitle ? (
						<VisuallyHidden>
							<AlertDialogHeader className={cn('shrink-0 grow-0 pr-16', classNames?.header)}>
								{alertDialogHeader ? (
									<>{alertDialogHeader}</>
								) : (
									<>
										<AlertDialogTitle className={classNames?.title}>
											{alertDialogTitle}
										</AlertDialogTitle>
										{alertDialogDescription ? (
											<AlertDialogDescription className={classNames?.description}>
												{alertDialogDescription}
											</AlertDialogDescription>
										) : null}
									</>
								)}
							</AlertDialogHeader>
						</VisuallyHidden>
					) : (
						<AlertDialogHeader className={cn('shrink-0 grow-0 pr-16', classNames?.header)}>
							{alertDialogHeader ? (
								<>{alertDialogHeader}</>
							) : (
								<>
									<AlertDialogTitle className={classNames?.title}>
										{alertDialogTitle}
									</AlertDialogTitle>
									{alertDialogDescription ? (
										<AlertDialogDescription className={classNames?.description}>
											{alertDialogDescription}
										</AlertDialogDescription>
									) : null}
								</>
							)}
						</AlertDialogHeader>
					)
				) : null}
				<AlertDialogBody
					className={cn(
						'shrink-0 grow',
						`${alertDialogHeader || alertDialogTitle ? '' : 'rounded-t-medium'}`,
						classNames?.body,
					)}
				>
					{children}
				</AlertDialogBody>
				<AlertDialogFooter className={cn('shrink-0 grow-0', classNames?.footer)}>
					{alertDialogFooter}
					<AlertDialogCancel
						className={classNames?.cancelButton}
						onClick={(e) => {
							if (onClickCancel) onClickCancel(e);
							setShowAlertDialog(false);
						}}
					>
						{alertDialogCancel}
					</AlertDialogCancel>
					<AlertDialogAction
						className={classNames?.actionButton}
						onClick={(e) => {
							if (onClickAction) onClickAction(e);
							setShowAlertDialog(false);
						}}
					>
						{alertDialogAction}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogPrimitive.Content>
		</AlertDialogPortal>
	);
}

export interface AlertDialogProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root> {
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
		cancelButton?: string;
		actionButton?: string;
	};
	showAlertDialog: boolean;
	setShowAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
	desktopOnly?: boolean;
	container?: HTMLElement;
	alertDialogHeader?: React.ReactNode;
	alertDialogTitle?: string;
	alertDialogDescription?: string;
	alertDialogFooter?: React.ReactNode;
	contentHeight?: 'auto' | 'fit' | 'full';
	contentWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'fit' | 'full';
	alertDialogCancel?: React.ReactNode;
	alertDialogAction?: React.ReactNode;
	onClickCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onClickAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disableAnimations?: boolean;
	hideTitle?: boolean;
	showTooltip?: boolean;
	tooltipProps?: TooltipProps;
}

function AlertDialog(props: AlertDialogProps) {
	const {
		children,
		className,
		classNames,
		showAlertDialog,
		setShowAlertDialog,
		desktopOnly,
		container,
		alertDialogHeader,
		alertDialogTitle,
		alertDialogDescription,
		alertDialogFooter,
		contentHeight,
		contentWidth,
		alertDialogAction,
		alertDialogCancel,
		onClickAction,
		onClickCancel,
		hideTitle,
		trigger,
		disableAnimations = false,
		showTooltip,
		tooltipProps,
		...rest
	} = props;
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
	if ((isSm || isMobileOnly) && !desktopOnly) {
		const drawerTrigger = (
			<DrawerTrigger asChild className={!isMobileOnly && isSm ? 'sm:hidden' : ''}>
				{trigger}
			</DrawerTrigger>
		);
		return (
			<DrawerRoot open={showAlertDialog} onOpenChange={setShowAlertDialog}>
				{trigger ? (
					showTooltip ? (
						<TooltipProvider {...tooltipProps?.provider}>
							<Tooltip {...tooltipProps?.root}>
								<TooltipTrigger asChild>{drawerTrigger}</TooltipTrigger>
								<TooltipContent {...tooltipProps?.content}>
									{tooltipProps?.content?.children || 'Open Alert Dialog'}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						drawerTrigger
					)
				) : null}
				<DrawerContent
					hideCloseButton
					aria-describedby={alertDialogDescription || undefined}
					className={className}
					classNames={classNames}
					container={container}
					contentHeight={contentHeight}
					disableAnimations={disableAnimations}
					drawerDescription={alertDialogDescription}
					drawerHeader={alertDialogHeader}
					drawerTitle={alertDialogTitle}
					hideTitle={hideTitle}
					drawerFooter={
						<>
							{alertDialogFooter}
							<Button
								wrapIcon
								className={classNames?.cancelButton}
								icon="close-circle-bold"
								classNames={{
									root: 'w-full',
									icon: 'text-red-500',
								}}
								onClick={(e) => {
									if (onClickCancel) onClickCancel(e);
									if (setShowAlertDialog) {
										setShowAlertDialog(false);
									}
								}}
							>
								{alertDialogCancel}
							</Button>
							<Button
								wrapIcon
								className={classNames?.actionButton}
								icon="check-circle-bold"
								classNames={{
									root: 'w-full',
									icon: 'text-green-500',
								}}
								onClick={(e) => {
									if (onClickAction) onClickAction(e);
									if (setShowAlertDialog) {
										setShowAlertDialog(false);
									}
								}}
							>
								{alertDialogAction}
							</Button>
						</>
					}
				>
					{children}
				</DrawerContent>
			</DrawerRoot>
		);
	}

	const alertDialogTrigger = (
		<AlertDialogTrigger asChild className="sm:inline-flex">
			{trigger}
		</AlertDialogTrigger>
	);

	return (
		<AlertDialogRoot open={showAlertDialog} onOpenChange={setShowAlertDialog}>
			{trigger ? (
				showTooltip ? (
					<TooltipProvider {...tooltipProps?.provider}>
						<Tooltip {...tooltipProps?.root}>
							<TooltipTrigger asChild>{alertDialogTrigger}</TooltipTrigger>
							<TooltipContent {...tooltipProps?.content}>
								{tooltipProps?.content?.children || 'Open Alert Dialog'}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					alertDialogTrigger
				)
			) : null}
			<AlertDialogContent
				alertDialogAction={alertDialogAction}
				alertDialogCancel={alertDialogCancel}
				alertDialogDescription={alertDialogDescription}
				alertDialogFooter={alertDialogFooter}
				alertDialogHeader={alertDialogHeader}
				alertDialogTitle={alertDialogTitle}
				aria-describedby={alertDialogDescription || undefined}
				className={className}
				classNames={classNames}
				container={container}
				contentHeight={contentHeight}
				contentWidth={contentWidth}
				hideTitle={hideTitle}
				setShowAlertDialog={setShowAlertDialog}
				onClickAction={onClickAction}
				onClickCancel={onClickCancel}
				{...rest}
			>
				{children}
			</AlertDialogContent>
		</AlertDialogRoot>
	);
}

export {
	AlertDialog,
	AlertDialogRoot,
	AlertDialogPortal,
	AlertDialogOverlay,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
};
