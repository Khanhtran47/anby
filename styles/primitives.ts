import { tv } from 'tailwind-variants';

const borderStyle = tv({
	base: 'border-background shadow-[inset_0_0_0_4px]',
	variants: {
		showBorder: {
			true: 'border-2',
		},
		borderColor: {
			background: 'bg-background',
			primary: 'bg-primary',
			destructive: 'bg-destructive',
		},
		showShadowInset: {
			true: 'shadow-[inset_0_0_0_4px]',
		},
		shadowColor: {
			background: 'shadow-background',
			primary: 'shadow-primary',
			destructive: 'shadow-destructive',
			border: 'shadow-border',
		},
	},
	defaultVariants: {
		showBorder: true,
		borderColor: 'background',
		showShadowInset: true,
		shadowColor: 'border',
	},
});

export { borderStyle };
