export interface EntryPage {
	data: {
		page: PageDetail;
	};
	message: string;
	retcode: number;
}

export type PageDetail = AgentPageDetail | WEnginePageDetail;

export interface PageDetailBase {
	alias_name: string;
	beta: boolean;
	desc: string;
	header_img_url: string;
	icon_url: string;
	id: string;
	lang: string;
	langs: string[];
	menus: string[];
	name: string;
	ext: Ext;
}

interface AgentPageDetail extends PageDetailBase {
	filter_values: {
		agent_attack_type: FilterValue;
		agent_faction: FilterValue;
		agent_rarity: FilterValue;
		agent_specialties: FilterValue;
		agent_stats: FilterValue;
	};
	menu_id: '8';
	menu_name: 'Agents';
	menu_style: 'agent';
	modules: Module[];
}

interface WEnginePageDetail extends PageDetailBase {
	filter_values: {
		filter_key_13: FilterValue;
		w_engine_rarity: FilterValue;
	};
	menu_id: '11';
	menu_name: 'W-Engines';
	menu_style: 'w_engine';
	modules: any[];
}

interface FilterValue {
	key: {
		id: string;
		key: string;
		text: string;
	};
	value_types: {
		enum_string: string;
		icon: string;
		id: string;
		value: string;
	}[];
	values: string[];
}

interface Module {
	id: string;
	desc?: string;
	name?: string;
	origin_module_id: string;
	components: {
		component_id: string;
		data?: string;
	}[];
}

interface Ext {
	personalized_color?: string;
	scrolling_text?: string;
}
