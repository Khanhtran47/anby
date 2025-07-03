'use client';

import React from 'react';
import { lazily } from 'react-lazily';

import { cn } from '@/utils/common/misc';
import { RARITIES } from '@/constants/rarities';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { borderStyle } from '@/styles/primitives';

import { Skeleton } from '../skeleton';

import type { UrlObject } from 'url';

const { Link } = lazily(() => import('@/i18n/link'));

interface ItemCardProps {
	name?: string;
	img?: string;
	rarity?: number;
	as?: React.ElementType;
	onClick?: () => void;
	href?: string | UrlObject;
	className?: string;
	classNames?: {
		card?: string;
		content?: string;
		imageWrapper?: string;
		image?: string;
		textWrapper?: string;
		text?: string;
	};
	direction?: 'row' | 'col';
	title?: string;
	isExternalLink?: boolean;
	addCorsProxy?: boolean;
}

function ItemCard(props: ItemCardProps) {
	const {
		name,
		img,
		rarity,
		as,
		onClick,
		href,
		className,
		classNames,
		direction = 'row',
		title,
		isExternalLink = false,
		addCorsProxy = false,
	} = props;
	const itemRarity = rarity ? RARITIES.find((r) => r.id === rarity) : undefined;
	const Comp = as || 'div';
	const Name = (
		<div
			className={cn(
				'relative flex grow-1 items-center justify-between gap-3 p-2',
				direction === 'row' ? 'w-1/2' : 'w-full',
				classNames?.textWrapper,
			)}
		>
			<div
				className={cn(
					'pattern-rhombus pattern-bg-pattern pattern-opacity-50 pattern-size-2 pattern-bg-background absolute top-0 left-0 z-[-1] size-full',
				)}
			/>
			<span
				className={cn(
					'text-shadow-outline not-prose w-full text-center font-bold tracking-tight text-pretty select-none',
					direction === 'row' ? 'line-clamp-4 text-lg' : 'line-clamp-1 text-base',
					classNames?.text,
				)}
			>
				{name}
			</span>
		</div>
	);

	const Content = (
		<CardContent
			className={cn(
				'flex size-full justify-center p-0',
				direction === 'row' ? 'flex-row' : 'flex-col',
				classNames?.content,
			)}
		>
			<div
				className={cn(
					"relative aspect-square shrink-0 grow-0 overflow-hidden rounded-sm bg-[url('/assets/images/bg-icon.webp')] bg-cover bg-center",
					direction === 'row' ? 'h-ful' : 'h-fit',
				)}
			>
				<Image
					addCorsProxy={addCorsProxy}
					alt={`${name} Image`}
					loading="lazy"
					radius="xl"
					src={img || '/assets/images/no-image.webp'}
					classNames={{
						wrapper: cn(
							'absolute top-1/2 left-1/2 aspect-square -translate-1/2',
							direction === 'row' ? 'w-24' : 'w-full',
							classNames?.imageWrapper,
						),
						img: cn('size-full object-cover', classNames?.image),
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
			title={title}
			className={cn(
				'group bg-background cursor-pointer p-4 shadow-none',
				direction === 'row' ? 'aspect-[2/1] h-[150px]' : 'w-[150px]',
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
					removeOnActive: false,
					removeOnHover: false,
				}),
				className,
				classNames?.card,
			)}
			onClick={onClick}
		>
			{href ? (
				<Link
					animateOptions={{ animateName: 'none' }}
					aria-label={`View details of ${name}`}
					className="focus-visible:ring-ring ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
					href={href}
					isExternal={isExternalLink}
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

function ItemCardSkeleton() {
	return (
		<Card className="group bg-background aspect-[2/1] h-[150px] cursor-pointer p-4 shadow-none">
			<Skeleton className="size-full" />
		</Card>
	);
}

export { ItemCard, ItemCardSkeleton };
