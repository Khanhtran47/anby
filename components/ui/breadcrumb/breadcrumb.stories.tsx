import { Icon } from '../icon';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	breadcrumbVariants,
} from './breadcrumb';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * Displays the path to the current resource using a hierarchy of links.
 */
const meta = {
	title: 'Components/Breadcrumb',
	component: Breadcrumb,
	tags: ['autodocs'],
	argTypes: {
		showBgPattern: {
			control: {
				type: 'boolean',
			},
			defaultValue: false,
			description: 'Whether to show the background pattern.',
		},
		showHomeIcon: {
			control: {
				type: 'boolean',
			},
			defaultValue: false,
			description: 'Whether to show the home icon in the first link.',
		},
	},
	args: {},
	render: (args) => (
		<Breadcrumb {...args}>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink>Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink>Components</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
	...breadcrumbVariants.defaultVariants,
};

/**
 * Displays the path of links to the current resource.
 */
export const Default: Story = {
	args: {
		...defaultProps,
	},
};

/**
 * Displays the path with a custom icon for the separator.
 */
export const WithCustomSeparator: Story = {
	args: {
		...defaultProps,
	},
	render: (args) => (
		<Breadcrumb {...args}>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink>Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>/</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink>Components</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>/</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};

/**
 * Displays the path with a home icon in the first link.
 */
export const WithHomeIcon: Story = {
	args: {
		...defaultProps,
		showHomeIcon: true,
	},
	render: (args) => (
		<Breadcrumb {...args}>
			<BreadcrumbList>
				<BreadcrumbItem showHomeIcon={args.showHomeIcon}>
					<BreadcrumbLink>
						<Icon name="home-bold" size="md" />
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<BreadcrumbLink>Components</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
};
