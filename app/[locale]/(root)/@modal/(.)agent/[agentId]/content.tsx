import { getLocale } from 'next-intl/server';

import { getAgentDetails } from '@/services/hakushin/api/agent';
import { cn } from '@/utils/common/misc';
import { LANGUAGES } from '@/constants/lang';
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
				isAgentIdExists ? 'h-[calc(95dvh-4rem)] sm:h-[calc(100dvh-13rem)]' : '',
			)}
		>
			<AgentDetail
				agentId={agentId}
				codeName={agentDetail?.codeName}
				description={agentDetail?.desc}
				img={agentDetail?.img}
				name={agentDetail?.name}
			/>
		</ScrollArea>
	);
}

export default AgentDetailContent;
