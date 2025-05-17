import { Image } from './image';

import type { Meta } from '@storybook/react';

export default {
	title: 'Components/Image',
	component: Image,
	tags: ['autodocs'],
	argTypes: {
		radius: {
			control: {
				type: 'select',
			},
			options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'],
		},
		shadow: {
			control: {
				type: 'select',
			},
			options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
		},
		isZoomed: {
			control: {
				type: 'boolean',
			},
		},
		disableAnimations: {
			control: {
				type: 'boolean',
			},
		},
		optimizeImg: {
			control: {
				disable: true,
			},
		},
	},
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Image>;

const defaultProps = {
	radius: 'lg',
	shadow: 'none',
	isZoomed: false,
	src: 'https://heroui.com/images/card-example-2.jpeg',
	alt: 'HeroUI hero image',
	optimizerEndpoint: 'https://sora-image.tranduckhanh23.workers.dev/',
	disableAnimations: false,
};

export const Default = {
	args: {
		width: 300,
		height: 200,
		...defaultProps,
	},
};

export const Zoomed = {
	args: {
		...defaultProps,
		width: 300,
		height: 200,
		isZoomed: true,
		radius: 'lg',
		src: 'https://heroui.com/images/card-example-2.jpeg',
	},
};

export const Shadow = {
	args: {
		...defaultProps,
		width: 300,
		height: 200,
		isZoomed: true,
		radius: 'lg',
		shadow: 'md',
		src: 'https://heroui.com/images/card-example-2.jpeg',
	},
};

export const Skeleton = {
	args: {
		...defaultProps,
		width: 300,
		height: 450,
		radius: 'lg',
		src: 'https://app.requestly.io/delay/3000/https://images.unsplash.com/photo-1494790108377-be9c29b29330',
		optimizeImg: false,
	},
};

export const Placeholder = {
	args: {
		...defaultProps,
		width: 300,
		height: 450,
		radius: 'lg',
		src: 'https://app.requestly.io/delay/5000/https://images.unsplash.com/photo-1494790108377-be9c29b29330',
		optimizeImg: false,
		placeholder: 'https://placehold.co/300x450',
	},
};

export const BlurPlaceholder = {
	args: {
		...defaultProps,
		width: 400,
		height: 600,
		radius: 'lg',
		src: 'https://app.requestly.io/delay/5000/https://image.tmdb.org/t/p/w342//edKpE9B5qN3e559OuMCLZdW1iBZ.jpg',
		optimizeImg: false,
		placeholder:
			'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABaADwDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAABAUCAwYBAAj/xAAlEAACAgEEAQQDAQAAAAAAAAAAAQIDEQQFEiExEyJBURQVMiP/xAAZAQACAwEAAAAAAAAAAAAAAAADBAABBQL/xAAeEQACAwEBAAMBAAAAAAAAAAAAAQIDEQQSEyExFP/aAAwDAQACEQMRAD8A+aYxyXQrbJVw7GGlo5NdBkjPsswB9F/TIypl9M1Wk2z1EvaG/o8r+S2sF10rTCOqS+Gd9Nr4NlfsnFN8RTrND6WeikjtdCf0IXA5xC7a8Mr4EwMrC2vyONshymhNDpj7ZsOaL3AMoOX0bHaaI8E2hpJVxXwBaHqpYfwVauySfTF3etwv+F5oVeq5RfSMvvNce8DOV0sPsTbnZlMJG1HK5Gnpm9RH3Mpwi7Uy9zBHZ2E078NFmOxxtDakhbGOZDzaqctCtlmIfqp9SNTorP8AJHbcSbPaerFSIWdNme5emaDj4WMqsryhNuNTwx/X2hfuUFxYaM8A/GpGL1kcSYA/I03FYkxXLyPQlqFLIYxpSszRptnrXRltJLM0a3afCEOptGlwJP8AR+pKNaA75psnY3wBlFyYnVLP0b6Ib+F1csIC3B5gw+NeEBa6HTC+02LxraRjtyXuYpl/Q83OHbEk0+TNGl6jPvWML08+MkaXa9ThLsyCswxpt+oaa7ObqvaJRd8bNp+TmBXHU8WL9Pdygj1kvIrHlY9LrTG35iwAa3VJpgM7mhfq9Q8eSR5WmcvrWFOvtUmxXLydvubl5KeY/CHlGfZP09IBOms4NA7PIIB0f6fXKK8lk9fFp9mfi39km39lYX6G1msT+QK+9S+QRtkWQmnJvLInTxZR/9k=',
	},
};
