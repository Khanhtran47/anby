import { useState } from 'react';

import { AlertDialog } from '@/components/ui/alert-dialog';

import { Button } from '../button';

import type { AlertDialogProps } from '@/components/ui/alert-dialog';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 * A modal dialog that interrupts the user with important content and expects
 * a response.
 */
const meta: Meta<AlertDialogProps> = {
	title: 'Components/AlertDialog',
	component: AlertDialog,
	tags: ['autodocs'],
	args: {
		alertDialogHeader: undefined,
		alertDialogTitle: 'Are you sure absolutely sure?',
		alertDialogDescription:
			'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
		contentHeight: undefined,
		contentWidth: 'md',
		children: `Commodo eu aute labore officia mollit est labore consequat sunt aute incididunt. Officia
			incididunt id ex cillum officia nostrud ipsum labore irure Lorem. Reprehenderit duis aliquip
			minim consectetur enim cillum magna cupidatat dolore officia.`,
		disableAnimations: false,
		alertDialogAction: 'Confirm',
		alertDialogCancel: 'Cancel',
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [open, setOpen] = useState(false);
		return (
			<AlertDialog
				{...args}
				setShowAlertDialog={setOpen}
				showAlertDialog={open}
				trigger={
					<Button aria-label="Open Alert Dialog" onClick={() => setOpen(true)}>
						Open Alert Dialog
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
} satisfies Meta<AlertDialogProps>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the alert dialog.
 */
export const Default: Story = {};
