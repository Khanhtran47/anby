import { getListAgents } from '@/services/main/api/agent';
import ErrorToast from '@/components/features/error-toast';
import { ListAgents } from '@/components/pages/list-agents';

async function ChangelogAgents(props: { agentIds: number[]; title?: string }) {
	const { agentIds, title } = props;
	const agents = await getListAgents({ ids: agentIds });
	if ('error' in agents) return <ErrorToast title={agents.error} />;
	return <ListAgents agents={agents} title={title} />;
}

export default ChangelogAgents;
