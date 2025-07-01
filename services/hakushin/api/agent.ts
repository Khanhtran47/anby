'use server';

import { unstable_cache } from 'next/cache';

import { getEntryList } from '@/services/hoyolab/api/entry-list';
import { getEntryPage } from '@/services/hoyolab/api/entry-page';
import { parseJSON } from '@/utils/common/function';
import { fetchWithErrorHandling } from '@/utils/common/misc';
import { ATTACK_TYPES } from '@/constants/attack-types';
import { FACTIONS } from '@/constants/factions';
import { AGENTS_MAPPING } from '@/constants/mapping';
import { RARITIES } from '@/constants/rarities';
import { SPECIALTIES } from '@/constants/specialties';
import { STATS } from '@/constants/stats';

import { Hakushin } from '../utils';

import type { Module, ModuleComponent } from '@/services/hoyolab/models/entry-page';
import type {
	AdditionalInformation,
	Agent,
	AgentDetails,
	AgentTalent,
	Ascension,
	BaseInfo,
	CharacterBackground,
	CharacterVoice,
	FilterValue,
	Gallery,
	HakushinAgents,
	MindscapeCinema,
	VideoCollection,
} from '../models/agent';

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
			const listAgents = hoyolabAgentList?.data?.list
				?.map((agent) => {
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

			const finalAgents =
				ids.length > 0 ? listAgents.filter((agent) => ids.includes(agent.id)) : listAgents;

			return {
				items: finalAgents,
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

interface FilterValueInput {
	id?: string;
	icon?: string;
	value?: string;
	enum_string?: string;
}

function mergeFilterValues(
	filterValues: FilterValueInput[] | undefined,
	hakushinValues: FilterValue[],
): FilterValue[] {
	if (filterValues && filterValues.length > 0) {
		return filterValues?.map((fv) => {
			const hv = hakushinValues.find((h) => h.id?.toString() === fv.id?.toString());
			return {
				id: fv.id,
				icon: fv.icon || hv?.icon,
				value: fv.value || hv?.value,
				enumString: fv.enum_string || hv?.enumString,
			};
		});
	}
	return hakushinValues;
}

const createEnumString = (value?: string) =>
	value ? value?.replace(/\s+/g, '-').toLowerCase() : '';

function findModuleComponent(
	modules: Module[] | undefined,
	componentId: string,
): Module | undefined {
	return modules?.find((module) =>
		module.components.some(
			(comp: ModuleComponent) => comp.component_id === componentId && comp.data && comp.data !== '',
		),
	);
}

function getComponentData(module: Module | undefined, componentId: string): string | undefined {
	return module?.components.find((comp) => comp.component_id === componentId)?.data;
}

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
			let baseInfo: BaseInfo | undefined = undefined;
			let agentTalent: AgentTalent | undefined = undefined;
			let ascension: Ascension | undefined = undefined;
			let mindscapeCinema: MindscapeCinema | undefined = undefined;
			let gallery: Gallery | undefined = undefined;
			let videoCollection: VideoCollection | undefined = undefined;
			let characterBackground: CharacterBackground | undefined = undefined;
			let characterVoice: CharacterVoice | undefined = undefined;
			let additionalInformation: AdditionalInformation | undefined = undefined;

			if (menu_style === 'agent') {
				const hakushinFaction = Object.keys(hakushinAgentDetails.Camp)?.map((factionId) => {
					const searchFaction = FACTIONS.find((faction) => faction.id === Number(factionId));
					return {
						id: searchFaction?.hoyoId,
						icon: searchFaction?.icon,
						value: searchFaction?.faction,
						enumString: createEnumString(searchFaction?.faction),
					};
				});
				const hakushinAttackType = Object.keys(hakushinAgentDetails.HitType)?.map(
					(attackTypeId) => {
						const searchAttackType = ATTACK_TYPES.find(
							(attackType) => attackType.id === Number(attackTypeId),
						);
						return {
							id: searchAttackType?.hoyoId,
							icon: searchAttackType?.icon,
							value: searchAttackType?.attackType,
							enumString: createEnumString(searchAttackType?.attackType),
						};
					},
				);
				const searchRarity = RARITIES.find((rarity) => rarity.id === hakushinAgentDetails.Rarity);
				const hakushinRarity = {
					id: searchRarity?.hoyoId,
					icon: searchRarity?.icon,
					value: searchRarity?.rarity,
					enumString: createEnumString(searchRarity?.rarity),
				};
				const hakushinSpecialty = Object.keys(hakushinAgentDetails.WeaponType)?.map(
					(specialtyId) => {
						const searchSpecialty = SPECIALTIES.find(
							(specialty) => specialty.id === Number(specialtyId),
						);
						return {
							id: searchSpecialty?.hoyoId,
							icon: searchSpecialty?.icon,
							value: searchSpecialty?.name,
							enumString: createEnumString(searchSpecialty?.name),
						};
					},
				);
				const hakushinStat = Object.keys(hakushinAgentDetails.ElementType)?.map((statId) => {
					const searchStat = STATS.find((stat) => stat.id === Number(statId));
					return {
						id: searchStat?.hoyoId,
						icon: searchStat?.icon,
						value: searchStat?.name,
						enumString: createEnumString(searchStat?.name),
					};
				});

				faction = mergeFilterValues(filter_values?.agent_faction?.value_types, hakushinFaction);
				attackType = mergeFilterValues(
					filter_values?.agent_attack_type?.value_types,
					hakushinAttackType,
				);
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
				specialty = mergeFilterValues(
					filter_values?.agent_specialties?.value_types,
					hakushinSpecialty,
				);
				stat = mergeFilterValues(filter_values?.agent_stats?.value_types, hakushinStat);

				const baseInfoModule = findModuleComponent(modules, 'baseInfo');
				const baseInfoData = getComponentData(baseInfoModule, 'baseInfo');
				const baseInfoParsed = parseJSON<{
					list: {
						key: string;
						id: string;
						isMaterial?: boolean;
						value: string[];
					}[];
				}>(baseInfoData);
				baseInfo = {
					id: baseInfoModule?.id,
					name: baseInfoModule?.name,
					desc: baseInfoModule?.desc,
					originModuleId: baseInfoModule?.origin_module_id,
					data: baseInfoParsed?.list?.map((item) => {
						const value = item?.value?.map((val) => {
							if (val) {
								if (item.isMaterial) {
									const valParsed = JSON.parse(val.includes('$') ? val.slice(1, -1) : val)[0];
									return valParsed;
								} else {
									return val as string;
								}
							}
							return undefined;
						});
						return {
							...item,
							value: value ? value : undefined,
						};
					}),
				};

				const agentTalentModule = findModuleComponent(modules, 'agent_talent');
				const agentTalentData = getComponentData(agentTalentModule, 'agent_talent');
				const agentTalentParsed = parseJSON<{
					list: {
						attributes?: {
							key?: string;
							values?: string[];
						}[];
						children?: {
							desc?: string;
							icon_url?: string;
							img?: string;
							talent_imgs?: {
								description?: string;
								url?: string;
							}[];
							title?: string;
						}[];
						icon_url?: string;
						materials?: (string[] | null)[];
						title?: string;
					}[];
				}>(agentTalentData);
				agentTalent = {
					id: agentTalentModule?.id,
					name: agentTalentModule?.name,
					desc: agentTalentModule?.desc,
					originModuleId: agentTalentModule?.origin_module_id,
					data: agentTalentParsed?.list,
				};

				const ascensionModule = findModuleComponent(modules, 'ascension');
				const ascensionData = getComponentData(ascensionModule, 'ascension');
				const ascensionParsed = parseJSON<{
					list: {
						id: string;
						key: string;
						combatList: {
							key: string;
							values: string[];
						}[];
						materials: string[];
					}[];
				}>(ascensionData);
				ascension = {
					id: ascensionModule?.id,
					name: ascensionModule?.name,
					desc: ascensionModule?.desc,
					originModuleId: ascensionModule?.origin_module_id,
					data: ascensionParsed?.list
						? ascensionParsed.list.map((item) => ({
								...item,
								combatList: item?.combatList?.filter(
									(c) =>
										c?.key &&
										!(
											Array.isArray(c?.values) &&
											c.values.length === 2 &&
											c.values.every((v) => v === '-')
										),
								),
								materials: item?.materials?.map((material) => {
									const materialParsed = parseJSON<
										{
											amount?: number;
											ep_id?: number;
											img?: string;
											menuId?: string;
											nickname?: string;
											_menuId?: string;
										}[]
									>(material.includes('$') ? material.slice(1, -1) : material)?.[0];
									if (materialParsed) {
										return materialParsed;
									}
									return undefined;
								}),
							}))
						: undefined,
				};

				const mindscapeCinemaModule = findModuleComponent(modules, 'summaryList');
				const mindscapeCinemaData = getComponentData(mindscapeCinemaModule, 'summaryList');
				const mindscapeCinemaParsed = parseJSON<{
					list: {
						desc?: string;
						icon_url?: string;
						id?: string;
						name?: string;
					}[];
					img_list: {
						desc?: string;
						icon_url?: string;
						id?: string;
						name?: string;
					}[];
				}>(mindscapeCinemaData);
				mindscapeCinema = {
					id: mindscapeCinemaModule?.id,
					name: mindscapeCinemaModule?.name,
					desc: mindscapeCinemaModule?.desc,
					originModuleId: mindscapeCinemaModule?.origin_module_id,
					data: mindscapeCinemaParsed,
				};

				const galleryModule = findModuleComponent(modules, 'gallery_character');
				const galleryData = getComponentData(galleryModule, 'gallery_character');
				const galleryParsed = parseJSON<{
					list: {
						id?: string;
						img?: string;
						imgDesc?: string;
						key?: string;
					}[];
					pic?: string;
				}>(galleryData);
				gallery = {
					id: galleryModule?.id,
					name: galleryModule?.name,
					desc: galleryModule?.desc,
					originModuleId: galleryModule?.origin_module_id,
					data: galleryParsed,
				};

				const videoCollectionModule = findModuleComponent(modules, 'video_collection');
				const videoCollectionData = getComponentData(videoCollectionModule, 'video_collection');
				const videoCollectionParsed = parseJSON<{
					list: {
						name: string;
						videos: {
							duration?: number;
							img?: string;
							title?: string;
							url?: string;
						}[];
					}[];
				}>(videoCollectionData);
				videoCollection = {
					id: videoCollectionModule?.id,
					name: videoCollectionModule?.name,
					desc: videoCollectionModule?.desc,
					originModuleId: videoCollectionModule?.origin_module_id,
					data: {
						list: videoCollectionParsed?.list?.map((item) => ({
							name: item?.name,
							videos: item?.videos?.map((video) => ({
								videoId: video?.url?.split('/').pop()?.split('=').pop() || '',
								name: video?.title,
								duration: video?.duration?.toString(),
								thumbnail: video?.img,
								title: video?.title,
							})),
						})),
					},
				};

				const characterBackgroundModule = findModuleComponent(modules, 'story');
				const characterBackgroundData = getComponentData(characterBackgroundModule, 'story');
				const characterBackgroundParsed = parseJSON<{
					list: {
						desc?: string;
						title?: string;
					}[];
				}>(characterBackgroundData);
				characterBackground = {
					id: characterBackgroundModule?.id,
					name: characterBackgroundModule?.name,
					desc: characterBackgroundModule?.desc,
					originModuleId: characterBackgroundModule?.origin_module_id,
					data: characterBackgroundParsed,
				};

				const characterVoiceModule = findModuleComponent(modules, 'voice');
				const characterVoiceData = getComponentData(characterVoiceModule, 'voice');
				const characterVoiceParsed = parseJSON<{
					list: {
						artifactPos?: string;
						audios?: {
							id?: string;
							name?: string;
							url?: string;
						}[];
						desc?: string;
						id?: string;
						img?: string;
						title?: string;
					}[];
				}>(characterVoiceData);
				characterVoice = {
					id: characterVoiceModule?.id,
					name: characterVoiceModule?.name,
					desc: characterVoiceModule?.desc,
					originModuleId: characterVoiceModule?.origin_module_id,
					data: characterVoiceParsed,
				};

				const additionalInformationModule = findModuleComponent(modules, 'textual_research');
				const additionalInformationData = getComponentData(
					additionalInformationModule,
					'textual_research',
				);
				const additionalInformationParsed = parseJSON<{
					list?: {
						audios?: {
							id?: string;
							name?: string;
							url?: string;
						}[];
						desc?: string;
						title?: string;
					}[];
				}>(additionalInformationData);
				additionalInformation = {
					id: additionalInformationModule?.id,
					name: additionalInformationModule?.name,
					desc: additionalInformationModule?.desc,
					originModuleId: additionalInformationModule?.origin_module_id,
					data: additionalInformationParsed,
				};
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
							agentTalent,
							ascension,
							mindscapeCinema,
							gallery,
							videoCollection,
							characterBackground,
							characterVoice,
							additionalInformation,
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
