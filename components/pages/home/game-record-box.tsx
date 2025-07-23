'use client';

import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { intervalToDuration } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Link } from '@/i18n/link';
import { fetchCheckinInfo, fetchCheckinSign } from '@/services/hoyolab/api/check-in';
import { fetchGameRecord, fetchMemDetail, fetchNote } from '@/services/hoyolab/api/game-record';
import { LANGUAGES } from '@/constants/lang';
import { SERVERS } from '@/constants/servers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Spinner } from '@/components/ui/spinner';

import type { HoyolabAccount } from '@/schemas/account-sync';
import type { CheckInInfoData } from '@/services/hoyolab/models/check-in';
import type {
	GameRecordData,
	MemDetailData,
	NoteData,
} from '@/services/hoyolab/models/game-record';

interface GameRecordBoxProps {
	defaultAccount: HoyolabAccount;
}

function GameRecordBox(props: GameRecordBoxProps) {
	const { defaultAccount } = props;
	const { uid, server, ltoken, ltuid } = defaultAccount;
	const locale = useLocale();
	const t = useTranslations('HomePage');
	const serverId = useMemo(
		() => SERVERS.find((s) => s.value === defaultAccount?.server)?.serverId ?? '',
		[defaultAccount?.server],
	);
	const langKey = useMemo(
		() => LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us',
		[locale],
	);

	const gameRecord = useQuery<GameRecordData>({
		queryKey: ['game-record', server, uid, langKey, ltoken, ltuid],
		queryFn: () =>
			fetchGameRecord({
				server: serverId,
				uid,
				langKey,
				ltoken,
				ltuid,
			}),
		staleTime: 60 * 60 * 12, // 12 hours
	});
	const memDetail = useQuery<MemDetailData>({
		queryKey: ['mem-detail', server, uid, 2, langKey, ltoken, ltuid],
		queryFn: () =>
			fetchMemDetail({
				server: serverId,
				uid,
				scheduleType: '2',
				langKey,
				ltoken,
				ltuid,
			}),
		staleTime: 60 * 60 * 12, // 12 hours
	});

	const checkinInfo = useQuery<CheckInInfoData>({
		queryKey: ['check-in-info', langKey, ltoken, ltuid],
		queryFn: () => fetchCheckinInfo({ langKey, ltoken, ltuid }),
	});

	const checkinSign = useMutation<{ success: true }>({
		mutationFn: () => fetchCheckinSign({ langKey, ltoken, ltuid }),
		onSuccess: async () => {
			await checkinInfo.refetch();
			toast.success(t('checkInSuccess'));
		},
	});

	const note = useQuery<NoteData>({
		queryKey: ['note', server, uid, langKey, ltoken, ltuid],
		queryFn: () =>
			fetchNote({
				server: serverId,
				uid,
				langKey,
				ltoken,
				ltuid,
			}),
		staleTime: 60 * 10, // 10 minutes
	});

	const isLoading = useMemo(
		() => gameRecord.isLoading || memDetail.isLoading,
		[gameRecord.isLoading, memDetail.isLoading],
	);

	const duration = useMemo(() => {
		if (note.data?.energy?.restore)
			return intervalToDuration({ start: 0, end: note.data.energy.restore * 1000 });
		return null;
	}, [note.data?.energy?.restore]);
	const hours = useMemo(() => {
		if (!duration) return '00';
		return duration.hours?.toString().padStart(2, '0') || '00';
	}, [duration]);
	const minutes = useMemo(() => {
		if (!duration) return '00';
		return duration.minutes?.toString().padStart(2, '0') || '00';
	}, [duration]);

	return (
		<>
			{isLoading ? (
				<div className="flex w-full justify-center">
					<Spinner />
				</div>
			) : gameRecord.isSuccess && memDetail.isSuccess ? (
				<>
					<Card className="relative w-full overflow-hidden border-transparent bg-transparent shadow-none">
						<CardHeader className="absolute top-2 left-2 z-20 flex w-[calc(100%-1rem)] flex-row items-center justify-between p-0">
							{checkinInfo.isSuccess ? (
								<Button
									wrapIcon
									aria-label={checkinInfo.data?.is_sign ? t('checkInDone') : t('checkIn')}
									className="mr-auto"
									icon="calendar-bold"
									isDisabled={checkinInfo.data?.is_sign || checkinSign.isPending}
									onClick={() => checkinSign.mutate()}
								>
									{checkinInfo.data?.is_sign ? t('checkInDone') : t('checkIn')}
								</Button>
							) : (
								<div />
							)}
						</CardHeader>
						<div className="from-background absolute bottom-0 z-10 h-3/4 w-full bg-gradient-to-t to-transparent" />
						<CardContent className="relative z-0 p-0">
							<Image
								alt="Background Card"
								src={gameRecord.data?.game_data_show?.card_url}
								classNames={{
									wrapper: 'w-full aspect-video lg:aspect-[8/3]',
									img: 'size-full object-cover',
								}}
							/>
						</CardContent>
						<CardFooter className="absolute bottom-2 left-2 z-20 flex w-[calc(100%-1rem)] flex-wrap items-center justify-between gap-4 p-0">
							<div className="hidden items-center gap-4 sm:flex">
								<Image
									addCorsProxy
									optimizeImg
									alt="Avatar"
									height={64}
									radius="full"
									src={gameRecord.data?.cur_head_icon_url}
									width={64}
									classNames={{
										wrapper: 'size-16',
										img: 'size-full',
									}}
								/>
								<div className="flex flex-col justify-center gap-1">
									<span className="not-prose s8">{memDetail.data?.nick_name || t('unknown')}</span>
									<span className="not-prose s4 text-foreground/80">
										{t(server)} | UID {uid}
									</span>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Image
									alt="Battery Charge Icon"
									height={40}
									src="https://static.wikia.nocookie.net/zenless-zone-zero/images/2/26/Item_Battery_Charge.png"
									width={40}
									classNames={{
										wrapper: 'size-10',
										img: 'size-full object-cover',
									}}
								/>
								<div className="flex flex-col gap-1">
									<span className="not-prose s4 text-foreground">
										{note.data?.energy?.progress?.current} /{' '}
										{note.data?.energy?.progress?.max || 240}
									</span>
									<span className="not-prose s4 text-foreground/60">{`${hours}h ${minutes}m`}</span>
								</div>
							</div>
						</CardFooter>
					</Card>
				</>
			) : null}
			{gameRecord.isError || memDetail.isError ? (
				<>
					<span className="text-red-500">
						{t('hoyolabAccountError', {
							server: t(server),
							uid,
						})}
					</span>
					<Button asChild wrapIcon icon="settings-bold">
						<Link className="text-primary hover:underline" href="/settings?hoyolab-settings=open">
							{t('accountSettings')}
						</Link>
					</Button>
				</>
			) : null}
		</>
	);
}

export default GameRecordBox;
