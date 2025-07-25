import { getLocale } from 'next-intl/server';

import { getAgentDetails } from '@/services/main/api/agent';
import { cn } from '@/utils/common/misc';
import { LANGUAGES } from '@/constants/lang';
import ErrorToast from '@/components/features/error-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import AgentDetail from '@/components/pages/agent-detail';

interface AgentDetailContentProps {
	agentId: string;
	isAgentIdExists: boolean;
}

async function AgentDetailContent(props: AgentDetailContentProps) {
	const { agentId, isAgentIdExists } = props;
	const locale = await getLocale();
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const agentDetail = isAgentIdExists ? await getAgentDetails({ langKey, id: agentId }) : null;
	return (
		<ScrollArea
			type="always"
			className={cn(
				'w-full',
				isAgentIdExists ? 'h-[calc(95dvh-4rem)] sm:h-[calc(100dvh-12rem)]' : '',
			)}
		>
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
		</ScrollArea>
	);
}

export default AgentDetailContent;
