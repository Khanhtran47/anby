import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { getAgentDetails } from '@/services/main/api/agent';
import { LANGUAGES } from '@/constants/lang';
import { AGENTS_MAPPING } from '@/constants/mapping';
import ErrorToast from '@/components/features/error-toast';
import AgentDetail from '@/components/pages/agent-detail';

type Props = {
	params: Promise<{ agentId: string }>;
};

export async function generateMetadata({ params }: Props) {
	const [locale, { agentId }, t, tb] = await Promise.all([
		getLocale(),
		params,
		getTranslations('AgentsPage'),
		getTranslations('Brand'),
	]);
	const isAgentIdExists = AGENTS_MAPPING.some((agent) => agent.id === Number(agentId));
	if (!isAgentIdExists) {
		return {
			title: `${t('agentNotFound')}`,
			description: t('agentNotFoundDescription'),
		};
	}
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const agentDetail = await getAgentDetails({ langKey, id: agentId });
	if ('error' in agentDetail) {
		return {
			title: `${t('agentError')}`,
			description: t('agentErrorDescription'),
		};
	}
	return {
		title: `${agentDetail?.name} | ${tb('name')}`,
		description: agentDetail?.desc?.replace(/<[^>]*>/g, ''),
	};
}

async function AgentDetailPage({ params }: Props) {
	const [locale, { agentId }] = await Promise.all([getLocale(), params]);
	const isAgentIdExists = AGENTS_MAPPING.some((agent) => agent.id === Number(agentId));
	if (!isAgentIdExists) {
		notFound();
	}
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const agentDetail = await getAgentDetails({ langKey, id: agentId });
	return (
		<>
			{agentDetail ? (
				'error' in agentDetail ? (
					<ErrorToast title={agentDetail.error || 'Error fetching agent details'} />
				) : (
					<AgentDetail
						additionalInformation={agentDetail?.additionalInformation}
						agentId={agentId}
						agentTalent={agentDetail?.agentTalent}
						ascension={agentDetail?.ascension}
						attackType={agentDetail?.attackType}
						baseInfo={agentDetail?.baseInfo}
						characterBackground={agentDetail?.characterBackground}
						characterVoice={agentDetail?.characterVoice}
						className="mt-14 px-1 pt-4 pb-8 xl:px-6"
						codeName={agentDetail?.codeName}
						color={agentDetail?.customization?.color}
						description={agentDetail?.desc}
						faction={agentDetail?.faction}
						gallery={agentDetail?.gallery}
						img={agentDetail?.img}
						mindscapeCinema={agentDetail?.mindscapeCinema}
						name={agentDetail?.name}
						rarity={agentDetail?.rarity}
						specialty={agentDetail?.specialty}
						stat={agentDetail?.stat}
						videoCollection={agentDetail?.videoCollection}
					/>
				)
			) : null}
		</>
	);
}

export default AgentDetailPage;
