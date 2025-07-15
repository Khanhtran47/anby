import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getListWEngine } from '@/services/hakushin/api/w-engine';
import ErrorToast from '@/components/features/error-toast';
import { ListWEngines } from '@/components/pages/list-w-engine';

import type { Locale } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
	const { locale } = await props.params;

	const t = await getTranslations({ locale, namespace: 'WEnginePage' });
	const tb = await getTranslations({ locale, namespace: 'Brand' });

	return {
		title: `${t('title')} | ${tb('name')}`,
		description: t('description'),
	};
}

async function ListWEnginePage() {
	const wEngines = await getListWEngine();
	return (
		<>
			{'error' in wEngines ? (
				<ErrorToast title={wEngines.error} />
			) : (
				<ListWEngines className="mt-14 min-h-[850px]" wEngines={wEngines} />
			)}
		</>
	);
}

export default ListWEnginePage;
