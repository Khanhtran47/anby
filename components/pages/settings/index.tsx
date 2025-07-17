'use client';

import { lazy, Suspense } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/link';
import { useDialogParams } from '@/utils/react/hooks/use-dialog-params';
import LocaleSwitcherSelect from '@/components/features/locale-switcher-select';
import ThemeToggle from '@/components/features/theme-toggle';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { Spinner } from '@/components/ui/spinner';

const HoyolabSyncDialog = lazy(() => import('./hoyolab-sync-dialog'));

function SettingsPage() {
	const t = useTranslations('SettingsPage');

	const hoyolabSettings = useDialogParams('hoyolab-settings');

	return (
		<div className="mt-15 mr-1 flex h-full flex-col items-center justify-center gap-3 pt-3 pr-2 pb-3 pl-3">
			<Box
				fullWidth
				className="2xs:justify-between 2xs:rounded-full 2xs:py-0 2xs:pr-0 2xs:pl-7 flex-row flex-wrap justify-start gap-3 overflow-visible"
				showDecorImgs={false}
				size="lg"
				classNames={{
					pattern: 'rounded-xl 2xs:rounded-full',
				}}
			>
				<span className="not-prose s7 !font-black">{t('language')}</span>
				<LocaleSwitcherSelect
					classNames={{
						trigger: 'rounded-sm 2xs:rounded-full h-14 w-full 2xs:w-[140px] sm:w-[160px]',
					}}
				/>
			</Box>
			<Box
				fullWidth
				className="2xs:justify-between 2xs:rounded-full 2xs:py-0 2xs:pr-0 2xs:pl-7 flex-row flex-wrap justify-start gap-4 overflow-visible"
				showDecorImgs={false}
				size="lg"
				classNames={{
					pattern: 'rounded-xl 2xs:rounded-full',
				}}
			>
				<span className="not-prose s7 !font-black">{t('theme')}</span>
				<ThemeToggle
					showValue
					classNames={{
						trigger: 'rounded-sm 2xs:rounded-full w-full  2xs:w-[140px] sm:w-[160px] h-14',
						content: 'w-[140px] sm:w-[160px]',
					}}
				/>
			</Box>
			{process.env.NEXT_PUBLIC_APP_ENV === 'development' ? (
				<Box
					fullWidth
					className="2xs:justify-between 2xs:rounded-full 2xs:py-0 2xs:pr-0 2xs:pl-7 flex-row flex-wrap justify-start gap-4 overflow-visible"
					showDecorImgs={false}
					size="lg"
					classNames={{
						pattern: 'rounded-xl 2xs:rounded-full',
					}}
				>
					<span className="not-prose s7 !font-black">{t('hoyolabAccountSettings')}</span>
					<Dialog
						contentHeight="full"
						contentWidth="8xl"
						dialogTitle={t('hoyolabAccountSettings')}
						showDialog={hoyolabSettings.isOpen}
						trigger={
							<Button
								className="size-14"
								icon="chevron-right-bold"
								onClick={() => hoyolabSettings.open()}
							/>
						}
						onOpen={() => hoyolabSettings.open()}
						onOpenChange={(open) => {
							if (!open) hoyolabSettings.close();
						}}
					>
						<Suspense
							fallback={
								<div className="flex size-full items-center justify-center">
									<Spinner size="lg" />
								</div>
							}
						>
							<HoyolabSyncDialog />
						</Suspense>
					</Dialog>
				</Box>
			) : null}
			<Box
				fullWidth
				className="2xs:justify-between 2xs:rounded-full 2xs:py-0 2xs:pr-0 2xs:pl-7 flex-row flex-wrap justify-start gap-4 overflow-visible"
				showDecorImgs={false}
				size="lg"
				classNames={{
					pattern: 'rounded-xl 2xs:rounded-full',
				}}
			>
				<span className="not-prose s7 !font-black">{t('feedback')}</span>
				<Button asChild className="size-14" icon="chevron-right-bold">
					<Link isExternal href="https://github.com/Khanhtran47/anby/issues/new/choose" />
				</Button>
			</Box>
			<Box fullWidth showBgCorner className="gap-3" showDecorImgs={false} size="lg">
				<div className="flex w-full items-center justify-center gap-3">
					<Image
						optimizeImg
						alt="Brand Logo"
						height={56}
						radius="full"
						src="https://raw.githubusercontent.com/Khanhtran47/anby/refs/heads/main/public/assets/images/logo.webp"
						width={56}
						classNames={{
							wrapper: 'size-14',
							img: 'size-full object-cover',
						}}
					/>
					<span className="not-prose s10 !font-black">Anby</span>
				</div>
				<div className="flex w-full items-center justify-center gap-3">
					<Button asChild wrapIcon icon="github">
						<Link isExternal href="https://github.com/Khanhtran47/anby">
							GitHub
						</Link>
					</Button>
					<Button asChild wrapIcon icon="storybook">
						<Link isExternal href="https://khanhtran47.github.io/anby/">
							Storybook
						</Link>
					</Button>
				</div>
				<p className="!mt-0 max-w-5xl">{t('about')}</p>
			</Box>
		</div>
	);
}

export default SettingsPage;
