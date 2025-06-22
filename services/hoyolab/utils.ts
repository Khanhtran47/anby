export class Hoyolab {
	static readonly API_BASE_URL = process.env.HOYOLAB_API_URL;

	static readonly WIKI_API_BASE_URL = process.env.HOYOLAB_WIKI_API_URL;

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

	static listVideos = () => {
		return `${this.WIKI_API_BASE_URL}hoyowiki/zzz/wapi/home/extend_reading_video`;
	};

	static entryList = () => {
		return `${this.WIKI_API_BASE_URL}hoyowiki/zzz/wapi/get_entry_page_list`;
	};

	static entryPage = ({ id }: { id: string | number }) => {
		return `${this.WIKI_API_BASE_URL}hoyowiki/zzz/wapi/entry_page?entry_page_id=${id}`;
	};

	static menuFilter = ({ menuId }: { menuId: number }) => {
		return `${this.WIKI_API_BASE_URL}hoyowiki/zzz/wapi/get_menu_filters?menu_id=${menuId}`;
	};
}
