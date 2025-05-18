import { useState } from 'react';

import { Sheet } from '@/components/ui/sheet';

import { Button } from '../button';

import type { SheetProps } from '@/components/ui/sheet';
import type { Meta, StoryObj } from '@storybook/react';

// Replace nextjs-vite with the name of your framework

/**
 * Extends the Dialog component to display content that complements the main
 * content of the screen.
 */
const meta: Meta<SheetProps> = {
	title: 'Components/Sheet',
	component: Sheet,
	tags: ['autodocs'],
	args: {
		sheetHeader: undefined,
		sheetTitle: 'Are you sure absolutely sure?',
		sheetDescription:
			'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
		sheetFooter:
			'Est commodo exercitation velit anim sit ad laborum qui id duis elit esse laborum.',
		hideCloseButton: false,
		side: 'right',
		contentHeight: undefined,
		contentWidth: 'md',
		children: `Commodo eu aute labore officia mollit est labore consequat sunt aute incididunt. Officia
			incididunt id ex cillum officia nostrud ipsum labore irure Lorem. Reprehenderit duis aliquip
			minim consectetur enim cillum magna cupidatat dolore officia.`,
		disableAnimations: false,
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [open, setOpen] = useState(false);
		return (
			<Sheet
				{...args}
				setShowSheet={setOpen}
				showSheet={open}
				trigger={
					<Button aria-label="Open Sheet" onClick={() => setOpen(true)}>
						Open Sheet
					</Button>
				}
			/>
		);
	},
	argTypes: {
		side: {
			control: {
				type: 'select',
			},
			options: ['top', 'right', 'bottom', 'left'],
		},
		contentWidth: {
			control: {
				type: 'select',
			},
			options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full', 'fit'],
		},
		contentHeight: {
			control: {
				type: 'select',
			},
			options: ['auto', 'fit', 'full'],
		},
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<SheetProps>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the sheet.
 */
export const Default: Story = {};
