import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';

import { getAgentDetails } from '@/services/hakushin/api/agent';
import { LANGUAGES } from '@/constants/lang';
import ModalRoute from '@/components/features/modal-route';
import { DialogTitle } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import AgentDetail from '@/components/pages/agent-detail';

async function AgentDetailModalPage({ params }: { params: Promise<{ agentId: string }> }) {
	const [locale, { agentId }, t] = await Promise.all([
		getLocale(),
		params,
		getTranslations('AgentsPage'),
	]);
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const agentDetail = await getAgentDetails({ langKey, id: agentId });
	return (
		<ModalRoute
			contentWidth="8xl"
			classNames={{
				header: 'flex flex-row items-center gap-2 py-2',
			}}
			dialogHeader={
				<>
					{agentDetail?.icon ? (
						<Image
							optimizeImg
							alt={`${agentDetail?.name} icon image` || `${t('agent')} icon image`}
							height={70}
							radius="sm"
							src={agentDetail?.icon}
							width={70}
							classNames={{
								wrapper: 'h-16 aspect-square',
								img: 'size-full object-cover',
							}}
						/>
					) : null}
					<DialogTitle>{agentDetail?.codeName || agentDetail?.name || t('agent')}</DialogTitle>
				</>
			}
		>
			<ScrollArea className="h-[calc(95dvh-4rem)] w-full sm:h-[calc(100dvh-13rem)]" type="hover">
				<AgentDetail
					agentId={agentId}
					codeName={agentDetail?.codeName}
					description={agentDetail?.desc}
					img={agentDetail?.img}
					name={agentDetail?.name}
				/>
			</ScrollArea>
		</ModalRoute>
	);
}

export default AgentDetailModalPage;
