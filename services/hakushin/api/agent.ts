import { unstable_cache } from 'next/cache';

import { getEntryList } from '@/services/hoyolab/api/entry-list';
import { fetchWithErrorHandling } from '@/utils/common/misc';
import { AGENTS_MAPPING } from '@/constants/mapping';

import { Hakushin } from '../utils';

import type { AgentDetails, ListAgents } from '../models/agent';

export const getHakushinListAgents = async ({
	ids = [],
}:
	| {
			ids?: number[];
	  }
	| undefined = {}) => {
	const cacheKey = `hakushin-list-agents-${ids.join('-')}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<Record<string, ListAgents>>(
				Hakushin.listAgents(),
				{
					next: {
						revalidate: 60 * 60 * 24 * 7, // 7 day
					},
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			if (result && 'error' in result) {
				return { error: result.error };
			}

			const formatResult = Object.entries(result).map(([id, agent]) => ({
				id: Number(id),
				faction: agent.camp,
				rarity: agent.rank,
				specialty: agent.type,
				stat: agent.element,
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

			if (ids.length > 0) {
				return formatResult.filter((agent) => ids.includes(agent.id));
			}
			return formatResult;
		},
		[cacheKey],
		{
			tags: [cacheKey, 'hakushin-list-agents'],
			revalidate: 60 * 60 * 24 * 7, // 7 days
		},
	)();
};

export const getListAgents = async ({
	langKey = 'en-us',
	filters = [],
	ids = [],
	page = 1,
	pageSize = 30,
}: {
	/**
	 * The language key for the request.
	 * Defaults to 'en-us' if not provided.
	 * @example 'en-us'
	 */
	langKey?: string;
	/**
	 * An array of filters to apply to the entry list.
	 * This can include various filter criteria such as item type, rarity, etc.
	 * @example ['3', '4']
	 */
	filters?: string[];
	/**
	 * An array of agent IDs to filter the results.
	 * If provided, only agents with these IDs will be returned.
	 * @example [1011, 1021]
	 */
	ids?: number[];
	page?: number;
	pageSize?: number;
}) => {
	const cacheKey = `list-agents-${langKey}-${filters.join('-')}-${ids.join('-')}-${page}-${pageSize}`;
	return unstable_cache(
		async () => {
			const [hakushinAgentList, hoyolabAgentList] = await Promise.all([
				getHakushinListAgents({ ids }),
				getEntryList({
					langKey,
					filters,
					menuId: '8',
					page,
					pageSize,
				}),
			]);
			if (hakushinAgentList && 'error' in hakushinAgentList) {
				return { error: hakushinAgentList.error };
			}
			if (hoyolabAgentList && 'error' in hoyolabAgentList) {
				return { error: hoyolabAgentList.error };
			}
			const listAgents = hoyolabAgentList.data.list
				.map((agent) => {
					const id = AGENTS_MAPPING.find((item) => item.hoyoId === agent.entry_page_id)?.id;
					const hakushinAgent = hakushinAgentList.find((item) => item.id === id);
					if (!id || !hakushinAgent) {
						return null; // Skip if no matching ID or agent found
					}
					return {
						...hakushinAgent,
						name: agent.name,
						img: hakushinAgent.img || agent.icon_url,
					};
				})
				.filter((agent) => agent !== null);
			if (ids.length > 0) {
				return listAgents.filter((agent) => ids.includes(agent.id));
			}
			return listAgents;
		},
		[cacheKey],
		{
			tags: [cacheKey, 'list-agents'],
			revalidate: 60 * 60 * 24 * 7, // 7 days
		},
	)();
};

export const getAgentDetails = async (id: string) => {
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
};
