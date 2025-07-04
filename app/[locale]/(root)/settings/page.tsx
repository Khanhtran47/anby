import React from 'react';
import { getTranslations } from 'next-intl/server';

import SettingsPage from '@/components/pages/settings';

import type { Locale } from 'next-intl';

export async function generateMetadata(props: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await props.params;

	const t = await getTranslations({ locale, namespace: 'SettingsPage' });
	const tb = await getTranslations({ locale, namespace: 'Brand' });

	return {
		title: `${t('title')} | ${tb('name')}`,
		description: t('description'),
	};
}

function Settings() {
	return <SettingsPage />;
}

export default Settings;
