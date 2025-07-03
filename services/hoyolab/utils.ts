import { urlWithParams } from '@/utils/common/string';

type GameRecordParams = {
	server?: string;
	role_id?: string;
	schedule_type?: string;
};
export class Hoyolab {
	static readonly HOYOVERSE_API_URL = process.env.HOYOVERSE_API_URL;
	static readonly HOYOLAB_API_URL = process.env.HOYOLAB_API_URL;
	static readonly HOYOLAB_WIKI_API_URL = process.env.HOYOLAB_WIKI_API_URL;

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
		const url = `${this.HOYOVERSE_API_URL}content_v2_user/app/3e9196a4b9274bd7/getContentList`;
		return urlWithParams(url, {
			iPageSize: pageSize,
			iPage: page,
			iChanId: 288,
			sLangKey: langKey,
		});
	};

	static listVideos = () => {
		return `${this.HOYOLAB_WIKI_API_URL}hoyowiki/zzz/wapi/home/extend_reading_video`;
	};

	static entryList = () => {
		return `${this.HOYOLAB_WIKI_API_URL}hoyowiki/zzz/wapi/get_entry_page_list`;
	};

	static entryPage = ({ id }: { id: string | number }) => {
		const url = `${this.HOYOLAB_WIKI_API_URL}hoyowiki/zzz/wapi/get_entry_page`;
		return urlWithParams(url, { entry_page_id: id });
	};

	static menuFilter = ({ menuId }: { menuId: number }) => {
		const url = `${this.HOYOLAB_WIKI_API_URL}hoyowiki/zzz/wapi/get_menu_filters`;
		return urlWithParams(url, { menu_id: menuId });
	};

	/**
	 * Game Records
	 */

	static noteRecord = ({ server, role_id, schedule_type }: GameRecordParams) => {
		const url = `${this.HOYOLAB_API_URL}game_record/app/zzz/note_record`;
		return urlWithParams(url, { server, role_id, schedule_type });
	};
}
