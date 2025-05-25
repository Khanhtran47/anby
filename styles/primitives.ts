import { tv } from 'tailwind-variants';

const borderStyle = tv({
	base: 'border-background shadow-[inset_0_0_0_4px]',
	variants: {
		showBorder: {
			true: 'border-2',
			false: 'border-0',
		},
		borderColor: {
			background: 'border-background',
			primary: 'border-primary',
			destructive: 'border-destructive',
			border: 'border-border',
		},
		showShadowInset: {
			true: 'shadow-[inset_0_0_0_4px]',
			false: 'shadow-none',
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
		removeOnHover: {
			true: 'hover:shadow-none hover:border-none group-hover:shadow-none group-hover:border-none',
		},
	},
	defaultVariants: {
		showBorder: true,
		borderColor: 'background',
		showShadowInset: true,
		shadowColor: 'border',
		removeOnActive: true,
		removeOnHover: false,
	},
});

export { borderStyle };
