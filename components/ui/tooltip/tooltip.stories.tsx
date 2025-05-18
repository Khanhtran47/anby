// Replace nextjs-vite with the name of your framework

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Button } from '../button';
import { Icon } from '../icon';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * A popup that displays information related to an element when the element
 * receives keyboard focus or the mouse hovers over it.
 */
const meta: Meta<typeof TooltipContent> = {
	title: 'Components/Tooltip',
	component: TooltipContent,
	tags: ['autodocs'],
	argTypes: {
		side: {
			options: ['top', 'bottom', 'left', 'right'],
			control: {
				type: 'radio',
			},
		},
		children: {
			control: 'text',
		},
	},
	args: {
		side: 'top',
		children: 'Close',
	},
	parameters: {
		layout: 'centered',
	},
	render: (args) => (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button size="icon">
						<Icon name="close-bold" size="md" />
						<span className="sr-only">Close</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent {...args} />
			</Tooltip>
		</TooltipProvider>
	),
} satisfies Meta<typeof TooltipContent>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the tooltip.
 */
export const Default: Story = {};

/**
 * Use the `bottom` side to display the tooltip below the element.
 */
export const Bottom: Story = {
	args: {
		side: 'bottom',
	},
};

/**
 * Use the `left` side to display the tooltip to the left of the element.
 */
export const Left: Story = {
	args: {
		side: 'left',
	},
};

/**
 * Use the `right` side to display the tooltip to the right of the element.
 */
export const Right: Story = {
	args: {
		side: 'right',
	},
};
