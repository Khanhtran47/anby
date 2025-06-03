export class Hoyolab {
	static readonly API_BASE_URL = process.env.HOYOLAB_API_URL;

	static listNews = ({
		langKey = 'en-us',
		pageSize = 6,
		page = 1,
	}:
		| {
				langKey?: string;
				pageSize?: number;
				page?: number;
		  }
		| undefined = {}) => {
		return `${this.API_BASE_URL}content_v2_user/app/3e9196a4b9274bd7/getContentList?iPageSize=${pageSize}&iPage=${page}&iChanId=288&sLangKey=${langKey}`;
	};
}
