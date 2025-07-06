import { Badge } from '@/components/ui/badge';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 * Displays a badge or a component that looks like a badge.
 */
const meta = {
	title: 'Components/Badge',
	component: Badge,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: {
				type: 'select',
			},
			options: ['default', 'primary', 'secondary', 'destructive'],
		},
		children: {
			control: 'text',
		},
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the badge.
 */
export const Default: Story = {
	args: {
		variant: 'default',
		children: 'Badge',
	},
};
