'use client';

import { useTranslations } from 'next-intl';

import LocaleSwitcherSelect from '@/components/features/locale-switcher-select';
import ThemeToggle from '@/components/features/theme-toggle';
import { Box } from '@/components/ui/box';

function SettingsPage() {
	const t = useTranslations('SettingsPage');
	return (
		<div className="mt-1 mr-1 flex h-full flex-col items-center justify-center gap-4 pt-3 pr-2 pl-3">
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
		</div>
	);
}

export default SettingsPage;
