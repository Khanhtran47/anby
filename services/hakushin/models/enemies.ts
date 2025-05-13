export interface EnemyCreatures {
	CHS: string;
	EN: string;
	JA: string;
	KO: string;
	desc: string;
	group: number;
	icon: string;
	rarity: number;
	tag: Tag[];
	tag2: Tag2[];
}

export enum Tag {
	Ether = 'Ether',
	NotPro = 'NotPro',
	Pro = 'Pro',
}

export enum Tag2 {
	All = 'All',
	Metro = 'Metro',
	SkyScraper = 'SkyScraper',
}

export interface EnemyCreaturesDetails {
	CardObtain: string;
	CardQuote: string;
	CardSkillDesc: string;
	Desc: string;
	GroupDesc: string;
	GroupId: number;
	Id: number;
	ImagePath: string;
	MonsterId: number;
	MonsterInfo: MonsterInfo;
	Name: string;
	Rarity: number;
	Tag: string[];
	Tag2: string[];
}

export interface MonsterInfo {
	CodeName: string;
	Curves: Curves;
	Element: Element;
	Icon: string;
	Stats: { [key: string]: number };
	Tag: string[];
	Type: string;
}

export interface Curves {
	Attack: Attack;
	Defence: Attack;
	Hp: Attack;
	Stun: Attack;
}

export interface Attack {
	Curve: number[];
	Ratio: number;
}

export interface Element {
	Electric: number;
	Ether: number;
	Fire: number;
	Ice: number;
	Physical: number;
}
