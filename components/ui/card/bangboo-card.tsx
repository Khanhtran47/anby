'use client';

import React from 'react';
import { lazily } from 'react-lazily';

import { cn } from '@/utils/common/misc';
import { RARITIES } from '@/constants/rarities';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { borderStyle } from '@/styles/primitives';

import { Skeleton } from '../skeleton';

const { Link } = lazily(() => import('@/i18n/link'));

interface BangbooCardProps {
	id: number;
	name: string;
	img?: string;
	rarity: number;
	isDemo?: boolean;
}

function BangbooCard(props: BangbooCardProps) {
	const { id, name, img, rarity, isDemo = false } = props;
	const bangbooRarity = RARITIES.find((r) => r.id === rarity);
	const Name = (
		<div className="relative flex w-full items-center justify-between gap-3 p-2 lg:p-3">
			<div
				className={cn(
					'pattern-rhombus pattern-bg-pattern pattern-opacity-80 pattern-size-2 pattern-bg-background absolute top-0 left-0 z-[-1] size-full',
				)}
			/>
			<span className="text-shadow-outline not-prose line-clamp-2 w-full text-center text-base font-black tracking-tight text-pretty select-none">
				{name}
			</span>
		</div>
	);
	return (
		<Card
			className={cn(
				'group bg-background active:animate-bg-gradient hover:animate-bg-gradient w-[120px] shadow-none',
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
					removeOnActive: true,
					removeOnHover: true,
				}),
			)}
		>
			{bangbooRarity ? (
				<CardHeader className="absolute top-2 left-0 z-20 flex w-full flex-row items-center justify-between px-2 py-0 lg:px-2">
					{bangbooRarity ? (
						<Image
							optimizeImg
							alt={bangbooRarity?.rarity}
							classNames={{ wrapper: 'size-6 lg:size-8' }}
							height={32}
							loading="lazy"
							radius="none"
							src={bangbooRarity?.icon}
							width={32}
						/>
					) : null}
				</CardHeader>
			) : null}
			<CardContent className="size-full p-0">
				<Image
					alt={name}
					loading="lazy"
					radius="xl"
					src={img || '/assets/images/no-image.webp'}
					classNames={{
						wrapper: 'w-full aspect-[2/3] flex justify-center items-center',
						img: cn('object-cover', img ? 'size-full' : 'size-24'),
					}}
				/>
			</CardContent>
			<CardFooter
				asChild={!isDemo}
				className="absolute bottom-0 z-10 flex size-full flex-col items-center justify-end self-center overflow-hidden rounded-xl p-0"
			>
				{isDemo ? (
					<>{Name}</>
				) : (
					<Link
						animateOptions={{ animateName: 'none' }}
						aria-label={`View details of ${name}`}
						className="focus-visible:ring-ring ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
						href={`/bangboo/${id}`}
					>
						{Name}
					</Link>
				)}
			</CardFooter>
		</Card>
	);
}

function BangbooCardSkeleton() {
	return (
		<Card className="aspect-[2/3] w-full">
			<Skeleton className="size-full" />
		</Card>
	);
}

export { BangbooCard, BangbooCardSkeleton };
