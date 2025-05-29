'use client';

import React from 'react';
import { lazily } from 'react-lazily';

import { cn } from '@/utils/common/misc';
import { RARITIES } from '@/constants/rarities';
import { SPECIALTIES } from '@/constants/specialties';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { borderStyle } from '@/styles/primitives';

import { Skeleton } from '../skeleton';

const { Link } = lazily(() => import('@/i18n/navigation'));

interface WEngineCardProps {
	id: number;
	name: string;
	img?: string;
	rarity: number;
	specialty: number;
	isDemo?: boolean;
}

function WEngineCard(props: WEngineCardProps) {
	const { id, name, img, rarity, specialty, isDemo = false } = props;
	const wEngineRarity = RARITIES.find((r) => r.id === rarity);
	const wEngineSpecialty = SPECIALTIES.find((s) => s.id === specialty);
	const Name = (
		<div className="relative flex w-full items-center justify-between gap-3 p-2">
			<div
				className={cn(
					'pattern-rhombus pattern-bg-pattern pattern-opacity-50 pattern-size-2 pattern-bg-background absolute top-0 left-0 z-[-1] size-full',
				)}
			/>
			<span className="text-shadow-outline not-prose line-clamp-2 w-full text-center text-base font-semibold tracking-tight text-pretty select-none">
				{name}
			</span>
		</div>
	);
	return (
		<Card
			className={cn(
				'group bg-background aspect-[2/3] w-[120px] shadow-none',
				borderStyle({
					showBorder: true,
					borderColor: 'background',
					showShadowInset: true,
					shadowColor: 'border',
					removeOnActive: false,
					removeOnHover: false,
				}),
			)}
		>
			{wEngineRarity || wEngineSpecialty ? (
				<CardHeader className="absolute top-2 left-0 z-20 flex w-full flex-row items-center justify-between px-2 py-0 lg:px-2">
					{wEngineRarity ? (
						<Image
							optimizeImg
							alt={wEngineRarity?.rarity}
							classNames={{ wrapper: 'size-6' }}
							height={24}
							loading="lazy"
							radius="none"
							src={wEngineRarity?.icon2}
							width={24}
						/>
					) : null}
					{wEngineSpecialty ? (
						<Image
							optimizeImg
							alt={wEngineSpecialty?.name}
							classNames={{ wrapper: 'size-6' }}
							height={24}
							loading="lazy"
							radius="none"
							src={wEngineSpecialty?.icon}
							width={24}
						/>
					) : null}
				</CardHeader>
			) : null}
			<CardContent className="relative flex size-full justify-center rounded-xl bg-[url('/assets/images/w-engine-bg.webp')] bg-cover bg-center p-0">
				<Image
					alt={`${name} Image`}
					loading="lazy"
					radius="xl"
					src={img}
					classNames={{
						wrapper: 'absolute left-1/2 top-1/2 -translate-1/2 w-24 aspect-square',
						img: 'object-cover size-full',
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
						aria-label={`View details of ${name}`}
						className="focus-visible:ring-ring ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
						href={`/w-engine/${id}`}
					>
						{Name}
					</Link>
				)}
			</CardFooter>
		</Card>
	);
}

function WEngineCardSkeleton() {
	return (
		<Card className="aspect-[2/3] w-[120px]">
			<Skeleton className="size-full" />
		</Card>
	);
}

export { WEngineCard, WEngineCardSkeleton };
