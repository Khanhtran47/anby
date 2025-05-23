'use client';

import React, { useEffect, useState } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { useTranslations } from 'next-intl';

import { Box } from '@/components/ui/box';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const displayTimeZones = [
	{ name: 'Asia', zone: 'Asia/Tokyo' },
	{ name: 'Europe', zone: 'Europe/Paris' },
	{ name: 'America', zone: 'America/New_York' },
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
				const duration = intervalToDuration({
					start: nowInZone,
					end: targetTime,
				});

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
			<Tabs className="mt-3 w-full" defaultValue="Europe">
				<TabsList className="w-full">
					{displayTimeZones.map(({ name }) => (
						<TabsTrigger key={name} className="w-1/3" value={name}>
							{name}
						</TabsTrigger>
					))}
				</TabsList>
				{displayTimeZones.map(({ name }) => (
					<TabsContent
						key={name}
						className="flex flex-wrap items-start justify-between gap-2 p-4"
						value={name}
					>
						<p className="s7 not-prose text-justify">{t('timeUntilReset')}</p>
						<p className="s7 not-prose text-justify">{durations[name]}</p>
					</TabsContent>
				))}
			</Tabs>
		</Box>
	);
}
