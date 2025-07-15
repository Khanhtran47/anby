import { getTranslations } from 'next-intl/server';

import { getChangelog } from '@/services/hakushin/api/changelog';
import PageHeader from '@/components/features/page-header';
import { Image } from '@/components/ui/image';

async function ChangelogPageHeader() {
	const changelog = await getChangelog();
	const t = await getTranslations('ChangelogPage');

	if ('error' in changelog) return null;

	return (
		<PageHeader
			title={`${t('title')} ${String(changelog?.version ?? '')}`}
			rightContent={
				<Image
					optimizeImg
					height={27}
					radius="none"
					src="https://anby.trandk.live/assets/images/zzz-logo-horizontal.png"
					width={100}
					classNames={{
						wrapper: 'w-[100px] h-[27px]',
						img: 'size-full',
					}}
				/>
			}
		/>
	);
}

export default ChangelogPageHeader;
