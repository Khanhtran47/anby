import { useState } from 'react';

import { Button } from '../button';
import { Alert } from './alert';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 * Displays a callout for user attention.
 */
const meta = {
	title: 'Components/Alert',
	component: Alert,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			options: ['default', 'destructive'],
			control: { type: 'select' },
		},
		title: {
			control: { type: 'text' },
		},
		description: {
			control: { type: 'text' },
		},
		icon: {
			control: { type: 'text' },
			description: 'Icon name to display in the alert.',
		},
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Alert>;

const defaultProps = {
	title: 'Alert Title',
	description: 'This is an alert description to provide more context.',
	variant: 'default',
} as const;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the alert.
 */
export const Default: Story = {
	args: {
		...defaultProps,
	},
};

/**
 * Use the `destructive` alert to indicate a destructive action.
 */
export const Destructive: Story = {
	args: {
		...defaultProps,
		variant: 'destructive',
		title: 'Error',
		description: 'Your session has expired. Please log in again.',
	},
};

export const WithIcon: Story = {
	args: {
		...defaultProps,
		icon: 'alert-bold',
	},
};

function ControlledVisibilityComponent(args: any) {
	const [isVisible, setIsVisible] = useState(args.isVisible);

	if (!isVisible) {
		return <Button onClick={() => setIsVisible(true)}>Show Alert</Button>;
	}

	return <Alert {...args} isVisible={isVisible} onVisibilityChange={setIsVisible} />;
}

export const ControlledVisibility: Story = {
	args: {
		...defaultProps,
		isVisible: true,
		isClosable: true,
		onClose: () => alert('Alert closed'),
	},
	render: (args) => <ControlledVisibilityComponent {...args} />,
};
