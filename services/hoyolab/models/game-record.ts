export interface GameRecord {
	retcode: number;
	message: string;
	data: GameRecordData;
}

export interface GameRecordData {
	stats: GameStats;
	avatar_list: GameAvatar[];
	cur_head_icon_url: string;
	buddy_list: GameBuddy[];
	cat_notes_list: GameCatNote[];
	award_state: string;
	game_data_show: GameDataShow;
	area_collections: GameAreaCollection[];
}

export interface GameStats {
	active_days: number;
	avatar_num: number;
	world_level_name: string;
	cur_period_zone_layer_count: number;
	buddy_num: number;
	commemorative_coins_list: GameCommemorativeCoin[];
	achievement_count: number;
	climbing_tower_layer: number;
	next_hundred_layer: string;
	memory_battlefield: null | string;
	stable_zone_layer_count: number;
	all_change_zone_layer_count: number;
	climbing_tower_s2: {
		climbing_tower_layer: number;
		floor_mvp_num: number;
	};
	temple_data: {
		level: number;
		sell_days: number;
		total_sell_temple_coin: string;
	};
}

export interface GameCommemorativeCoin {
	num: number;
	name: string;
	sort: number;
	url: string;
	wiki_url: string;
}

export interface GameAvatar {
	id: number;
	level: number;
	name_mi18n: string;
	full_name_mi18n: string;
	element_type: number;
	camp_name_mi18n: string;
	avatar_profession: number;
	rarity: string;
	group_icon_path: string;
	hollow_icon_path: string;
	rank: number;
	is_chosen: boolean;
	role_square_url: string;
	sub_element_type: number;
	awaken_state: string;
}

export interface GameBuddy {
	id: number;
	name: string;
	rarity: string;
	level: number;
	star: number;
	bangboo_rectangle_url: string;
}

export interface GameCatNote {
	name: string;
	icon: string;
	num: number;
	total: number;
	is_lock: boolean;
	id: number;
	medal_list: GameCatNoteMedal[];
	wiki_url: string;
	urban_area_id: number;
}

export interface GameCatNoteMedal {
	quest_id: number;
	name: string;
	desc: string;
	icon: string;
	is_finish: boolean;
}

export interface GameDataShow {
	personal_title: string;
	title_main_color: string;
	title_bottom_color: string;
	title_bg_url: string;
	medal_list: string[];
	card_url: string;
	medal_item_list: GameMedalItem[];
	all_medal_list: GameMedalItem[];
}

export interface GameMedalItem {
	medal_icon: string;
	number: number;
	medal_type: string;
	name: string;
	is_show: boolean;
	medal_id: number;
}

export interface GameAreaCollection {
	urban_area_id: number;
	urban_area_group_id: number;
	is_lock: boolean;
	name: string;
	icon: string;
	collection_progress: number;
}

export interface MemDetail {
	retcode: number;
	message: string;
	data: MemDetailData;
}

export interface MemDetailData {
	start_time: MemDetailTime;
	end_time: MemDetailTime;
	rank_percent: number;
	list: MemDetailListItem[];
	has_data: boolean;
	nick_name: string;
	avatar_icon: string;
	total_score: number;
	total_star: number;
	zone_id: number;
}

export interface MemDetailTime {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
}

export interface MemDetailListItem {
	score: number;
	star: number;
	total_star: number;
	challenge_time: MemDetailTime;
	boss: MemDetailBoss[];
	buffer: MemDetailBuffer[];
	avatar_list: MemDetailAvatar[];
	buddy: MemDetailBuddy;
}

export interface MemDetailBoss {
	icon: string;
	name: string;
	race_icon: string;
	bg_icon: string;
}

export interface MemDetailBuffer {
	icon: string;
	desc: string;
	name: string;
}

export interface MemDetailAvatar {
	id: number;
	level: number;
	element_type: number;
	avatar_profession: number;
	rarity: string;
	rank: number;
	role_square_url: string;
	sub_element_type: number;
}

export interface MemDetailBuddy {
	id: number;
	rarity: string;
	level: number;
	bangboo_rectangle_url: string;
}

export interface Token {
	ltoken: string;
	ltuid: string;
}
export interface Note {
	retcode: number;
	message: string;
	data: NoteData;
}

export interface NoteData {
	energy: NoteEnergy;
	vitality: NoteVitality;
	vhs_sale: NoteVhsSale;
	card_sign: string;
	bounty_commission: NoteBountyCommission;
	survey_points: null;
	abyss_refresh: number;
	coffee: null;
	weekly_task: NoteWeeklyTask;
	member_card: NoteMemberCard;
	is_sub: boolean;
	is_other_sub: boolean;
	temple_running: NoteTempleRunning;
}

export interface NoteEnergy {
	progress: NoteProgress;
	restore: number;
	day_type: number;
	hour: number;
	minute: number;
}

export interface NoteProgress {
	max: number;
	current: number;
}

export interface NoteVitality {
	max: number;
	current: number;
}

export interface NoteVhsSale {
	sale_state: string;
}

export interface NoteBountyCommission {
	num: number;
	total: number;
	refresh_time: number;
}

export interface NoteWeeklyTask {
	refresh_time: number;
	cur_point: number;
	max_point: number;
}

export interface NoteMemberCard {
	is_open: boolean;
	member_card_state: string;
	exp_time: string;
}

export interface NoteTempleRunning {
	expedition_state: string;
	bench_state: string;
	shelve_state: string;
	level: number;
	weekly_currency_max: string;
	currency_next_refresh_ts: string;
	current_currency: string;
}
