import { Icon } from '@/components/ui/icon';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * A set of two-state buttons that can be toggled on or off.
 */
const meta = {
	title: 'Components/ToggleGroup',
	component: ToggleGroup,
	tags: ['autodocs'],
	argTypes: {
		type: {
			options: ['multiple', 'single'],
			control: { type: 'radio' },
		},
		variant: {
			control: {
				type: 'select',
			},
			options: ['default', 'outline'],
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['sm', 'md', 'lg', 'icon'],
		},
		groupType: {
			options: ['separate', 'joined'],
			control: { type: 'radio' },
		},
	},
	args: {
		variant: 'default',
		size: 'md',
		type: 'multiple',
		groupType: 'separate',
		disabled: false,
	},
	render: (args) => (
		<ToggleGroup {...args}>
			<ToggleGroupItem aria-label="Toggle left" value="left">
				<Icon className="h-4 w-4" name="arrow-left-bold" />
			</ToggleGroupItem>
			<ToggleGroupItem aria-label="Toggle right" value="right">
				<Icon className="h-4 w-4" name="arrow-right-bold" />
			</ToggleGroupItem>
			<ToggleGroupItem aria-label="Toggle up" value="up">
				<Icon className="h-4 w-4" name="chevron-up-bold" />
			</ToggleGroupItem>
			<ToggleGroupItem aria-label="Toggle down" value="down">
				<Icon className="h-4 w-4" name="chevron-down-bold" />
			</ToggleGroupItem>
		</ToggleGroup>
	),
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the toggle group.
 */
export const Default: Story = {};

/**
 * Use the `outline` variant to emphasizing the individuality of each button
 * while keeping them visually cohesive.
 */
export const Outline: Story = {
	args: {
		variant: 'outline',
	},
};

/**
 * Use the `single` type to create exclusive selection within the button
 * group, allowing only one button to be active at a time.
 */
export const Single: Story = {
	args: {
		type: 'single',
	},
};

/**
 * Use the `separate` group type to visually distinguish each button,
 * allowing for clear individual selection.
 */
export const Joined: Story = {
	args: {
		variant: 'outline',
		groupType: 'joined',
	},
};

/**
 * Use the `sm` size for a compact version of the button group, featuring
 * smaller buttons for spaces with limited real estate.
 */
export const Small: Story = {
	args: {
		size: 'sm',
	},
};

/**
 * Use the `lg` size for a more prominent version of the button group, featuring
 * larger buttons for emphasis.
 */
export const Large: Story = {
	args: {
		size: 'lg',
	},
};

/**
 * Add the `disabled` prop to a button to prevent interactions.
 */
export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
