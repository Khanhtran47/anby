import { cn } from '@/utils/common/misc';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { BangbooCard } from '@/components/ui/card/bangboo-card';
import { ItemCard } from '@/components/ui/card/item-card';
import { WEngineCard } from '@/components/ui/card/w-engine-card';
import { Image } from '@/components/ui/image';
import { borderStyle } from '@/styles/primitives';

import type { Meta, StoryObj } from '@storybook/react';

const notifications = [
	{
		title: 'Your call has been confirmed.',
		description: '1 hour ago',
	},
	{
		title: 'You have a new message!',
		description: '1 hour ago',
	},
	{
		title: 'Your subscription is expiring soon!',
		description: '2 hours ago',
	},
];

/**
 * Displays a card with header, content, and footer.
 */
const meta = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		className: 'w-96',
	},
	render: (args) => (
		<Card {...args}>
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>You have 3 unread messages.</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				{notifications.map((notification, index) => (
					<div key={index} className="flex items-center gap-4">
						{/* <BellRing className="size-6" /> */}
						<div>
							<p>{notification.title}</p>
							<p className="text-foreground/60">{notification.description}</p>
						</div>
					</div>
				))}
			</CardContent>
			<CardFooter>
				<button className="hover:underline">Close</button>
			</CardFooter>
		</Card>
	),
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The default form of the card.
 */
export const Default: Story = {};

export const AgentCardDemo: Story = {
	render: () => (
		<Card className="group hover:animate-bg-gradient relative w-[240px] max-w-[250px] scale-x-100 scale-y-100 skew-x-[16deg] rounded-tl-none rounded-tr-3xl rounded-br-none rounded-bl-3xl border-[15px] border-transparent bg-transparent shadow-none">
			<CardHeader className="absolute top-2 right-2 z-20 p-0">
				<Image
					classNames={{ wrapper: 'skew-x-[-16deg] size-8' }}
					radius="none"
					src="./assets/images/a-rank.png"
				/>
			</CardHeader>
			<CardContent
				className={cn(
					'bg-background size-full overflow-hidden rounded-tr-2xl rounded-bl-2xl p-0 group-hover:bg-transparent',
					borderStyle({
						showBorder: true,
						borderColor: 'background',
						showShadowInset: true,
						shadowColor: 'border',
						removeOnHover: true,
					}),
				)}
			>
				<Image
					classNames={{ wrapper: 'skew-x-[-16deg]' }}
					src="https://api.hakush.in/zzz/UI/IconRoleCrop01.webp"
				/>
			</CardContent>
			<CardFooter
				asChild
				className="absolute bottom-0 z-10 flex size-full flex-col items-center justify-end self-center overflow-hidden rounded-bl-2xl p-0"
			>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a href="#" onClick={(e) => e.preventDefault()}>
					<div className="relative flex w-full items-center justify-between p-3">
						<div
							className={cn(
								'pattern-rhombus pattern-bg-pattern pattern-opacity-80 pattern-size-2 pattern-bg-background absolute top-0 left-0 z-[-1] size-full',
							)}
						/>
						<div className="flex gap-2">
							<Image
								classNames={{ wrapper: 'skew-x-[-16deg] size-7' }}
								src="https://api.hakush.in/zzz/UI/IconElectric.webp"
							/>
							<Image
								classNames={{ wrapper: 'skew-x-[-16deg] size-7' }}
								src="https://api.hakush.in/zzz/UI/IconStun.webp"
							/>
						</div>
						<span className="skew-x-[-16deg] text-xl font-extrabold">Anby</span>
						<div />
					</div>
				</a>
			</CardFooter>
		</Card>
	),
};

export const BangbooCardDemo: Story = {
	render: () => (
		<BangbooCard
			isDemo
			id={53001}
			img="https://api.hakush.in/zzz/UI/BangbooGarageRole12.webp"
			name="Penguinboo"
			rarity={3}
		/>
	),
};

export const WEngineCardDemo: Story = {
	render: () => (
		<WEngineCard
			isDemo
			id={13115}
			img="https://api.hakush.in/zzz/UI/Weapon_A_1151.webp"
			name="Kaboom the Cannon"
			rarity={3}
			specialty={4}
		/>
	),
};

export const ItemCardDemo: Story = {
	render: () => (
		<ItemCard
			img="https://api.hakush.in/zzz/UI/SuitWoodpeckerElectro.webp"
			name="Woodpecker Electro"
			rarity={4}
		/>
	),
};
