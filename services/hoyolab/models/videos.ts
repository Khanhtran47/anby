export interface ListVideos {
	data: {
		video: {
			categorizations: {
				collections: Collection[];
			};
		};
	};
	message: string;
	retcode: number;
}

export interface Collection {
	is_shield: boolean;
	name: string;
	updated_at: string;
	videos: Video[];
}

export interface Video {
	duration: string;
	ep_abstract: {
		entry_page_id: string;
		name: string;
		icon_url: string;
	};
	img: string;
	title: string;
	url: string;
}
