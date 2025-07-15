import { getTranslations } from 'next-intl/server';

import PageHeader from '@/components/features/page-header';
import { Image } from '@/components/ui/image';

async function HomePageHeader() {
	const t = await getTranslations('HomePage');

	return (
		<PageHeader
			title={t('title')}
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

export default HomePageHeader;
