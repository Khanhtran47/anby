'use server';

import { unstable_cache } from 'next/cache';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hakushin } from '../utils';

import type { AgentDetails, HakushinAgents } from '../models/agent';

export const getHakushinListAgents = async ({
	ids = [],
	langKey = 'en-us',
}:
	| {
			ids?: number[];
			langKey?: string;
	  }
	| undefined = {}) => {
	const cacheKey = `hakushin-list-agents-${ids.join('-')}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<Record<string, HakushinAgents>>(
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
				return { error: result.error as string };
			}

			const formatResult = Object.entries(result).map(([id, agent]) => {
				let name: string = '';

				switch (langKey) {
					case 'zh-cn':
						name = agent.CHS || agent.EN;
						break;
					case 'ja-jp':
						name = agent.JA || agent.EN;
						break;
					case 'ko-kr':
						name = agent.KO || agent.EN;
						break;
					default:
						name = agent.EN;
						break;
				}

				return {
					id: Number(id),
					faction: agent.camp,
					rarity: agent.rank,
					specialty: agent.type,
					stat: agent.element,
					code: agent.code,
					desc: agent.desc,
					img: agent.icon
						? `https://api.hakush.in/zzz/UI/IconRoleCrop${agent.icon.replace(/^IconRole/, '')}.webp`
						: '',
					skin: agent.skin,
					spStat: {
						name: agent.spelement?.replace(/^.*\/([^/]+)\.png$/, '$1'),
						icon: agent.spelement
							? `https://api.hakush.in/zzz/UI/${agent.spelement.replace(/^.*\/([^/]+)\.png$/, '$1')}.webp`
							: undefined,
					},
					name,
				};
			});

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

export const getHakushinAgentDetails = async ({ id }: { id: string }) => {
	const cacheKey = `hakushin-agent-details-${id}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<AgentDetails>(Hakushin.agentDetails(id), {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (result && 'error' in result) {
				return { error: result.error };
			}
			return result;
		},
		[cacheKey],
		{
			tags: [cacheKey, 'hakushin-agent-details'],
			revalidate: 60 * 60 * 24 * 7, // 7 days
		},
	)();
};
