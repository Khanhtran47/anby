export interface EntryList {
	data: {
		list: List[];
		total: string;
	};
	message: string;
	retcode: number;
}

export interface List {
	desc: string;
	display_field: {
		attr_level_0: string;
		attr_level_10: string;
		attr_level_20: string;
		attr_level_30: string;
		attr_level_40: string;
		attr_level_50: string;
		attr_level_60: string;
		equipment_skill?: string;
		materials: string;
	};
	entry_page_id: string;
	icon_url: string;
	name: string;
	filter_values: any;
}
