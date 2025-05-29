import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getChangelog } from '@/services/hakushin/api/changelog';
import PageHeader from '@/components/features/page-header';
import { Image } from '@/components/ui/image';

import ChangelogAgents from './agent';
import ChangelogBangboos from './bangboo';
import ChangelogDriveDiscs from './drive-disc';
import ChangelogWEngines from './w-engine';

import type { Locale } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Omit<Props, 'children'>) {
	const { locale } = await props.params;

	const t = await getTranslations({ locale, namespace: 'ChangelogPage' });
	const tb = await getTranslations({ locale, namespace: 'Brand' });

	return {
		title: `${t('title')} | ${tb('name')}`,
		description: t('description'),
	};
}

async function ChangelogPage() {
	const changelog = await getChangelog();
	const t = await getTranslations('ChangelogPage');
	if ('error' in changelog) return null;
	return (
		<>
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
			{changelog?.agents && changelog.agents.length > 0 ? (
				<div className="mb-3 flex flex-col justify-start">
					<ChangelogAgents agentIds={changelog?.agents} title={t('agents')} />
				</div>
			) : null}
			{changelog?.bangboo && changelog.bangboo.length > 0 ? (
				<div className="mb-3 flex flex-col justify-start">
					<ChangelogBangboos bangbooIds={changelog?.bangboo} title={t('bangboo')} />
				</div>
			) : null}
			{changelog?.driveDisc && changelog.driveDisc.length > 0 ? (
				<div className="mb-3 flex flex-col justify-start">
					<ChangelogDriveDiscs discIds={changelog?.driveDisc} title={t('driveDisc')} />
				</div>
			) : null}
			{changelog?.wEngine && changelog.wEngine.length > 0 ? (
				<div className="mb-3 flex flex-col justify-start">
					<ChangelogWEngines title={t('wEngine')} wEngineIds={changelog?.wEngine} />
				</div>
			) : null}
		</>
	);
}

export default ChangelogPage;
