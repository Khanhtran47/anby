'use client';

import React, { useEffect, useState } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useTranslations } from 'next-intl';

import { Box } from '@/components/ui/box';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const displayTimeZones = [
	{ name: 'asia', zone: 'Asia/Tokyo' },
	{ name: 'europe', zone: 'Europe/Paris' },
	{ name: 'america', zone: 'America/New_York' },
];

function getNextTargetTime() {
	const target = new Date();

	target.setDate(target.getHours() >= 4 ? target.getDate() + 1 : target.getDate());
	target.setHours(5, 0, 0, 0);

	return target;
}

export default function ServerResetTimeCountdown() {
	const t = useTranslations('HomePage');
	const [durations, setDurations] = useState<Record<string, string>>({});

	useEffect(() => {
		const update = () => {
			const now = new Date();
			const targetTime = getNextTargetTime();
			const updated: Record<string, string> = {};

			displayTimeZones.forEach(({ name, zone }) => {
				const nowInZone = toZonedTime(now, zone);
				let duration = intervalToDuration({
					start: nowInZone,
					end: targetTime,
				});

				if (
					(duration.hours ?? 0) < 0 ||
					(duration.minutes ?? 0) < 0 ||
					(duration.seconds ?? 0) < 0
				) {
					duration = {
						...duration,
						hours: (duration.hours ?? 0) < 0 ? 23 + (duration.hours ?? 0) : duration.hours,
						minutes: (duration.minutes ?? 0) < 0 ? 59 + (duration.minutes ?? 0) : duration.minutes,
						seconds: (duration.seconds ?? 0) < 0 ? 59 + (duration.seconds ?? 0) : duration.seconds,
					};
				}

				updated[name] = formatDuration(duration, {
					format: ['hours', 'minutes', 'seconds'],
					zero: true,
				});
			});

			setDurations(updated);
		};

		update();
		const interval = setInterval(update, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Box
			fullWidth
			showBgCorner
			className="flex-col items-start"
			radius="md"
			size="lg"
			title={t('serverResetTime')}
		>
			<Tabs className="mt-3 w-full" defaultValue="europe">
				<TabsList className="w-full">
					{displayTimeZones.map(({ name }) => (
						<TabsTrigger key={name} className="w-1/3" value={name}>
							{t(name)}
						</TabsTrigger>
					))}
				</TabsList>
				{displayTimeZones.map(({ name }) => (
					<TabsContent
						key={name}
						className="flex flex-col items-start justify-center gap-2 p-4"
						value={name}
					>
						<p className="s6 text-muted-foreground not-prose">{t('timeUntilReset')}</p>
						{durations[name] ? (
							<p className="s7 not-prose">{durations[name]}</p>
						) : (
							<Skeleton className="bg-muted-foreground/50 h-7 w-64" />
						)}
					</TabsContent>
				))}
			</Tabs>
		</Box>
	);
}
