import * as React from 'react';

import { cn } from '@/utils/common/misc';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				className={cn(
					'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					className,
				)}
				{...props}
			/>
		);
	},
);
Input.displayName = 'Input';

export { Input };
