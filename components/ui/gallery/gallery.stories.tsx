import * as React from 'react';

import { Image } from '../image';
import { Gallery, Item } from './gallery';

import type { Meta, StoryObj } from '@storybook/react';

/**
 * A gallery component that displays images in a grid layout with lightbox functionality.
 * It uses the `react-photoswipe-gallery` library to provide a responsive and interactive image gallery.
 */
const meta: Meta<typeof Gallery> = {
	title: 'Components/Gallery',
	component: Gallery,
	tags: ['autodocs'],
	argTypes: {
		withCaption: {
			control: {
				type: 'boolean',
			},
			description: 'Whether to show captions for the images.',
			table: {
				defaultValue: { summary: 'false', detail: 'By default, captions are not shown.' },
				category: 'Behavior',
				type: { summary: 'boolean' },
			},
		},
		downloadButton: {
			control: {
				type: 'boolean',
			},
			description: 'Whether to show a download button for the images.',
			table: {
				defaultValue: { summary: 'false', detail: 'By default, download buttons are not shown.' },
				category: 'Behavior',
				type: { summary: 'boolean' },
			},
		},
		rotateButton: {
			control: {
				type: 'boolean',
			},
			description: 'Whether to show a rotate button for the images.',
			table: {
				defaultValue: { summary: 'false', detail: 'By default, rotate buttons are not shown.' },
				category: 'Behavior',
				type: { summary: 'boolean' },
			},
		},
	},
	render: (args) => {
		const smallItemStyles: React.CSSProperties = {
			cursor: 'pointer',
			objectFit: 'cover',
			width: '100%',
			maxHeight: '100%',
		};
		return (
			<Gallery {...args}>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '240px 171px 171px',
						gridTemplateRows: '114px 114px',
						gridGap: 12,
					}}
				>
					<Item<HTMLButtonElement>
						alt="Photo of seashore by Folkert Gorter"
						caption="Author: Folkert Gorter"
						height="1600"
						original="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
						thumbnail="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
						width="1600"
					>
						{({ ref, open }) => (
							<button
								ref={ref}
								aria-label="Seashore by Folkert Gorter"
								className="cursor-pointer"
								type="button"
								onClick={open}
							>
								<Image
									alt="Seashore by Folkert Gorter"
									src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
								/>
							</button>
						)}
					</Item>
					<Item<HTMLButtonElement>
						alt="Photo of mountain lake by Samuel Rohl"
						height="1068"
						original="https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg"
						thumbnail="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
						width="1600"
						// No `caption` there
					>
						{({ ref, open }) => (
							<button
								ref={ref}
								aria-label="Mountain lake by Samuel Rohl"
								className="cursor-pointer"
								style={smallItemStyles}
								type="button"
								onClick={open}
							>
								<Image
									alt="Mountain lake by Samuel Rohl"
									src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
								/>
							</button>
						)}
					</Item>
					<Item<HTMLButtonElement>
						alt="Photo of fog in the village by Ales Krivec"
						caption="<h1>Author: Ales Krivec</h1>"
						height="1066"
						original="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg"
						thumbnail="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
						width="1600"
					>
						{({ ref, open }) => (
							<button
								ref={ref}
								aria-label="Fog in the village by Ales Krivec"
								className="cursor-pointer"
								style={smallItemStyles}
								type="button"
								onClick={open}
							>
								<Image
									alt="Fog in the village by Ales Krivec"
									src="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
									style={{ width: '100%', height: '100%' }}
								/>
							</button>
						)}
					</Item>
					<Item<HTMLButtonElement>
						alt="Photo of river sunset by Michael Hull"
						caption="Author: Michael Hull"
						height="1066"
						original="https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg"
						thumbnail="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
						width="1600"
					>
						{({ ref, open }) => (
							<button
								ref={ref}
								aria-label="River sunset by Michael Hull"
								className="cursor-pointer"
								style={{ ...smallItemStyles, gridColumnStart: 2 }}
								type="button"
								onClick={open}
							>
								<Image
									alt="River sunset by Michael Hull"
									src="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
									style={{ width: '100%', height: '100%' }}
								/>
							</button>
						)}
					</Item>
					<Item<HTMLButtonElement>
						alt="Bear by Thomas Lefebvre"
						caption="Author: Thomas Lefebvre"
						height="1066"
						original="https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg"
						thumbnail="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
						width="1600"
					>
						{({ ref, open }) => (
							<button
								ref={ref}
								aria-label="Bear by Thomas Lefebvre"
								className="cursor-pointer"
								style={smallItemStyles}
								type="button"
								onClick={open}
							>
								<Image
									alt="Bear by Thomas Lefebvre"
									src="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
									style={{ width: '100%', height: '100%' }}
								/>
							</button>
						)}
					</Item>
				</div>
			</Gallery>
		);
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Gallery>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultProps = {
	withCaption: false,
	downloadButton: false,
	rotateButton: false,
};

/**
 * The default gallery component.
 * It displays a grid of images with lightbox functionality.
 */
export const Default: Story = {
	args: {
		...defaultProps,
	},
};

/**
 * A gallery with captions enabled.
 * It shows captions for each image when opened in the lightbox.
 */
export const WithCaptions: Story = {
	args: {
		...defaultProps,
		withCaption: true,
	},
};

/**
 * A gallery with download buttons enabled.
 * It allows users to download the original images directly from the lightbox.
 */
export const WithDownloadButtons: Story = {
	args: {
		...defaultProps,
		downloadButton: true,
	},
};

/**
 * A gallery with rotate buttons enabled.
 * It allows users to rotate the current image in the lightbox.
 */
export const WithRotateButtons: Story = {
	args: {
		...defaultProps,
		rotateButton: true,
	},
};
