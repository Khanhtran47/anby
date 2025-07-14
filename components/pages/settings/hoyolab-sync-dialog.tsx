'use client';

import { lazy, Suspense, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
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
	const { accounts, addAccount } = useHoyolabAccount();
	const addAccountSettings = useDialogParams('add-account');
	const addAccountForm = useForm<HoyolabAccount>({
		resolver: zodResolver(hoyolabAccountSchema),
		defaultValues: {
			server: '',
			uid: '',
			ltoken: '',
			ltuid: '',
		},
	});

	const [showAlert, setShowAlert] = useState(true);

	async function onAddAccountSubmit(values: HoyolabAccount) {
		try {
			await addAccount(values);
			toast.success('Hoyolab account saved successfully!');
			addAccountForm.reset();
			addAccountSettings.close();
		} catch (e) {
			console.error('Error saving Hoyolab account: ', e);
			toast.error('Failed to save Hoyolab account. Please try again later.');
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
						description="The information you provide will be used to sync your Hoyolab account with this app. Please note that this information is used solely for processing requests to Hoyolab and is not stored or shared with any third parties."
						icon="alert-bold"
						isVisible={showAlert}
						onVisibilityChange={setShowAlert}
					/>
					{accounts && accounts.length > 0
						? accounts.map((account) => (
								<AccountBox
									key={account.uid}
									ltoken={account.ltoken}
									ltuid={account.ltuid}
									server={account.server}
									uid={account.uid}
								/>
							))
						: null}
					<Form {...addAccountForm}>
						<Dialog
							contentHeight="full"
							dialogTitle="Add Account Settings"
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
										aria-label="Confirm"
										form="hoyolab-settings-form"
										icon="check-circle-bold"
										isDisabled={!addAccountForm.formState.isDirty}
										type="submit"
										classNames={{
											root: 'w-full',
											icon: 'text-green-500',
										}}
									>
										Save
									</Button>
									<Button
										wrapIcon
										aria-label="Reset Filters"
										icon="refresh-circle-bold"
										isDisabled={!addAccountForm.formState.isDirty}
										classNames={{
											root: 'w-full',
											icon: 'text-yellow-500',
										}}
										onClick={() => addAccountForm.reset()}
									>
										Reset
									</Button>
									<Button
										wrapIcon
										aria-label="Cancel"
										icon="close-circle-bold"
										classNames={{
											root: 'w-full',
											icon: 'text-red-500',
										}}
										onClick={() => addAccountSettings.close()}
									>
										Cancel
									</Button>
								</>
							}
							trigger={
								<Button
									wrapIcon
									icon="add-bold"
									size="lg"
									onClick={() => addAccountSettings.open()}
								>
									Add account
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
					<span className="not-prose s8">Guide</span>
					<p>
						To sync your Hoyolab account, you need to provide your UID and your game server. Make
						sure you public your battle record in Hoyolab settings.
					</p>
					<p>
						For more features like daily check-in and viewing your current game progress, you need
						to provide your <b>ltoken</b> and <b>ltuid</b>. Follow the steps below to get your i
						ltoken and ltuid:
					</p>
					<ol className="[&>p]:text-muted-foreground list-decimal pl-6 [&>li]:mt-4 [&>li]:font-extrabold">
						<li>Open a Desktop Browser, access to HoYoLab and log in to your HoYoLab account.</li>
						<li>Navigate to the Zenless Zone Zero Battle Records page.</li>
						<p>
							You can find it at{' '}
							<a
								className="text-yellow-500 hover:underline"
								href="https://act.hoyolab.com/app/zzz-game-record/index.html#/zzz"
								rel="noopener noreferrer"
								target="_blank"
							>
								https://act.hoyolab.com/app/zzz-game-record/index.html#/zzz
							</a>
							. Or HoYoLab {'>'} Zenless Zone Zero {'>'} Battle Records.
						</p>
						<li>Open the browser's developer tools (F12 or right-click and select "Inspect").</li>
						<p>
							Navigate to the <strong>Application"</strong> tab in the developer tools, then look
							for the <strong>Cookies</strong> section in the left sidebar.
						</p>
						<p>
							Find the cookie named <strong>ltoken_v2</strong> and <strong>ltuid_v2</strong>, then
							copy their values and paste them into the form.
						</p>
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
