import * as React from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';

import type { VariantProps } from 'tailwind-variants';

const badgeVariants = tv({
	base: 'inline-flex items-center rounded-full border-2 border-background px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	variants: {
		variant: {
			default: 'bg-muted text-muted-foreground',
			primary: 'bg-primary text-primary-foreground',
			secondary: 'bg-secondary text-secondary-foreground',
			destructive: 'bg-destructive text-destructive-foreground',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
