import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { getChangelog } from '@/services/hakushin/api/changelog';
import ErrorToast from '@/components/features/error-toast';
import { ListAgentsSkeleton } from '@/components/pages/list-agents';
import { ListBangboosSkeleton } from '@/components/pages/list-bangboo';
import { ListDriveDiscSkeleton } from '@/components/pages/list-drive-disc-skeleton';
import { ListWEnginesSkeleton } from '@/components/pages/list-w-engine';

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
	if ('error' in changelog)
		return (
			<ErrorToast title={changelog.error || 'An error occurred while fetching the changelog.'} />
		);
	return (
		<>
			{changelog?.agents && changelog.agents.length > 0 ? (
				<div className="mt-14 mb-3 flex flex-col justify-start">
					<Suspense fallback={<ListAgentsSkeleton number={changelog.agents.length} />}>
						<ChangelogAgents agentIds={changelog?.agents} title={t('agents')} />
					</Suspense>
				</div>
			) : null}
			{changelog?.bangboo && changelog.bangboo.length > 0 ? (
				<div className="mb-3 flex flex-col justify-start">
					<Suspense fallback={<ListBangboosSkeleton number={changelog.bangboo.length} />}>
						<ChangelogBangboos bangbooIds={changelog?.bangboo} title={t('bangboo')} />
					</Suspense>
				</div>
			) : null}
			{changelog?.driveDisc && changelog.driveDisc.length > 0 ? (
				<div className="mb-3 flex flex-col justify-start">
					<Suspense fallback={<ListDriveDiscSkeleton number={changelog.driveDisc.length} />}>
						<ChangelogDriveDiscs discIds={changelog?.driveDisc} title={t('driveDisc')} />
					</Suspense>
				</div>
			) : null}
			{changelog?.wEngine && changelog.wEngine.length > 0 ? (
				<div className="mb-3 flex flex-col justify-start">
					<Suspense fallback={<ListWEnginesSkeleton number={changelog.wEngine.length} />}>
						<ChangelogWEngines title={t('wEngine')} wEngineIds={changelog?.wEngine} />
					</Suspense>
				</div>
			) : null}
		</>
	);
}

export default ChangelogPage;
