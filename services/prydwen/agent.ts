'use server';

import { unstable_cache } from 'next/cache';

import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Prydwen } from './utils';

interface PrydwenAgentDetails {
	componentChunkName: string;
	path: string;
	result: {
		data: {
			currentUnit: {
				nodes: Array<{
					id: string;
					updatedAt: string;
					createdAt: string;
					unitId: string;
					name: string;
					skillKey: string;
					fullName: string;
					slug: string;
					rarity: string;
					smallImage: {
						localFile: {
							childImageSharp: {
								gatsbyImageData: {
									layout: string;
									backgroundColor: string;
									images: {
										fallback: {
											src: string;
											srcSet: string;
											sizes: string;
										};
										sources: Array<{
											srcSet: string;
											type: string;
											sizes: string;
										}>;
									};
									width: number;
									height: number;
								};
							};
						};
					};
					cardImage: {
						localFile: {
							childImageSharp: {
								gatsbyImageData: {
									layout: string;
									backgroundColor: string;
									images: {
										fallback: {
											src: string;
											srcSet: string;
											sizes: string;
										};
										sources: Array<{
											srcSet: string;
											type: string;
											sizes: string;
										}>;
									};
									width: number;
									height: number;
								};
							};
						};
					};
					faction: string;
					attackType: string[];
					style: string;
					element: string;
					review: {
						raw: string;
					};
					pros: {
						raw: string;
					};
					cons: {
						raw: string;
					};
					videos: Array<{
						video: string;
					}>;
					endgameStats: {
						raw: string;
					};
					build: {
						main_4: Array<{
							stat: string;
							sign: string | null;
						}>;
						main_5: Array<{
							stat: string;
							sign: string | null;
						}>;
						main_6: Array<{
							stat: string;
							sign: string | null;
						}>;
						sets: any;
						engines: Array<{
							super: string;
							weapon: string;
							percent: string;
							percent_standard: string | null;
							notes: string | null;
						}>;
						substats: string;
					};
					talents: Array<{
						name: string;
						desc: string;
					}>;
					introduction: {
						raw: string;
					};
					voiceActors: {
						en: string;
						kr: string;
						jpn: string;
						cn: string;
					};
					releaseDate: string | null;
					upcoming: any;
				}>;
			};
		};
		pageContext: {
			contentfulId: string;
		};
	};
	staticQueryHashes: string[];
}

export const getPrydwenAgentDetails = async ({ id }: { id: string }) => {
	const cacheKey = `prydwen-agent-details-${id}`;

	return unstable_cache(
		async () => {
			const result = await fetchWithErrorHandling<PrydwenAgentDetails>(Prydwen.agentDetails(id));
			if (result && 'error' in result) {
				return { error: result.error };
			}
			return result?.result?.data?.currentUnit?.nodes?.[0];
		},
		[cacheKey],
		{},
	)();
};
