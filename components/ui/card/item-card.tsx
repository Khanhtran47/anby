'use client';

import React from 'react';
import { lazily } from 'react-lazily';

import { cn } from '@/utils/common/misc';
import { RARITIES } from '@/constants/rarities';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { borderStyle } from '@/styles/primitives';

import type { UrlObject } from 'url';

const { Link } = lazily(() => import('@/i18n/navigation'));

interface ItemCardProps {
	name?: string;
	img?: string;
	rarity?: number;
	as?: React.ElementType;
	onClick?: () => void;
	href?: string | UrlObject;
	className?: string;
}

function ItemCard(props: ItemCardProps) {
	const { name, img, rarity, as, onClick, href, className } = props;
	const itemRarity = rarity ? RARITIES.find((r) => r.id === rarity) : undefined;
	const Comp = as || 'div';
	const Name = (
		<div className="relative flex w-1/2 grow-1 items-center justify-between gap-3 p-2">
			<div
				className={cn(
					'pattern-rhombus pattern-bg-pattern pattern-opacity-50 pattern-size-2 pattern-bg-background absolute top-0 left-0 z-[-1] size-full',
				)}
			/>
			<span className="text-shadow-outline not-prose line-clamp-4 w-full text-center text-lg font-bold tracking-tight text-pretty select-none">
				{name}
			</span>
		</div>
	);

	const Content = (
		<CardContent className="flex size-full justify-center p-0">
			<div className="relative aspect-square h-full shrink-0 grow-0 overflow-hidden rounded-sm bg-[url('/assets/images/bg-icon.png')] bg-cover bg-center">
				<Image
					alt={name}
					loading="lazy"
					radius="xl"
					src={img}
					classNames={{
						wrapper: 'absolute left-1/2 top-1/2 -translate-1/2 w-24 aspect-square',
						img: 'object-cover size-full',
					}}
				/>
				{itemRarity?.color ? (
					<div
						className="absolute bottom-0 left-0 z-10 h-1 w-full"
						style={{ backgroundColor: itemRarity?.color }}
					/>
				) : null}
			</div>
			{name ? Name : null}
		</CardContent>
	);
	return (
		<Card
			asChild
			className={cn(
				'group bg-background aspect-[2/1] h-[150px] cursor-pointer p-4 shadow-none',
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
					removeOnActive: false,
					removeOnHover: false,
				}),
				className,
			)}
			onClick={onClick}
		>
			{href ? (
				<Link
					aria-label={`View details of ${name}`}
					className="focus-visible:ring-ring ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
					href={href}
				>
					{Content}
				</Link>
			) : (
				<Comp
					aria-label={`View details of ${name}`}
					className="focus-visible:ring-ring ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
				>
					{Content}
				</Comp>
			)}
		</Card>
	);
}

export default ItemCard;
