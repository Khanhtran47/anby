export interface Skin {
	Desc: string;
	Image: string;
	Name: string;
}

export interface Agent {
	name: string;
	img: string;
	id: number;
	faction: number;
	rarity: number;
	specialty: number;
	stat: number;
	code: string;
	desc: string;
	skin: {
		[key: string]: Skin;
	};
	spStat: {
		name: string | undefined;
		icon: string | undefined;
	};
}

export interface FilterValue {
	id?: string;
	icon?: string;
	value?: string;
	enumString?: string;
}

export interface Module {
	id?: string;
	name?: string;
	desc?: string;
	originModuleId?: string;
}

export interface BaseInfo extends Module {
	data?: {
		value:
			| (
					| string
					| {
							amount: number;
							ep_id: number;
							icon: string;
							menuId: string;
							name: string;
							_menuId: string;
					  }
			  )[]
			| undefined;
		key: string;
		id: string;
		isMaterial?: boolean;
	}[];
}

export interface AgentTalent extends Module {
	data?: {
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
}

export interface Ascension extends Module {
	data?: {
		materials?: (
			| {
					amount?: number;
					ep_id?: number;
					img?: string;
					menuId?: string;
					nickname?: string;
					_menuId?: string;
			  }
			| undefined
		)[];
		id?: string;
		key?: string;
		combatList?: {
			key?: string;
			values?: string[];
		}[];
	}[];
}

export interface MindscapeCinema extends Module {
	data?: {
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
	};
}

export interface Gallery extends Module {
	data?: {
		list: {
			id?: string;
			img?: string;
			imgDesc?: string;
			key?: string;
		}[];
		pic?: string;
	};
}

export interface VideoCollection extends Module {
	data?: {
		list?: {
			name?: string;
			videos?: {
				videoId: string;
				name?: string;
				duration?: string;
				title?: string;
				thumbnail?: string;
			}[];
		}[];
	};
}

export interface CharacterBackground extends Module {
	data?: {
		list: {
			desc?: string;
			title?: string;
		}[];
	};
}

export interface CharacterVoice extends Module {
	data?: {
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
	};
}

export interface AdditionalInformation extends Module {
	data?: {
		list?: {
			audios?: {
				id?: string;
				name?: string;
				url?: string;
			}[];
			desc?: string;
			title?: string;
		}[];
	};
}
