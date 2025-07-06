import { Icon } from '@/components/ui/icon';
import { Toggle, toggleVariants } from '@/components/ui/toggle';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 * A two-state button that can be either on or off.
 */
const meta: Meta<typeof Toggle> = {
	title: 'Components/Toggle',
	component: Toggle,
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: { disable: true },
		},
		variant: {
			options: ['default', 'outline'],
		},
		size: {
			control: {
				type: 'select',
			},
			options: ['sm', 'md', 'lg', 'icon'],
		},
	},
	args: {
		children: <Icon className="h-4 w-4" name="panel-left-bold" />,
		'aria-label': 'Toggle bold',
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof Toggle>;

const defaultProps = {
	...toggleVariants.defaultVariants,
	size: 'icon' as const,
};

/**
 * The default form of the toggle.
 */
export const Default: Story = {
	args: {
		...defaultProps,
	},
};

/**
 * Use the `outline` variant for a distinct outline, emphasizing the boundary
 * of the selection circle for clearer visibility
 */
export const Outline: Story = {
	args: {
		...defaultProps,
		variant: 'outline',
		children: <Icon className="h-4 w-4" name="panel-left-bold" />,
		'aria-label': 'Toggle panel',
	},
};

/**
 * Use the text element to add a label to the toggle.
 */
export const WithText: Story = {
	render: (args) => (
		<Toggle {...args}>
			<Icon className="mr-2 h-4 w-4" name="settings-bold" />
			Settings
		</Toggle>
	),
	args: { ...Outline.args, size: 'md' },
};

/**
 * Use the `sm` size for a smaller toggle, suitable for interfaces needing
 * compact elements without sacrificing usability.
 */
export const Small: Story = {
	args: {
		size: 'sm',
	},
};

/**
 * Use the `lg` size for a larger toggle, offering better visibility and
 * easier interaction for users.
 */
export const Large: Story = {
	args: {
		size: 'lg',
	},
};

/**
 * Add the `disabled` prop to prevent interactions with the toggle.
 */
export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
