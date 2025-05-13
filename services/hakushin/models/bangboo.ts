export interface Bangboo {
	CHS: string;
	EN: string;
	JA: string;
	KO: string;
	codename: string;
	desc: string;
	icon: string;
	rank: number;
}

export interface BangbooDetails {
	CodeName: string;
	Desc: string;
	Icon: string;
	Id: number;
	Level: { [key: string]: RootObjectLevel };
	Name: string;
	Rarity: number;
	Skill: Skill;
	SkillProp: { [key: string]: { [key: string]: SkillProp } };
	Stats: { [key: string]: number };
}

export interface RootObjectLevel {
	Attack: number;
	Defence: number;
	Extra: { [key: string]: Extra };
	HpMax: number;
	LevelMax: number;
	LevelMin: number;
	Materials: { [key: string]: number };
}

export interface Extra {
	Format: Format;
	Name: ExtraName;
	Prop: number;
	Value: number;
}

export enum Format {
	The00 = '{0:0.#%}',
}

export enum ExtraName {
	CRITRate = 'CRIT Rate',
	CritDmg = 'CRIT DMG',
}

export interface Skill {
	A: A;
	B: A;
	C: A;
}

export interface A {
	Level: { [key: string]: ALevel };
}

export interface ALevel {
	Desc: string;
	Name: LevelName;
	Param: string;
	Property: Property[];
}

export enum LevelName {
	ColdSurge = 'Cold Surge',
	DrylandsSharkHunt = 'Drylands Shark Hunt',
	RelentlessPursuit = 'Relentless Pursuit',
}

export enum Property {
	AnomalyBuildupIncrease = 'Anomaly Buildup Increase',
	Cooldown = 'Cooldown',
	DMGMultiplier = 'DMG Multiplier',
	DazeMultiplier = 'Daze Multiplier',
}

export interface SkillProp {
	Format: string;
	Growth: number;
	Main: number;
}
