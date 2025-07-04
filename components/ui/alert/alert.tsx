import * as React from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

import { Button } from '../button';
import { Icon } from '../icon';

import type { IconName } from '@/icon-name';
import type { VariantProps } from 'tailwind-variants';

const alertVariants = tv({
	base: [
		'relative w-full rounded-xl border px-4 py-3 grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:translate-y-0.5 [&>svg]:text-current',
		borderStyle({
			showBorder: true,
			borderColor: 'background',
			showShadowInset: true,
			shadowColor: 'border',
			removeOnActive: false,
		}),
	],
	variants: {
		variant: {
			default: 'bg-card text-card-foreground',
			destructive:
				'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

function AlertContent({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			className={cn(alertVariants({ variant }), className)}
			data-slot="alert"
			role="alert"
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				'col-start-2 line-clamp-1 min-h-4 text-xl font-black tracking-tight',
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-base font-black [&_p]:leading-relaxed',
				className,
			)}
			{...props}
		/>
	);
}

type AlertProps = React.ComponentPropsWithRef<'div'> &
	VariantProps<typeof alertVariants> & {
		isVisible?: boolean;
		title?: React.ReactNode;
		description?: React.ReactNode;
		icon?: IconName;
		isClosable?: boolean;
		onClose?: () => void;
		onVisibilityChange?: (isVisible: boolean) => void;
	};

function Alert(props: AlertProps) {
	const {
		className,
		variant = 'default',
		isVisible = true,
		title,
		description,
		icon,
		isClosable = false,
		onClose,
		onVisibilityChange,
		ref,
		...rest
	} = props;

	const handleClose = () => {
		if (onClose) onClose();
		if (onVisibilityChange) onVisibilityChange(!isVisible);
	};

	if (!isVisible) return null;

	return (
		<AlertContent ref={ref} className={className} variant={variant} {...rest}>
			{icon ? <Icon name={icon} /> : null}
			{title ? <AlertTitle>{title}</AlertTitle> : null}
			{description ? <AlertDescription>{description}</AlertDescription> : null}
			{isClosable ? (
				<Button
					aria-label="Close alert"
					icon="close-bold"
					variant="ghost"
					classNames={{
						root: 'absolute top-1 right-1 size-9',
						icon: 'size-4',
					}}
					onClick={handleClose}
				/>
			) : null}
		</AlertContent>
	);
}

export { Alert, AlertContent, AlertTitle, AlertDescription };
