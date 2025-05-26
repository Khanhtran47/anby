import { cache } from 'react';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hakushin } from '../utils';

import type { AgentDetails, ListAgents } from '../models/agent';

export const getListAgents = async () => {
	const result = await fetchWithErrorHandling<Record<string, ListAgents>>(Hakushin.listAgents(), {
		next: {
			revalidate: 60 * 60 * 24 * 7, // 7 day
		},
		headers: {
			'Content-Type': 'application/json',
		},
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
			{ id: 'CHS', name: agent.CHS },
			{ id: 'EN', name: agent.EN },
			{ id: 'JA', name: agent.JA },
			{ id: 'KO', name: agent.KO },
		],
		code: agent.code,
		desc: agent.desc,
		img: agent.icon
			? `https://api.hakush.in/zzz/UI/IconRoleCrop${agent.icon.replace(/^IconRole/, '')}.webp`
			: undefined,
		skin: agent.skin,
		spStat: {
			name: agent.spelement?.replace(/^.*\/([^/]+)\.png$/, '$1'),
			icon: agent.spelement
				? `https://api.hakush.in/zzz/UI/${agent.spelement.replace(/^.*\/([^/]+)\.png$/, '$1')}.webp`
				: undefined,
		},
	}));
};

export const getAgentDetails = cache(async (id: string) => {
	const result = await fetchWithErrorHandling<AgentDetails>(Hakushin.agentDetails(id), {
		cache: 'force-cache',
		next: {
			revalidate: 60 * 60 * 24 * 30, // 30 days
		},
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return result;
});
