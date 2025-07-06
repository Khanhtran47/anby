import { useState } from 'react';

import { Dialog } from '@/components/ui/dialog';

import { Button } from '../button';

import type { DialogProps } from '@/components/ui/dialog';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 * A window overlaid on either the primary window or another dialog window,
 * rendering the content underneath inert.
 */
const meta: Meta<DialogProps> = {
	title: 'Components/Dialog',
	component: Dialog,
	tags: ['autodocs'],
	args: {
		dialogHeader: undefined,
		dialogTitle: 'Are you sure absolutely sure?',
		dialogDescription:
			'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
		dialogFooter:
			'Est commodo exercitation velit anim sit ad laborum qui id duis elit esse laborum.',
		hideCloseButton: false,
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
			<Dialog
				{...args}
				setShowDialog={setOpen}
				showDialog={open}
				trigger={
					<Button aria-label="Open Dialog" onClick={() => setOpen(true)}>
						Open Dialog
					</Button>
				}
			/>
		);
	},
	argTypes: {
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
} satisfies Meta<DialogProps>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the dialog.
 */
export const Default: Story = {};
