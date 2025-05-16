import { fetcher, lruCache } from '@/utils/server/cache';

import { Hakushin } from '../utils';

import type { AgentDetails, ListAgents } from '../models/agents';

export const getListAgents = async () => {
	const result = await fetcher<ListAgents[]>({
		url: Hakushin.listAgents(),
		key: 'hakushin-agents-list',
		ttl: 1000 * 60 * 60 * 24 * 7,
		staleWhileRevalidate: 1000 * 60 * 60 * 24 * 30,
		cache: lruCache,
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return result;
};

export const getAgentDetails = async (id: string) => {
	const result = await fetcher<AgentDetails>({
		url: Hakushin.agentDetails(id),
		key: `hakushin-agents-${id}`,
		ttl: 1000 * 60 * 60 * 24 * 7,
		staleWhileRevalidate: 1000 * 60 * 60 * 24 * 30,
		cache: lruCache,
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return result;
};
