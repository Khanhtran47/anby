'use client';

import { lazy, Suspense, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { fetchGameRecord, fetchMemDetail } from '@/services/hoyolab/api/game-record/client';
import { useDialogParams } from '@/utils/react/hooks/use-dialog-params';
import { hoyolabAccountSchema } from '@/schemas/account-sync';
import { LANGUAGES } from '@/constants/lang';
import { SERVERS } from '@/constants/servers';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Image } from '@/components/ui/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

import type { HoyolabAccount } from '@/schemas/account-sync';
import type { GameRecordData, MemDetailData } from '@/services/hoyolab/models/game-record';

const AccountDialog = lazy(() => import('./account-dialog'));

interface AccountBoxProps {
	isDefault: boolean;
	id: string;
	uid: string;
	server: string;
	ltoken: string;
	ltuid: string;
	removeAccount: (id: string) => Promise<void>;
	updateAccount: (data: HoyolabAccount) => Promise<void>;
	setDefaultAccount: (id: string) => Promise<void>;
}

function AccountBox(props: AccountBoxProps) {
	const {
		id,
		isDefault,
		ltoken,
		ltuid,
		server,
		uid,
		removeAccount,
		updateAccount,
		setDefaultAccount,
	} = props;
	const t = useTranslations('SettingsPage');
	const locale = useLocale();
	const editAccountSettings = useDialogParams(`edit-account-${id}`);
	const removeAccountSettings = useDialogParams(`remove-account-${id}`);

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

	const editAccountForm = useForm<HoyolabAccount>({
		resolver: zodResolver(hoyolabAccountSchema),
		defaultValues: {
			id: '',
			isDefault: false,
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
		<Box key={uid} showBgCorner className="gap-4" showDecorImgs={false}>
			<div className="flex w-full justify-between">
				<div className="flex min-h-16 items-center gap-4">
					{gameRecord.isLoading ? (
						<Skeleton className="bg-muted-foreground/50 size-16 rounded-full" />
					) : gameRecord.data?.cur_head_icon_url ? (
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
					) : (
						<Image
							alt="Account not found"
							height={64}
							radius="full"
							src="/assets/images/no-image.webp"
							width={64}
							classNames={{
								wrapper: 'size-16 shrink-0',
								img: 'size-full',
							}}
						/>
					)}
					<div className="flex flex-col items-start justify-center gap-1">
						{memDetail.isLoading ? (
							<Skeleton className="bg-muted-foreground/50 h-6 w-32 rounded-sm" />
						) : (
							<span className="not-prose s8">{memDetail.data?.nick_name || t('noDataFound')}</span>
						)}
						<span className="text-lg font-bold">
							{t(server)} - UID {uid}
						</span>
						{gameRecord.isError || memDetail.isError ? (
							<span className="text-red-500">
								{t('hoyolabAccountError', {
									server: t(server),
									uid,
								})}
							</span>
						) : null}
					</div>
				</div>
				{isDefault ? (
					<Badge className="animate-bg-gradient text-background h-fit">{t('default')}</Badge>
				) : null}
			</div>
			<div className="xs:flex-nowrap z-20 flex w-full flex-wrap justify-end gap-2">
				<Button
					aria-label="Set Default Account"
					className="h-12 w-fit"
					isDisabled={isDefault}
					onClick={async () => {
						await setDefaultAccount(id);
						toast.success(t('hoyolabAccountSetDefaultSuccess'));
					}}
				>
					{t('setDefault')}
				</Button>
				<Form {...editAccountForm}>
					<Dialog
						contentHeight="full"
						dialogTitle={t('editAccountDialogTitle')}
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
									editAccountForm.setValue('id', id);
									editAccountForm.setValue('isDefault', isDefault);
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
				<AlertDialog
					alertDialogAction={t('remove')}
					alertDialogCancel={t('cancel')}
					alertDialogTitle={t('removeAccountDialogTitle')}
					showAlertDialog={removeAccountSettings.isOpen}
					classNames={{
						overlay: 'z-[60]',
						content: 'z-[70]',
					}}
					trigger={
						<Button
							aria-label="Remove Account"
							className="rounded-full"
							icon="delete-light"
							size="icon"
							variant="destructive"
							onClick={async () => {
								removeAccountSettings.open();
							}}
						/>
					}
					onClickCancel={() => removeAccountSettings.close()}
					onClickAction={async () => {
						try {
							await removeAccount(id);
							toast.success(t('hoyolabAccountRemovedSuccess'));
							removeAccountSettings.close();
						} catch (e) {
							console.error('Error removing Hoyolab account: ', e);
							toast.error(t('hoyolabAccountRemoveError'));
						}
					}}
					onOpenChange={(open) => {
						if (!open) removeAccountSettings.close();
					}}
				>
					{t('removeAccountDialogDescription')}
				</AlertDialog>
			</div>
		</Box>
	);
}

export default AccountBox;
