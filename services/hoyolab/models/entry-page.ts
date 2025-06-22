export interface EntryPage {
	data: {
		page: PageDetail;
	};
	message: string;
	retcode: number;
}

export interface PageDetail {
	alias_name: string;
	beta: boolean;
	correct_lock_status: string;
	desc: string;
	edit_lock_status: string;
	filter_values: any[];
	header_img_url: string;
	icon_url: string;
	id: string;
	lang: string;
	langs: string[];
	menu_id: string;
	menu_name: string;
	menu_style: string;
	menus: string[];
	modules: any[];
	name: string;
}
