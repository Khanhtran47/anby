import { tv } from 'tailwind-variants';

const borderStyle = tv({
	base: 'border-background shadow-[inset_0_0_0_4px]',
	variants: {
		showBorder: {
			true: 'border-2',
		},
		borderColor: {
			background: 'border-background',
			primary: 'border-primary',
			destructive: 'border-destructive',
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
		removeOnActive: {
			true: 'active:shadow-none active:border-none group-active:shadow-none group-active:border-none',
		},
	},
	defaultVariants: {
		showBorder: true,
		borderColor: 'background',
		showShadowInset: true,
		shadowColor: 'border',
		removeOnActive: true,
	},
});

export { borderStyle };
