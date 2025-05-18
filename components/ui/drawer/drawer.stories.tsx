import { DrawerClose, DrawerContent, DrawerRoot, DrawerTrigger } from '@/components/ui/drawer';

import { Button } from '../button';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * A drawer component for React.
 */
const meta = {
	title: 'Components/Drawer',
	component: DrawerRoot,
	tags: ['autodocs'],
	argTypes: {},
	render: (args) => (
		<DrawerRoot {...args}>
			<DrawerTrigger asChild>
				<Button>Open</Button>
			</DrawerTrigger>
			<DrawerContent
				drawerDescription="This action cannot be undone."
				drawerTitle="Are you sure absolutely sure?"
			>
				<DrawerClose asChild>
					<Button
						wrapIcon
						icon="close-circle-bold"
						classNames={{
							root: 'w-full',
							icon: 'text-red-500',
						}}
					>
						Cancel
					</Button>
				</DrawerClose>
				<Button
					wrapIcon
					icon="check-circle-bold"
					classNames={{
						root: 'w-full',
						icon: 'text-green-500',
					}}
				>
					Submit
				</Button>
			</DrawerContent>
		</DrawerRoot>
	),
	parameters: {
		layout: 'centered',
	},
} as Meta<typeof DrawerRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the drawer.
 */
export const Default: Story = {} as Story;
