import { getLocale } from 'next-intl/server';

import { getAgentDetails } from '@/services/hakushin/api/agent';
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
			type="hover"
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
						agentId={agentId}
						attackType={agentDetail?.attackType}
						codeName={agentDetail?.codeName}
						description={agentDetail?.desc}
						faction={agentDetail?.faction}
						img={agentDetail?.img}
						name={agentDetail?.name}
						rarity={agentDetail?.rarity}
						specialty={agentDetail?.specialty}
						stat={agentDetail?.stat}
					/>
				)
			) : null}
		</ScrollArea>
	);
}

export default AgentDetailContent;
