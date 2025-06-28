'use server';

import { unstable_cache } from 'next/cache';

import { getEntryList } from '@/services/hoyolab/api/entry-list';
import { getEntryPage } from '@/services/hoyolab/api/entry-page';
import { fetchWithErrorHandling } from '@/utils/common/misc';
import { ATTACK_TYPES } from '@/constants/attack-types';
import { FACTIONS } from '@/constants/factions';
import { AGENTS_MAPPING } from '@/constants/mapping';
import { RARITIES } from '@/constants/rarities';
import { SPECIALTIES } from '@/constants/specialties';
import { STATS } from '@/constants/stats';

import { Hakushin } from '../utils';

import type { Agent, AgentDetails, HakushinAgents } from '../models/agent';

export type FilterValue = {
	id?: string;
	icon?: string;
	value?: string;
	enumString?: string;
};

type BaseInfo = {
	list: {
		key: string;
		id: string;
		isMaterial?: boolean;
		value: string[];
	}[];
};

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
}): Promise<
	| {
			items: Agent[];
			page: number;
			pageSize: number;
			totalPages: number;
			totalItems: number;
	  }
	| {
			error: string;
	  }
> => {
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
				listAgents.filter((agent) => ids.includes(agent.id));
			}
			return {
				items: listAgents,
				page,
				pageSize,
				totalPages: Math.ceil(Number(hoyolabAgentList.data.total) / pageSize),
				totalItems: Number(hoyolabAgentList.data.total),
			};
		},
		[cacheKey],
		{
			tags: [cacheKey, 'list-agents'],
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

export const getAgentDetails = async ({
	langKey = 'en-us',
	id,
}: {
	langKey?: string;
	id: string;
}) => {
	const cacheKey = `agent-details-${langKey}-${id}`;
	const hoyolabAgentId = AGENTS_MAPPING.find((item) => item.id === Number(id))?.hoyoId;

	const [hakushinAgentDetails, hoyolabAgentPage] = await Promise.all([
		getHakushinAgentDetails({ id }),
		hoyolabAgentId ? getEntryPage({ langKey, id: hoyolabAgentId }) : null,
	]);

	if (hakushinAgentDetails && 'error' in hakushinAgentDetails) {
		return { error: hakushinAgentDetails.error };
	}
	if (hoyolabAgentPage && 'error' in hoyolabAgentPage) {
		return { error: hoyolabAgentPage.error };
	}

	const {
		beta,
		name,
		desc,
		header_img_url,
		filter_values,
		menu_id,
		menu_name,
		menu_style,
		icon_url,
		modules,
		ext,
	} = hoyolabAgentPage?.data.page || {};

	return unstable_cache(
		async () => {
			let faction: FilterValue[] | undefined = undefined;
			let attackType: FilterValue[] | undefined = undefined;
			let rarity: FilterValue | undefined = undefined;
			let specialty: FilterValue[] | undefined = undefined;
			let stat: FilterValue[] | undefined = undefined;
			let baseInfo = undefined;

			if (menu_style === 'agent') {
				const hakushinFaction = Object.keys(hakushinAgentDetails.Camp).map((factionId) => {
					const searchFaction = FACTIONS.find((faction) => faction.id === Number(factionId));
					return {
						id: searchFaction?.hoyoId,
						icon: searchFaction?.icon,
						value: searchFaction?.faction,
						enumString: searchFaction?.faction.replace(/\s+/g, '-').toLowerCase(),
					};
				});
				const hakushinAttackType = Object.keys(hakushinAgentDetails.HitType).map((attackTypeId) => {
					const searchAttackType = ATTACK_TYPES.find(
						(attackType) => attackType.id === Number(attackTypeId),
					);
					return {
						id: searchAttackType?.hoyoId,
						icon: searchAttackType?.icon,
						value: searchAttackType?.attackType,
						enumString: searchAttackType?.attackType.replace(/\s+/g, '-').toLowerCase(),
					};
				});
				const searchRarity = RARITIES.find((rarity) => rarity.id === hakushinAgentDetails.Rarity);
				const hakushinRarity = {
					id: searchRarity?.hoyoId,
					icon: searchRarity?.icon,
					value: searchRarity?.rarity,
					enumString: searchRarity?.rarity.replace(/\s+/g, '-').toLowerCase(),
				};
				const hakushinSpecialty = Object.keys(hakushinAgentDetails.WeaponType).map(
					(specialtyId) => {
						const searchSpecialty = SPECIALTIES.find(
							(specialty) => specialty.id === Number(specialtyId),
						);
						return {
							id: searchSpecialty?.hoyoId,
							icon: searchSpecialty?.icon,
							value: searchSpecialty?.name,
							enumString: searchSpecialty?.name.replace(/\s+/g, '-').toLowerCase(),
						};
					},
				);
				const hakushinStat = Object.keys(hakushinAgentDetails.ElementType).map((statId) => {
					const searchStat = STATS.find((stat) => stat.id === Number(statId));
					return {
						id: searchStat?.hoyoId,
						icon: searchStat?.icon,
						value: searchStat?.name,
						enumString: searchStat?.name.replace(/\s+/g, '-').toLowerCase(),
					};
				});

				faction =
					filter_values?.agent_faction?.value_types &&
					filter_values?.agent_faction?.value_types.length > 0
						? filter_values?.agent_faction?.value_types.map((faction) => {
								const searchFaction = hakushinFaction.find((f) => f.id === faction.id);
								return {
									id: faction.id,
									icon: faction.icon || searchFaction?.icon,
									value: faction.value || searchFaction?.value,
									enumString: faction.enum_string || searchFaction?.enumString,
								};
							})
						: hakushinFaction;
				attackType =
					filter_values?.agent_attack_type?.value_types &&
					filter_values?.agent_attack_type?.value_types.length > 0
						? filter_values?.agent_attack_type?.value_types.map((attackType) => {
								const searchAttackType = hakushinAttackType.find(
									(atk) => atk.id?.toString() === attackType.id,
								);
								return {
									id: attackType.id,
									icon: attackType.icon || searchAttackType?.icon,
									value: attackType.value || searchAttackType?.value,
									enumString: attackType.enum_string || searchAttackType?.enumString,
								};
							})
						: hakushinAttackType;
				rarity =
					filter_values?.agent_rarity?.value_types && filter_values?.agent_rarity?.value_types[0]
						? {
								id: filter_values?.agent_rarity?.value_types[0].id,
								icon: filter_values?.agent_rarity?.value_types[0].icon || hakushinRarity?.icon,
								value: filter_values?.agent_rarity?.value_types[0].value || hakushinRarity?.value,
								enumString:
									filter_values?.agent_rarity?.value_types[0].enum_string ||
									hakushinRarity?.enumString,
							}
						: hakushinRarity;
				specialty =
					filter_values?.agent_specialties?.value_types &&
					filter_values?.agent_specialties?.value_types.length > 0
						? filter_values.agent_specialties.value_types.map((specialty) => {
								const searchSpecialty = hakushinSpecialty.find((sp) => sp.id === specialty.id);
								return {
									id: specialty.id,
									icon: specialty.icon || searchSpecialty?.icon,
									value: specialty.value || searchSpecialty?.value,
									enumString: specialty.enum_string || searchSpecialty?.enumString,
								};
							})
						: hakushinSpecialty;
				stat =
					filter_values?.agent_stats?.value_types &&
					filter_values?.agent_stats?.value_types.length > 0
						? filter_values.agent_stats.value_types.map((stat) => {
								const searchStat = hakushinStat.find((s) => s.id === stat.id);
								return {
									id: stat.id,
									icon: stat.icon || searchStat?.icon,
									value: stat.value || searchStat?.value,
									enumString: stat.enum_string || searchStat?.enumString,
								};
							})
						: hakushinStat;

				const baseInfoData = modules
					?.find((module) => {
						const baseInfoComponent = module.components.find(
							(component) => component.component_id === 'baseInfo',
						);
						return baseInfoComponent && baseInfoComponent.data && baseInfoComponent.data !== '';
					})
					?.components.find((component) => component.component_id === 'baseInfo')?.data;
				const baseInfoParsed = baseInfoData ? (JSON.parse(baseInfoData) as BaseInfo) : undefined;
				baseInfo = baseInfoParsed?.list.map((item) => {
					const value = item.value.map((val) => {
						return item.isMaterial && val
							? (JSON.parse(val.includes('$') ? val.slice(1, -1) : val)[0] as {
									amount: number;
									ep_id: number;
									icon: string;
									menuId: string;
									name: string;
									_menuId: string;
								})
							: (val as string);
					});
					return {
						...item,
						value: value ? value : undefined,
					};
				});
			}

			return {
				id,
				name: name || hakushinAgentDetails.Name,
				desc,
				beta,
				img:
					header_img_url ||
					(hakushinAgentDetails.Icon
						? `https://api.hakush.in/zzz/UI/${hakushinAgentDetails.Icon}.webp`
						: undefined),
				menuId: menu_id || '8',
				menuName: menu_name || 'Agents',
				menuStyle: menu_style || 'agent',
				icon: icon_url,
				codeName: hakushinAgentDetails.CodeName.includes('_')
					? undefined
					: hakushinAgentDetails.CodeName,
				...(menu_style === 'agent'
					? {
							faction,
							attackType,
							rarity,
							specialty,
							stat,
							baseInfo,
						}
					: {}),
				customization: {
					color: ext?.personalized_color,
					scrollingText: ext?.scrolling_text,
				},
			};
		},
		[cacheKey],
		{
			tags: [cacheKey, 'agent-details'],
			revalidate: 60 * 60 * 24 * (beta ? 7 : 30), // 7 days for beta, 30 days for stable
		},
	)();
};
