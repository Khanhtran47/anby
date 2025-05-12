import type { Skin } from '../types';

export interface ListAgents {
	CHS: string;
	EN: string;
	JA: string;
	KO: string;
	camp: number;
	code: string;
	desc: string;
	element: number;
	hit: number;
	icon: string;
	rank: number;
	skin: { [key: string]: Skin };
	spelement?: string;
	type: number;
}

export interface AgentDetails {
	Camp: Camp;
	CodeName: string;
	ElementType: ElementType;
	ExtraLevel: { [key: string]: ExtraLevel };
	FairyRecommend: FairyRecommend;
	Gender: number;
	HitType: HitType;
	Icon: string;
	Id: number;
	Level: { [key: string]: RootObjectLevel };
	LevelEXP: number[];
	Name: string;
	PartnerInfo: PartnerInfo;
	Passive: Passive;
	Rarity: number;
	Skill: Skill;
	SkillList: { [key: string]: SkillList };
	Skin: { [key: string]: Skin };
	SpecialElementType: SpecialElementType;
	Stats: Stats;
	Talent: { [key: string]: Talent };
	WeaponType: WeaponType;
}

export interface Camp {
	'8': string;
}

export interface ElementType {
	'205': string;
}

export interface ExtraLevel {
	Extra: { [key: string]: Part4 };
	MaxLevel: number;
}

export interface Part4 {
	Format: Part4Format;
	Icon?: string;
	Name: string;
	Prop: number;
	Value?: number;
}

export enum Part4Format {
	Format00 = '{0:0.##}',
	Purple00 = '{0:0.#%}',
	The00 = '{0:0.#}',
}

export interface FairyRecommend {
	Part4: Part4;
	Part5: Part4;
	Part6: Part4;
	PartSub: Part4;
	Slot2: number;
	Slot4: number;
	SlotSub: number;
}

export interface HitType {
	'102': string;
}

export interface RootObjectLevel {
	Attack: number;
	Defence: number;
	HpMax: number;
	LevelMax: number;
	LevelMin: number;
	Materials: { [key: string]: number };
}

export interface PartnerInfo {
	Birthday: string;
	FullName: string;
	Gender: string;
	IconPath: string;
	ImpressionF: string;
	ImpressionM: string;
	Name: string;
	OutlookDesc: string;
	ProfileDesc: string;
	Race: string;
	RoleIcon: string;
	Stature: string;
	TrustLv: { [key: string]: string };
	UnlockCondition: string[];
}

export interface Passive {
	Level: { [key: string]: PassiveLevel };
	Materials: { [key: string]: { [key: string]: number } };
}

export interface PassiveLevel {
	Desc: string[];
	ExtraProperty: SpecialElementType;
	Id: number;
	Level: number;
	Name: Name[];
}

export interface SpecialElementType {}

export enum Name {
	AdditionalAbilityMoonlitFrenzy = 'Additional Ability: "Moonlit Frenzy"',
	CorePassiveGracefulAndante = 'Core Passive: "Graceful Andante"',
}

export interface Skill {
	Assist: Assist;
	Basic: Basic;
	Chain: Chain;
	Dodge: Dodge;
	Special: Special;
}

export interface Assist {
	Description: AssistDescription[];
	Material: { [key: string]: { [key: string]: number } };
}

export interface AssistDescription {
	Desc?: string;
	Name: string;
	Param?: PurpleParam[];
}

export interface PurpleParam {
	Desc: string;
	Name: string;
	Param: { [key: string]: ParamValue };
}

export interface ParamValue {
	AttackData: any[];
	AttributeInfliction: number;
	DamagePercentage: number;
	DamagePercentageGrowth: number;
	FeverRecovery: number;
	FeverRecoveryGrowth: number;
	Format: ParamFormat;
	Growth: number;
	Main: number;
	SpConsume: number;
	SpRecovery: number;
	SpRecoveryGrowth: number;
	StunRatio: number;
	StunRatioGrowth: number;
}

export enum ParamFormat {
	Empty = '%',
}

export interface Basic {
	Description: AssistDescription[];
	Material: { [key: string]: { [key: string]: number } };
}

export interface Chain {
	Description: ChainDescription[];
	Material: { [key: string]: { [key: string]: number } };
}

export interface ChainDescription {
	Desc?: string;
	Name: string;
	Param?: FluffyParam[];
}

export interface FluffyParam {
	Desc: string;
	Name: string;
	Param?: { [key: string]: ParamValue };
}

export interface Dodge {
	Description: AssistDescription[];
	Material: { [key: string]: { [key: string]: number } };
}

export interface Special {
	Description: ChainDescription[];
	Material: { [key: string]: { [key: string]: number } };
}

export interface SkillList {
	Desc: string;
	ElementType: number;
	HitType: number;
	Name: string;
}

export interface Stats {
	Armor: number;
	ArmorGrowth: number;
	Attack: number;
	AttackGrowth: number;
	AvatarPieceId: number;
	BreakStun: number;
	Crit: number;
	CritDamage: number;
	CritDmgRes: number;
	CritRes: number;
	Defence: number;
	DefenceGrowth: number;
	ElementAbnormalPower: number;
	ElementMystery: number;
	Endurance: number;
	HpGrowth: number;
	HpMax: number;
	PenDelta: number;
	PenRate: number;
	Rbl: number;
	RblCorrectionFactor: number;
	RblProbability: number;
	RpMax: number;
	RpRecover: number;
	Shield: number;
	ShieldGrowth: number;
	SpBarPoint: number;
	SpRecover: number;
	Stun: number;
	Tags: string[];
}

export interface Talent {
	Desc: string;
	Desc2: string;
	Level: number;
	Name: string;
}

export interface WeaponType {
	'4': string;
}
