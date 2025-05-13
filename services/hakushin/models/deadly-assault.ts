export interface DeadlyAssault {
	CHS?: CHS;
	EN?: En;
	JA?: Ja;
	KO?: Ko;
	begin?: Date;
	end?: Date;
	live_begin?: Date;
	live_end?: Date;
	sort?: number;
}

export enum CHS {
	危局强袭战 = '危局强袭战',
}

export enum En {
	DeadlyAssault = 'Deadly Assault',
}

export enum Ja {
	危局強襲戦 = '危局強襲戦',
}

export enum Ko {
	위험한강습전 = '위험한 강습전',
}
