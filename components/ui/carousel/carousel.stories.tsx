import {
	Carousel,
	CarouselContent,
	CarouselIndicator,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselThumbContent,
	CarouselThumbItem,
} from '@/components/ui/carousel';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 * A carousel with motion and swipe built using Embla.
 */
const meta: Meta<typeof Carousel> = {
	title: 'Components/Carousel',
	component: Carousel,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		className: 'w-full max-w-xs',
	},
	render: (args) => (
		<Carousel {...args}>
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index}>
						<div className="bg-card flex aspect-square items-center justify-center rounded-xl p-6 select-none">
							<span className="text-4xl font-semibold">{index + 1}</span>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the carousel.
 */
export const Default: Story = {};

/**
 * Use the `basis` utility class to change the size of the carousel.
 */
export const Size: Story = {
	render: (args) => (
		<Carousel {...args}>
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index} className="basis-1/3">
						<div className="bg-card flex aspect-square items-center justify-center rounded-xl p-6 select-none">
							<span className="text-4xl font-semibold">{index + 1}</span>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	args: {
		className: 'mx-12 w-full max-w-xs',
	},
};

/**
 * Use the `CarouselIndicator` to show the current slide progress.
 */
export const Indicator: Story = {
	render: (args) => (
		<Carousel {...args}>
			<div className="relative w-full max-w-xs">
				<CarouselContent>
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem key={index}>
							<div className="bg-background flex aspect-square items-center justify-center rounded-xl p-6 select-none">
								<span className="text-4xl font-semibold">{index + 1}</span>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 pl-4">
					<CarouselThumbContent className="gap-x-1">
						{Array.from({ length: 5 }).map((_, index) => (
							<CarouselIndicator key={index} index={index} />
						))}
					</CarouselThumbContent>
				</div>
			</div>
			<CarouselNext />
			<CarouselPrevious />
		</Carousel>
	),
	args: {},
};

/**
 * Use the `CarouselThumbContent` to show the current slide progress in a more compact way.
 */
export const Thumb: Story = {
	render: (args) => (
		<Carousel {...args}>
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index}>
						<div className="bg-background flex aspect-square items-center justify-center rounded-xl p-6 select-none">
							<span className="text-4xl font-semibold">{index + 1}</span>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselThumbContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselThumbItem key={index} className="h-auto bg-transparent" index={index}>
						<div className="bg-background flex aspect-square items-center justify-center rounded-xl p-6 select-none">
							{index + 1}
						</div>{' '}
					</CarouselThumbItem>
				))}
			</CarouselThumbContent>
			<CarouselNext className="top-1/3 -translate-y-1/3" />
			<CarouselPrevious className="top-1/3 -translate-y-1/3" />
		</Carousel>
	),
	args: {},
};
