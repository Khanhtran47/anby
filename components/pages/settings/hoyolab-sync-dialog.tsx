'use client';

import { lazy, Suspense, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useDialogParams } from '@/utils/react/hooks/use-dialog-params';
import { hoyolabAccountSchema } from '@/schemas/account-sync';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Image } from '@/components/ui/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinner';

import { useHoyolabAccount } from './use-hoyolab-account';

import type { HoyolabAccount } from '@/schemas/account-sync';

const AccountDialog = lazy(() => import('./account-dialog'));
const AccountBox = lazy(() => import('./account-box'));

function HoyolabSyncDialog() {
	const t = useTranslations('SettingsPage');
	const { accounts, addAccount, removeAccount, updateAccount, setDefaultAccount } =
		useHoyolabAccount();
	const addAccountSettings = useDialogParams('add-account');
	const addAccountForm = useForm<HoyolabAccount>({
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

	const [showAlert, setShowAlert] = useState(true);

	async function onAddAccountSubmit(values: HoyolabAccount) {
		try {
			if (accounts.some((acc) => acc.uid === values.uid && acc.server === values.server)) {
				toast.error(t('hoyolabAccountExistsError'));
				return;
			}
			await addAccount({ ...values, id: crypto.randomUUID() });
			toast.success(t('hoyolabAccountAddedSuccess'));
			addAccountForm.reset();
			addAccountSettings.close();
		} catch (e) {
			console.error('Error saving Hoyolab account: ', e);
			toast.error(t('hoyolabAccountSaveError'));
			return;
		}
	}

	return (
		<ScrollArea
			className="3xl:h-[calc(100dvh-14rem)] flex h-[calc(95dvh-11rem)] w-full flex-col gap-4 sm:h-[calc(100dvh-16rem)]"
			type="always"
		>
			<div className="flex w-full flex-col gap-4 lg:flex-row">
				<div className="flex w-full flex-col gap-3 lg:w-1/2">
					<Alert
						isClosable
						description={t('hoyolabSyncAlert')}
						icon="alert-bold"
						isVisible={showAlert}
						onVisibilityChange={setShowAlert}
					/>
					{accounts && accounts.length > 0
						? accounts.map((account) => (
								<AccountBox
									key={account.id}
									id={account.id}
									isDefault={account.isDefault}
									ltoken={account.ltoken}
									ltuid={account.ltuid}
									removeAccount={removeAccount}
									server={account.server}
									setDefaultAccount={setDefaultAccount}
									uid={account.uid}
									updateAccount={updateAccount}
								/>
							))
						: null}
					<Form {...addAccountForm}>
						<Dialog
							contentHeight="full"
							dialogTitle={t('addAccountDialogTitle')}
							showDialog={addAccountSettings.isOpen}
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
										isDisabled={!addAccountForm.formState.isDirty}
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
										isDisabled={!addAccountForm.formState.isDirty}
										classNames={{
											root: 'w-full',
											icon: 'text-yellow-500',
										}}
										onClick={() => addAccountForm.reset()}
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
										onClick={() => addAccountSettings.close()}
									>
										{t('cancel')}
									</Button>
								</>
							}
							trigger={
								<Button
									wrapIcon
									aria-label={t('addAccount')}
									icon="add-bold"
									size="lg"
									onClick={() => addAccountSettings.open()}
								>
									{t('addAccount')}
								</Button>
							}
							onOpen={() => addAccountSettings.open()}
							onOpenChange={(open) => {
								if (!open) addAccountSettings.close();
							}}
						>
							<Suspense
								fallback={
									<div className="flex size-full items-center justify-center">
										<Spinner size="lg" />
									</div>
								}
							>
								<AccountDialog form={addAccountForm} type="add" onSubmit={onAddAccountSubmit} />
							</Suspense>
						</Dialog>
					</Form>
				</div>
				<div className="w-full lg:w-1/2">
					<span className="not-prose s8">{t('guide')}</span>
					<p>{t('hoyolabSyncDescription')}</p>
					<p
						dangerouslySetInnerHTML={{
							__html: t.raw('hoyolabSyncGuide'),
						}}
					/>
					<ol className="[&>p]:text-muted-foreground list-decimal pl-6 [&>li]:mt-4 [&>li]:font-extrabold">
						<li>{t('hoyolabSyncStep1')}</li>
						<li>{t('hoyolabSyncStep2')}</li>
						<p>
							{t.rich('hoyolabSyncStep2Description', {
								records: (chunks: React.ReactNode) => (
									<a
										className="text-yellow-500 hover:underline"
										href="https://act.hoyolab.com/app/zzz-game-record/index.html#/zzz"
										rel="noopener noreferrer"
										target="_blank"
									>
										{chunks}
									</a>
								),
							})}
						</p>
						<li>{t('hoyolabSyncStep3')}</li>
						<p dangerouslySetInnerHTML={{ __html: t.raw('hoyolabSyncStep3Description') }} />
						<p dangerouslySetInnerHTML={{ __html: t.raw('hoyolabSyncStep3Description2') }} />
						<Image
							alt="guide to get ltoken and ltuid"
							src="/assets/images/account-settings-guide.webp"
							classNames={{
								wrapper: 'w-full mt-3',
								img: 'size-full object-contain',
							}}
						/>
					</ol>
				</div>
			</div>
		</ScrollArea>
	);
}

export default HoyolabSyncDialog;
