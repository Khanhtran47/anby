import { Spinner } from '@/components/ui/spinner';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * A simple spinner for displaying loading states.
 */
const meta = {
	title: 'Components/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: {
				type: 'select',
			},
			options: ['sm', 'md', 'lg'],
		},
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A spinner with a medium size.
 */
export const Default: Story = {
	args: {
		size: 'md',
	},
};
