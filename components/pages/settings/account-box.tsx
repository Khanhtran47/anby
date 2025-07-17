'use client';

import { lazy, Suspense, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { fetchGameRecord, fetchMemDetail } from '@/services/hoyolab/api/game-record';
import { useDialogParams } from '@/utils/react/hooks/use-dialog-params';
import { hoyolabAccountSchema } from '@/schemas/account-sync';
import { LANGUAGES } from '@/constants/lang';
import { SERVERS } from '@/constants/servers';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

import { useHoyolabAccount } from './use-hoyolab-account';

import type { HoyolabAccount } from '@/schemas/account-sync';
import type { GameRecordData, MemDetailData } from '@/services/hoyolab/models/game-record';

const AccountDialog = lazy(() => import('./account-dialog'));

interface AccountBoxProps {
	uid: string;
	server: string;
	ltoken: string;
	ltuid: string;
}

function AccountBox(props: AccountBoxProps) {
	const { ltoken, ltuid, server, uid } = props;
	const t = useTranslations('SettingsPage');
	const locale = useLocale();
	const { removeAccount, updateAccount } = useHoyolabAccount();
	const editAccountSettings = useDialogParams('edit-account');

	const serverId = useMemo(() => SERVERS.find((s) => s.value === server)?.serverId ?? '', [server]);
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
	});

	const editAccountForm = useForm<HoyolabAccount>({
		resolver: zodResolver(hoyolabAccountSchema),
		defaultValues: {
			server: '',
			uid: '',
			ltoken: '',
			ltuid: '',
		},
	});

	async function onUpdateAccountSubmit(values: HoyolabAccount) {
		try {
			await updateAccount(values);
			toast.success(t('hoyolabAccountUpdatedSuccess'));
			editAccountForm.reset();
			editAccountSettings.close();
		} catch (e) {
			console.error('Error updating Hoyolab account: ', e);
			toast.error(t('hoyolabAccountUpdateError'));
			return;
		}
	}

	return (
		<Box key={uid} className="gap-4">
			<div className="flex h-16 w-full items-center gap-4">
				{gameRecord.isLoading ? (
					<Skeleton className="bg-muted-foreground/50 size-16 rounded-full" />
				) : (
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
				)}
				<div className="flex flex-col items-start justify-center gap-1">
					{memDetail.isLoading ? (
						<Skeleton className="bg-muted-foreground/50 h-6 w-32 rounded-sm" />
					) : (
						<span className="not-prose s8">{memDetail.data?.nick_name}</span>
					)}
					<span className="text-lg font-bold">
						{t(server)} - UID {uid}
					</span>
				</div>
			</div>
			<div className="z-20 flex w-full justify-end gap-2">
				<Form {...editAccountForm}>
					<Dialog
						contentHeight="full"
						dialogTitle="Add Account Settings"
						showDialog={editAccountSettings.isOpen}
						classNames={{
							overlay: 'z-[60]',
							content: 'z-[70]',
							footer: 'sm:flex-row-reverse',
						}}
						dialogFooter={
							<>
								<Button
									wrapIcon
									aria-label={t('save')}
									form="hoyolab-settings-form"
									icon="check-circle-bold"
									isDisabled={!editAccountForm.formState.isDirty}
									type="submit"
									classNames={{
										root: 'w-full',
										icon: 'text-green-500',
									}}
								>
									{t('save')}
								</Button>
								<Button
									wrapIcon
									aria-label={t('reset')}
									icon="refresh-circle-bold"
									isDisabled={!editAccountForm.formState.isDirty}
									classNames={{
										root: 'w-full',
										icon: 'text-yellow-500',
									}}
									onClick={() => editAccountForm.reset()}
								>
									{t('reset')}
								</Button>
								<Button
									wrapIcon
									aria-label={t('cancel')}
									icon="close-circle-bold"
									classNames={{
										root: 'w-full',
										icon: 'text-red-500',
									}}
									onClick={() => editAccountSettings.close()}
								>
									{t('cancel')}
								</Button>
							</>
						}
						trigger={
							<Button
								aria-label="Edit Account"
								icon="edit-bold"
								size="icon"
								onClick={async () => {
									editAccountForm.setValue('server', server);
									editAccountForm.setValue('uid', uid);
									editAccountForm.setValue('ltoken', ltoken || '');
									editAccountForm.setValue('ltuid', ltuid || '');
									editAccountSettings.open();
								}}
							/>
						}
						onOpen={() => editAccountSettings.open()}
						onOpenChange={(open) => {
							if (!open) editAccountSettings.close();
						}}
					>
						<Suspense
							fallback={
								<div className="flex size-full items-center justify-center">
									<Spinner size="lg" />
								</div>
							}
						>
							<AccountDialog form={editAccountForm} type="edit" onSubmit={onUpdateAccountSubmit} />
						</Suspense>
					</Dialog>
				</Form>
				<Button
					aria-label="Remove Account"
					icon="delete-light"
					size="icon"
					onClick={async () => {
						await removeAccount(uid);
						toast.success(t('hoyolabAccountRemovedSuccess'));
					}}
				/>
			</div>
		</Box>
	);
}

export default AccountBox;
