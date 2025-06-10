import { getListAgents } from '@/services/hakushin/api/agent';
import { ListAgents } from '@/components/pages/list-agents';

async function ChangelogAgents(props: { agentIds: number[]; title?: string }) {
	const { agentIds, title } = props;
	const agents = await getListAgents({ ids: agentIds });
	if ('error' in agents) return null;
	return <ListAgents agents={agents.items} title={title} />;
}

export default ChangelogAgents;
