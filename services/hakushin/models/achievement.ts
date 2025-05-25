export interface ListAchievements {
	Achievement: { [key: string]: Achievement };
	Category: { [key: string]: Category };
}

export interface Achievement {
	Desc: string;
	Group: number;
	Name: string;
	Rarity: number;
}

export interface Category {
	Group: { [key: string]: Group };
	Name: string;
}

export interface Group {
	Name: string;
	Sort: number;
}
