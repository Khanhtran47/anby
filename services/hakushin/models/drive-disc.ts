export interface DriveDisc {
	CHS: CHS;
	EN: CHS;
	JA: CHS;
	KO: CHS;
	icon: string;
}

export interface CHS {
	desc2: string;
	desc4: string;
	name: string;
}

export interface DriveDiscDetails {
	Desc2: string;
	Desc4: string;
	Icon: string;
	Icon2: string;
	Id: number;
	Name: string;
	Story: string;
}
