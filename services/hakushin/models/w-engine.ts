export interface WEngine {
	CHS: string;
	EN: string;
	JA: string;
	KO: string;
	desc: string;
	icon: string;
	rank: number;
	type: number;
}

export interface WEngineDetails {
	BaseProperty: Property;
	CodeName: string;
	Desc: string;
	Desc2: string;
	Desc3: string;
	Icon: string;
	Id: number;
	Level: { [key: string]: Level };
	Materials: string;
	Name: string;
	RandProperty: Property;
	Rarity: number;
	Stars: { [key: string]: Star };
	Talents: { [key: string]: Talent };
	WeaponType: WeaponType;
}

export interface Property {
	Format: string;
	Name: string;
	Name2: string;
	Value: number;
}

export interface Level {
	Exp: number;
	Rate: number;
	Rate2: number;
}

export interface Star {
	RandRate: number;
	StarRate: number;
}

export interface Talent {
	Desc: string;
	Name: string;
}

export interface WeaponType {
	'1': string;
}
