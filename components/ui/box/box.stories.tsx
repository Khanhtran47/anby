import { Box } from './box';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'Components/Box',
	component: Box,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'select' as const,
			},
			options: ['sm', 'md', 'lg'],
		},
		radius: {
			control: {
				type: 'select' as const,
			},
			options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
		},
		shadow: {
			control: {
				type: 'select' as const,
			},
			options: ['none', 'sm', 'md', 'lg'],
		},
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: 'md',
		radius: 'xl',
		shadow: 'none',
		fullWidth: false,
		children: 'Ullamco esse pariatur ex sunt.',
		isDisabled: false,
	},
};
