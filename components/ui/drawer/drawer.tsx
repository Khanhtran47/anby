'use client';

import * as React from 'react';
import { tv } from 'tailwind-variants';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/utils/common/misc';
import VisuallyHidden from '@/utils/react/visually-hidden';
import { borderStyle } from '@/styles/primitives';

import { Button } from '../button';

import type { Ref } from 'react';

const DrawerRoot = DrawerPrimitive.Root;

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
	React.ComponentRef<typeof DrawerPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
		classNames?: {
			overlay?: string;
			pattern?: string;
		};
	}
>(({ className, classNames, ...props }, ref) => (
	<DrawerPrimitive.Overlay
		ref={ref}
		className={cn(
			'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-black/10 backdrop-blur-sm',
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
	</DrawerPrimitive.Overlay>
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

function DrawerHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('relative flex flex-col gap-y-1.5 p-6 text-center sm:text-left', className)}
			{...props}
		>
			<div className="bg-background/80 absolute top-0 left-0 z-[-1] mx-1 mt-1 h-full w-[calc(100%-8px)] rounded-t-md" />
			{children}
		</div>
	);
}
DrawerHeader.displayName = 'DrawerHeader';

function DrawerBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn('bg-background mx-3 mt-6 mb-3 rounded-xl p-2', className)} {...props} />
	);
}
DrawerBody.displayName = 'DrawerBody';

function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'border-border 2xs:p-4 mt-auto flex flex-col items-center gap-2 border-t-4 px-4 py-2 sm:flex-row sm:justify-around',
				className,
			)}
			{...props}
		/>
	);
}
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
	React.ComponentRef<typeof DrawerPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Title
		ref={ref}
		className={cn('not-prose s9 text-center !font-black sm:text-left', className)}
		{...props}
	/>
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
	React.ComponentRef<typeof DrawerPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DrawerPrimitive.Description
		ref={ref}
		className={cn('text-muted-foreground text-sm', className)}
		{...props}
	/>
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

const drawerContentClasses = tv({
	base: [
		'fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[95dvh] min-h-[150px] max-w-screen-sm flex-col overflow-hidden rounded-t-xl border border-default shadow-md focus:outline-none 2xs:mx-2 2xs:mb-2 2xs:rounded-b-xl sm:mx-auto bg-background',
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
	},
});

function DrawerContent({
	className,
	classNames,
	children,
	hideCloseButton = true,
	container,
	drawerHeader,
	drawerTitle,
	drawerDescription,
	drawerFooter,
	contentHeight,
	disableAnimations = false,
	hideTitle,
	ref,
	onInteractOutside,
	...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
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
		handle?: string;
	};
	drawerHeader?: React.ReactNode;
	drawerTitle?: string;
	drawerDescription?: string;
	drawerFooter?: React.ReactNode;
	contentHeight?: 'auto' | 'fit' | 'full';
	disableAnimations?: boolean;
	hideTitle?: boolean;
	ref?: Ref<HTMLDivElement>;
}) {
	return (
		<DrawerPortal container={container}>
			<DrawerOverlay className={cn(classNames?.overlay)} />
			<DrawerPrimitive.Content
				ref={ref}
				className={drawerContentClasses({
					contentHeight,
					className: className ? className : classNames?.content,
				})}
				onInteractOutside={(e) => {
					// don't dismiss dialog when clicking inside the toast or PhotoSwipe
					if (
						e.target instanceof Element &&
						(e.target.closest('[data-sonner-toast]') || e.target.closest('.pswp'))
					) {
						e.preventDefault();
					}
					onInteractOutside?.(e);
				}}
				{...props}
			>
				<div
					className={cn(
						'bg-muted absolute top-2.5 left-1/2 z-30 h-2 w-[100px] -translate-x-1/2 rounded-full',
						classNames?.handle,
					)}
				/>
				<div className="2xs:rounded-b-md absolute top-0 left-0 z-[-3] m-1 size-[calc(100%-8px)] rounded-t-md bg-[url(/assets/images/zzz-text-bg.png)] bg-cover bg-no-repeat invert-[0.95] dark:invert-0" />
				<div className="pattern-rhombus pattern-bg-muted pattern-background pattern-opacity-10 pattern-size-2 absolute top-0 left-0 z-[-2] size-full rounded-t-xl" />
				{drawerHeader || drawerTitle ? (
					hideTitle ? (
						<VisuallyHidden>
							<DrawerHeader className={cn('shrink-0 grow-0', classNames?.header)}>
								{drawerHeader ? (
									<>{drawerHeader}</>
								) : (
									<>
										<DrawerTitle className={classNames?.title}>{drawerTitle}</DrawerTitle>
										{drawerDescription ? (
											<DrawerDescription className={classNames?.description}>
												{drawerDescription}
											</DrawerDescription>
										) : null}
									</>
								)}
							</DrawerHeader>
						</VisuallyHidden>
					) : (
						<DrawerHeader className={cn('shrink-0 grow-0', classNames?.header)}>
							{drawerHeader ? (
								<>{drawerHeader}</>
							) : (
								<>
									<DrawerTitle className={classNames?.title}>{drawerTitle}</DrawerTitle>
									{drawerDescription ? (
										<DrawerDescription className={classNames?.description}>
											{drawerDescription}
										</DrawerDescription>
									) : null}
								</>
							)}
						</DrawerHeader>
					)
				) : null}
				<DrawerBody
					className={cn(
						'shrink grow',
						`${drawerHeader || drawerTitle ? '' : 'rounded-t-medium pt-8'}`,
						classNames?.body,
					)}
				>
					{children}
				</DrawerBody>
				{drawerFooter ? (
					<DrawerFooter className={cn('shrink-0 grow-0', classNames?.footer)}>
						{drawerFooter}
					</DrawerFooter>
				) : null}
				{!hideCloseButton ? (
					<DrawerClose
						asChild
						className={cn(
							'absolute top-4 right-4 opacity-70 hover:opacity-100',
							disableAnimations ? 'transition-none' : 'transition-opacity',
							classNames?.closeButton,
						)}
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
					</DrawerClose>
				) : null}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
}

export {
	DrawerRoot,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
};
