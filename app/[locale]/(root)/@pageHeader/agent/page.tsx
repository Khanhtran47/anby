import { getLocale, getTranslations } from 'next-intl/server';

import { getMenuFilters } from '@/services/hoyolab/api/menu-filters';
import { LANGUAGES } from '@/constants/lang';
import ErrorToast from '@/components/features/error-toast';
import MenuFilters from '@/components/features/menu-filters';
import PageHeader from '@/components/features/page-header';

async function AgentPageHeader() {
	const locale = await getLocale();
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const menuFilters = await getMenuFilters({ langKey, menuId: 8 });
	const t = await getTranslations('AgentsPage');

	return (
		<PageHeader
			title={t('title')}
			rightContent={
				'error' in menuFilters ? (
					<ErrorToast title={menuFilters.error} />
				) : (
					<MenuFilters menuFilters={menuFilters} />
				)
			}
		/>
	);
}

export default AgentPageHeader;
