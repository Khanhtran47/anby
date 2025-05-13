export interface ShiyuDefense {
	'61001': The61001;
	'61002': The61001;
	'61003': The61003;
	'62001': The61003;
	'620011': The61003;
	'62002': The61003;
	'620021': The61003;
	'62003': The61003;
	'62004': The61003;
	'62005': The61003;
	'62006': The61003;
	'62007': The61003;
	'62008': The61003;
	'62009': The61003;
	'62010': The61003;
	'62011': The61003;
	'62012': The61003;
	'62013': The61003;
	'62014': The61003;
	'62015': The61003;
	'62016': The61003;
	'62017': The61003;
	'62018': The61003;
	'62019': The61003;
	'62020': The61003;
	'620201-1': The620201;
	'620201-2': The620201;
	'620201-3': The620201;
	'62021': The61003;
	'62022': The61003;
	'62023': The61001;
	'620231-1': The61003;
	'620231-2': The61003;
	'620231-3': The61003;
	'62024': The61001;
	'62025': The61001;
}

export interface The61001 {
	CHS: string;
	EN: string;
	JA: string;
	KO: string;
	sort: number;
}

export interface The61003 {
	CHS: CHS;
	EN: En;
	JA: Ja;
	KO: Ko;
	begin?: Date;
	end?: Date;
	live_begin?: Date;
	live_end?: Date;
	sort: number;
}

export enum CHS {
	剧变节点 = '剧变节点',
	奇袭节点 = '奇袭节点',
}

export enum En {
	AmbushNode = 'Ambush Node',
	CriticalNode = 'Critical Node',
}

export enum Ja {
	奇襲ノード = '奇襲ノード',
	激変ノード = '激変ノード',
}

export enum Ko {
	격변구간 = '격변 구간',
	기습구간 = '기습 구간',
}

export interface The620201 {
	live_begin: Date;
	live_end: Date;
}
