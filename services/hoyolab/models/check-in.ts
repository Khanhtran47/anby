export interface CheckInInfo {
	retcode: number;
	message: string;
	data: CheckInInfoData;
}

export interface CheckInInfoData {
	total_sign_day: number;
	today: string;
	is_sign: boolean;
	is_sub: boolean;
	region: string;
	sign_cnt_missed: number;
	short_sign_day: number;
	send_first: boolean;
}

export interface CheckInSign {
	retcode: number;
	message: string;
	data: {};
}
