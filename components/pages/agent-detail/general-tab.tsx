'use client';

import { useMemo, useState } from 'react';
import { useMediaQuery } from '@react-hookz/web';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/link';
import { Badge } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Slider } from '@/components/ui/slider';

import type { Ascension, FilterValue } from '@/services/hakushin/models/agent';

function GeneralTab(props: {
	faction?: FilterValue[];
	codeName?: string;
	name?: string;
	description?: string;
	specialty?: FilterValue[];
	stat?: FilterValue[];
	ascension?: Ascension;
}) {
	const { ascension, faction, codeName, name, description, specialty, stat } = props;
	const t = useTranslations('AgentDetail');
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
	const [lvl, setLvl] = useState([0]);

	const statLvl = useMemo(() => {
		if (!ascension) return undefined;
		const currentLvl = lvl[0] === 0 ? 1 : lvl[0];
		const findStatLvl = ascension.data?.find((item) => item.key === currentLvl.toString());
		if (findStatLvl) {
			return findStatLvl;
		} else {
			return undefined;
		}
	}, [lvl, ascension]);

	return (
		<>
			<Box fullWidth className="items-start" radius="lg" showDecorImgs={false} size="sm">
				<span className="not-prose s4 text-primary-foreground ml-4 !font-black sm:ml-6">
					AGENT INFO
				</span>
				<div className="bg-background relative mt-1 flex min-h-48 w-full justify-between overflow-hidden rounded-sm px-4 py-4 sm:px-6">
					{faction && faction[0] && faction[0]?.icon ? (
						<>
							<div className="from-background to-muted/90 absolute top-0 left-0 z-10 size-full bg-gradient-to-r" />
							<div className="absolute top-0 left-0 flex h-full w-full justify-end">
								<Image
									optimizeImg
									alt={`Faction Icon ${faction[0].value}`}
									height={160}
									src={faction[0].icon}
									width={160}
									classNames={{
										wrapper: 'aspect-square h-full scale-[3]',
										img: 'size-full object-cover',
									}}
								/>
							</div>
						</>
					) : null}
					<div className="z-20 flex flex-col">
						{faction && faction.length > 0 ? (
							<span className="not-prose s7 mb-4 !font-black opacity-80">{faction[0].value}</span>
						) : null}
						<h1 className="mb-2 !font-black">{name}</h1>
						{codeName ? (
							<span className="text-muted-foreground not-prose s5 !font-black !tracking-widest">
								{codeName}
							</span>
						) : null}
					</div>
					{faction && faction[0] && faction[0]?.icon && !isSm ? (
						<Image
							optimizeImg
							alt={`Faction Icon ${faction[0].value}`}
							height={160}
							src={faction[0].icon}
							width={160}
							classNames={{
								wrapper: 'aspect-square h-full z-20',
								img: 'size-full object-cover',
							}}
						/>
					) : null}
				</div>
				<div className="mt-5 flex w-full flex-col-reverse gap-4 px-0 sm:flex-row sm:px-4">
					<div className="w-full sm:w-1/2">
						<Slider
							max={60}
							min={0}
							step={10}
							value={lvl}
							classNames={{
								wrapper: 'h-16 w-full',
							}}
							onValueChange={setLvl}
						/>
					</div>
					<div className="bg-background border-background flex h-16 w-full flex-nowrap items-center gap-5 overflow-hidden rounded-full border-[6px] sm:w-1/2 sm:gap-[6.8%]">
						{stat && stat[0] ? (
							<Button
								asChild
								className="bg-muted hover:bg-accent h-full w-1/2 scale-110 -skew-x-[30deg] rounded-none px-0"
								showBgPattern={false}
								size="lg"
								variant="ghost"
							>
								<Link
									isExternal
									className="active:text-foreground flex items-center justify-center"
									href={`/agent?filter_ids=${stat[0].id}`}
								>
									<Image
										optimizeImg
										alt={`Stat Icon ${stat[0].value}`}
										height={24}
										radius="none"
										src={stat[0].icon}
										width={24}
										classNames={{
											wrapper: 'size-6 skew-x-[30deg] shrink-0 ml-4',
											img: 'size-full object-cover',
										}}
									/>
									<span className="not-prose s5 mr-3 skew-x-[30deg] text-center !font-extrabold whitespace-pre-line opacity-80">
										{stat[0].value}
									</span>
								</Link>
							</Button>
						) : null}
						{specialty && specialty[0] ? (
							<Button
								asChild
								className="bg-muted hover:bg-accent h-full w-1/2 scale-110 -skew-x-[30deg] rounded-none px-0"
								showBgPattern={false}
								size="lg"
								variant="ghost"
							>
								<Link
									isExternal
									className="active:text-foreground flex items-center justify-center"
									href={`/agent?filter_ids=${specialty[0].id}`}
								>
									<Image
										optimizeImg
										alt={`Specialty Icon ${specialty[0].value}`}
										height={24}
										radius="none"
										src={specialty[0].icon}
										width={24}
										classNames={{
											wrapper: 'size-6 skew-x-[30deg] shrink-0',
											img: 'size-full object-cover',
										}}
									/>
									<span className="not-prose s5 skew-x-[30deg] text-center !font-extrabold whitespace-pre-line opacity-80">
										{specialty[0].value}
									</span>
								</Link>
							</Button>
						) : null}
					</div>
				</div>
				<div className="mt-5 grid w-full grid-cols-1 gap-4 px-0 sm:grid-cols-2 sm:px-4">
					<Badge className="s7 bg-background text-foreground flex w-full grow-0 items-center justify-between border-0 px-4 py-1.5">
						<span className="not-prose !font-black">{t('level')}</span>
						<span className="not-prose ml-1 !font-black">{lvl[0] === 0 ? 1 : lvl[0]}</span>
					</Badge>
					{statLvl
						? statLvl?.combatList?.map((item, index) => (
								<Badge
									key={`${index}-${item.key}`}
									className="s7 bg-background text-foreground flex w-full grow-0 items-center justify-between border-0 px-4 py-1.5"
								>
									<span className="not-prose !font-black">{item.key}</span>
									<span className="not-prose ml-1 !font-black">{item.values?.[1]}</span>
								</Badge>
							))
						: null}
				</div>
			</Box>
			{description ? (
				<Box fullWidth showBgCorner radius="lg" showDecorImgs={false}>
					<div
						dangerouslySetInnerHTML={{
							__html: description,
						}}
					/>
				</Box>
			) : null}
		</>
	);
}

export default GeneralTab;
