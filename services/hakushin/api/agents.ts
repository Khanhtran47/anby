import { fetcher, lruCache } from '@/utils/server/cache';

import { Hakushin } from '../utils';

import type { AgentDetails, ListAgents } from '../models/agents';

export const getListAgents = async () => {
	const result = await fetcher<Record<string, ListAgents>>({
		url: Hakushin.listAgents(),
		key: 'hakushin-agents-list',
		ttl: 1000 * 60 * 60 * 24 * 7,
		staleWhileRevalidate: 1000 * 60 * 60 * 24 * 30,
		cache: lruCache,
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return Object.entries(result).map(([id, agent]) => ({
		id: Number(id),
		faction: agent.camp,
		rarity: agent.rank,
		specialty: agent.type,
		stat: agent.element,
		names: [
			{
				id: 'CHS',
				name: agent.CHS,
			},
			{
				id: 'EN',
				name: agent.EN,
			},
			{
				id: 'JA',
				name: agent.JA,
			},
			{
				id: 'KO',
				name: agent.KO,
			},
		],
		code: agent.code,
		desc: agent.desc,
		img: agent.icon
			? `https://api.hakush.in/zzz/UI/IconRoleCrop${agent.icon.replace(/^IconRole/, '')}.webp`
			: undefined,
		skin: agent.skin,
		spStat: agent.spelement
			? `https://api.hakush.in/zzz/UI/${agent.spelement.replace(/^.*\/([^/]+)\.png$/, '$1')}.webp`
			: undefined,
	}));
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
