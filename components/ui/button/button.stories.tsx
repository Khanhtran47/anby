import React from 'react';

import { Button, buttonVariants } from './button';

import type { Meta } from '@storybook/react';
import type { ButtonProps } from './button';

export default {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: {
				type: 'select',
			},
			options: ['default', 'destructive'],
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['sm', 'md', 'lg', 'icon'],
		},
		isDisabled: {
			control: {
				type: 'boolean',
			},
		},
		icon: {
			control: {
				type: 'text',
			},
		},
		wrapIcon: {
			control: {
				type: 'boolean',
			},
		},
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Button>;

const defaultProps = {
	children: 'Button',
	icon: undefined,
	...buttonVariants.defaultVariants,
};

function StateTemplate(args: ButtonProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	const handlePress = (e: any) => {
		// eslint-disable-next-line no-console
		console.log('Pressed', e);
		setIsOpen((prev) => !prev);
	};

	return (
		<Button
			{...args}
			aria-label={isOpen ? 'Close' : 'Open'}
			aria-pressed={isOpen}
			onClick={handlePress}
		>
			{isOpen ? 'Close' : 'Open'}
		</Button>
	);
}

export const Default = {
	args: {
		...defaultProps,
	},
};

export const Destructive = {
	args: {
		...defaultProps,
		variant: 'destructive',
	},
};

export const BackgroundPattern = {
	args: {
		...defaultProps,
		showBgPattern: true,
	},
};

export const Disabled = {
	args: {
		...defaultProps,
		isDisabled: true,
	},
};

export const WithIcon = {
	args: {
		...defaultProps,
		children: 'Home',
		wrapIcon: false,
		icon: 'home-bold',
	},
};

export const IconWithWrapper = {
	args: {
		...defaultProps,
		children: 'Home',
		wrapIcon: true,
		icon: 'home-bold',
	},
};

export const WithIconOnly = {
	args: {
		...defaultProps,
		children: undefined,
		icon: 'home-bold',
		size: 'icon',
		'aria-label': 'Home',
	},
};

export const GoBackButton = {
	args: {
		...defaultProps,
		children: undefined,
		icon: 'arrow-go-back-bold',
		variant: 'destructive',
		'aria-label': 'return',
	},
};

export const WithState = {
	render: StateTemplate,

	args: {
		...defaultProps,
	},
};
