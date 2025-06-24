import { getLocale, getTranslations } from 'next-intl/server';

import { getAgentDetails } from '@/services/hakushin/api/agent';
import { LANGUAGES } from '@/constants/lang';
import ErrorToast from '@/components/features/error-toast';
import { DialogTitle } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';

interface AgentDetailContentProps {
	agentId: string;
	isAgentIdExists: boolean;
}

async function AgentDetailHeader(props: AgentDetailContentProps) {
	const { agentId, isAgentIdExists } = props;
	const [locale, t] = await Promise.all([getLocale(), getTranslations('AgentsPage')]);
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';
	const agentDetail = isAgentIdExists ? await getAgentDetails({ langKey, id: agentId }) : null;
	if (agentDetail && !('error' in agentDetail))
		return (
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
		);
	return (
		<>
			<ErrorToast title={agentDetail?.error || 'Error fetching agent details'} />
			<DialogTitle>{t('agent')}</DialogTitle>
		</>
	);
}

export default AgentDetailHeader;
