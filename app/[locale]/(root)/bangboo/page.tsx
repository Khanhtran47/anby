import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getListBangboo } from '@/services/hakushin/api/bangboo';
import ErrorToast from '@/components/features/error-toast';
import { ListBangboos } from '@/components/pages/list-bangboo';

import type { Locale } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
	const { locale } = await props.params;

	const t = await getTranslations({ locale, namespace: 'BangbooPage' });
	const tb = await getTranslations({ locale, namespace: 'Brand' });

	return {
		title: `${t('title')} | ${tb('name')}`,
		description: t('description'),
	};
}

async function ListBangbooPage() {
	const bangboos = await getListBangboo();
	return (
		<>
			{!('error' in bangboos) ? (
				<ListBangboos bangboos={bangboos} className="mt-14 min-h-[850px]" />
			) : (
				<ErrorToast title={bangboos.error} />
			)}
		</>
	);
}

export default ListBangbooPage;
