import * as React from 'react';

import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				className={cn(
					'placeholder:text-muted-foreground dark:bg-background flex h-10 w-full min-w-0 rounded-xl bg-transparent px-3 py-2 text-base transition-[color,box-shadow]',
					'selection:bg-primary selection:text-primary-foreground',
					'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
					'file:text-foreground file:inline-flex file:h-5 file:border-0 file:bg-transparent file:font-extrabold',
					'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
					'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
					borderStyle({
						showBorder: true,
						borderColor: 'background',
						showShadowInset: true,
						shadowColor: 'border',
						removeOnActive: false,
					}),
					className,
				)}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
