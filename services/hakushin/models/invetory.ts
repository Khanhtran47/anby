export interface Inventory {
	boss?: boolean;
	class: number;
	icon: string;
	name: string;
	rank: number;
}

export interface InventoryDetails {
	Class: Class;
	Desc: string;
	Desc2: string;
	IconPath: string;
	Id: number;
	Name: string;
	Rarity: number;
}

export interface Class {
	'1': string;
}
