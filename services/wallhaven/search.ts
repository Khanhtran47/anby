'use server';

import { fetchWithErrorHandling } from '@/utils/common/misc';

export interface SearchWallHaven {
	data: Datum[];
	meta: Meta;
}

export interface Datum {
	category: Category;
	colors: string[];
	created_at: Date;
	dimension_x: number;
	dimension_y: number;
	favorites: number;
	file_size: number;
	file_type: FileType;
	id: string;
	path: string;
	purity: Purity;
	ratio: string;
	resolution: string;
	short_url: string;
	source: string;
	thumbs: Thumbs;
	url: string;
	views: number;
}

export enum Category {
	Anime = 'anime',
}

export enum FileType {
	ImageJPEG = 'image/jpeg',
	ImagePNG = 'image/png',
}

export enum Purity {
	Sfw = 'sfw',
}

export interface Thumbs {
	large: string;
	original: string;
	small: string;
}

export interface Meta {
	current_page: number;
	last_page: number;
	per_page: number;
	query: Query;
	seed: string;
	total: number;
}

export interface Query {
	id: number;
	tag: string;
}

export const getSearchZZZWallhaven = async () => {
	const result = await fetchWithErrorHandling<SearchWallHaven>(
		`${process.env.WALLHAVEN_API_URL}search?q=id%3A132438&categories=110&purity=100&atleast=1280x720&ratios=16x9&sorting=random&order=desc&ai_art_filter=1&seed=J93xam`,
		{
			next: {
				revalidate: 60 * 60 * 24, // 1 day
			},
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
	if (result && 'error' in result) {
		return { error: result.error };
	}

	const limitedData = result.data.slice(0, 6);
	return limitedData.map((item) => ({
		id: item.id,
		href: item.url,
		img: item.thumbs.large || item.path,
		imgAlt: `Zenless Zone Zero ${item.resolution}`,
	}));
};
