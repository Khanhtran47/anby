import { cn } from '@/utils/common/misc';
import { borderStyle } from '@/styles/primitives';

import { ScrollArea } from './scroll-area';

import type { Meta } from '@storybook/react';

export default {
	title: 'Components/ScrollArea',
	component: ScrollArea,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: {
				type: 'select',
			},
			options: ['auto', 'always', 'hover', 'scroll'],
		},
		scrollHideDelay: {
			control: {
				type: 'number',
			},
		},
		orientation: {
			control: {
				type: 'select',
			},
			options: ['horizontal', 'vertical'],
		},
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof ScrollArea>;

const defaultProps = {
	type: 'hover',
	scrollHideDelay: 600,
	orientation: 'vertical',
	className: cn(
		'h-[200px] w-[350px] rounded-md',
		borderStyle({
			showBorder: true,
			borderColor: 'background',
			showShadowInset: true,
			shadowColor: 'border',
			removeOnActive: false,
		}),
	),
};

export const Default = {
	args: {
		...defaultProps,
		children: `Duis esse commodo proident cillum do anim consectetur officia reprehenderit quis cillum eu irure. Reprehenderit consequat eiusmod excepteur do et voluptate qui eiusmod ex ut qui reprehenderit ullamco. Tempor aliquip aliqua anim cupidatat laboris culpa nulla est dolore est culpa adipisicing culpa. Elit ad commodo mollit dolor eiusmod ut adipisicing culpa reprehenderit est duis qui. Lorem veniam et incididunt esse ex enim enim ut labore. Ad sunt fugiat occaecat nulla laboris ullamco deserunt sit nulla ut. Pariatur Lorem eiusmod dolore anim minim do ut.
  Occaecat et consectetur aute dolor ea. Voluptate pariatur commodo culpa sit occaecat officia. Ipsum aute Lorem et sit incididunt sunt. Anim nisi esse ad in cupidatat reprehenderit reprehenderit reprehenderit officia dolor et.`,
	},
};

export const Horizontal = {
	args: {
		...defaultProps,
		orientation: 'horizontal',
		children: (
			<div className="flex size-full gap-2">
				<div className="h-[200px] w-[200px]">1</div>
				<div className="h-[200px] w-[200px]">2</div>
				<div className="h-[200px] w-[200px]">3</div>
			</div>
		),
	},
};
