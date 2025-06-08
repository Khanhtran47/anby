export interface ListNews {
	data: Data;
	message: string;
	retcode: number;
}

export interface Data {
	iTotal: number;
	list: List[];
}

export interface List {
	dtCreateTime: Date;
	dtEndTime: Date;
	dtStartTime: Date;
	iInfoId: number;
	sAuthor: string;
	sCategoryName: string;
	sChanId: string[];
	sContent: string;
	sExt: string;
	sIntro: string;
	sSign: string;
	sTagName: any[];
	sTitle: string;
	sUrl: string;
}
