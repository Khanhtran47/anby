'use client';

import React from 'react';

import { Link } from '@/i18n/navigation';
import { cn } from '@/utils/common/misc';
import { FACTIONS } from '@/constants/factions';
import { RARITIES } from '@/constants/rarities';
import { SPECIALTIES } from '@/constants/specialties';
import { STATS } from '@/constants/stats';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { borderStyle } from '@/styles/primitives';

interface AgentCardProps {
	id: number;
	name: string;
	img?: string;
	rarity: number;
	specialty: number;
	stat: number;
	faction: number;
	spStat?: string;
}

function AgentCard(props: AgentCardProps) {
	const { id, name, img, rarity, specialty, stat, faction, spStat } = props;
	const agentFaction = FACTIONS.find((f) => f.id === faction);
	const agentRarity = RARITIES.find((r) => r.id === rarity);
	const agentSpecialty = SPECIALTIES.find((s) => s.id === specialty);
	const agentStat = STATS.find((s) => s.id === stat);

	return (
		<Card className="group hover:animate-bg-gradient active:animate-bg-gradient relative -my-1 w-[160px] max-w-[250px] scale-x-100 scale-y-100 rounded-tl-none rounded-tr-3xl rounded-br-none rounded-bl-3xl border-[15px] border-transparent bg-transparent shadow-none lg:w-[240px] lg:skew-x-[16deg]">
			{agentRarity || agentFaction ? (
				<CardHeader className="absolute top-2 left-0 z-20 flex w-full flex-row items-center justify-between px-2 py-0 lg:px-4">
					{agentFaction ? (
						<Image
							classNames={{ wrapper: 'lg:skew-x-[-16deg] size-7 lg:size-10' }}
							loading="lazy"
							radius="none"
							src={agentFaction?.icon}
						/>
					) : null}
					{agentRarity ? (
						<Image
							classNames={{ wrapper: 'lg:skew-x-[-16deg] size-6 lg:size-8' }}
							loading="lazy"
							radius="none"
							src={agentRarity?.icon}
						/>
					) : null}
				</CardHeader>
			) : null}
			<CardContent
				className={cn(
					'bg-background size-full overflow-hidden rounded-tr-2xl rounded-bl-2xl p-0 group-hover:bg-transparent group-active:bg-transparent',
					borderStyle({
						showBorder: true,
						borderColor: 'background',
						showShadowInset: true,
						shadowColor: 'border',
						removeOnHover: true,
						removeOnActive: true,
					}),
				)}
			>
				<Image
					radius="none"
					src={img}
					classNames={{
						wrapper: 'lg:skew-x-[-16deg] w-full aspect-[4/5] scale-125',
						img: 'size-full object-cover',
					}}
				/>
			</CardContent>
			<CardFooter
				asChild
				className="absolute bottom-0 z-10 flex size-full flex-col items-center justify-end self-center overflow-hidden rounded-bl-2xl p-0"
			>
				<Link href={`/agent/${id}`}>
					<div className="relative flex w-full items-center justify-between gap-3 p-2 lg:p-3">
						<div
							className={cn(
								'pattern-rhombus pattern-bg-pattern pattern-opacity-80 pattern-size-2 pattern-bg-background absolute top-0 left-0 z-[-1] size-full',
							)}
						/>
						<div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
							{spStat ? (
								<Image
									classNames={{ wrapper: 'lg:skew-x-[-16deg] size-4 lg:size-7' }}
									loading="lazy"
									radius="none"
									src={spStat}
								/>
							) : agentStat ? (
								<Image
									classNames={{ wrapper: 'lg:skew-x-[-16deg] size-4 lg:size-7' }}
									loading="lazy"
									radius="none"
									src={agentStat?.icon}
								/>
							) : null}
							{agentSpecialty ? (
								<Image
									classNames={{ wrapper: 'lg:skew-x-[-16deg] size-4 lg:size-7' }}
									loading="lazy"
									radius="none"
									src={agentSpecialty?.icon}
								/>
							) : null}
						</div>
						<span className="text-shadow-outline not-prose text-center text-base font-semibold tracking-tight text-pretty lg:skew-x-[-16deg] lg:text-xl">
							{name}
						</span>
						<div />
					</div>
				</Link>
			</CardFooter>
		</Card>
	);
}

export default AgentCard;
