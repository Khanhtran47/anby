// Replace nextjs-vite with the name of your framework
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerRoot,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

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
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Are you sure absolutely sure?</DrawerTitle>
					<DrawerDescription>This action cannot be undone.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
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
				</DrawerFooter>
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
