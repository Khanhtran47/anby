import { urlWithParams } from '@/utils/common/string';

export type GameRecordParams = {
	/**
	 * The server identifier.
	 * - "prod_gf_jp" for Asia server
	 * - "prod_gf_us" for America server
	 * - "prod_gf_eu" for Europe server
	 * - "prod_gf_sg" for TW,HK,MO server
	 */
	server: string;
	/**
	 * In-game UID
	 */
	uid: string;
	scheduleType?: string;
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
		const url = `${this.HOYOLAB_WIKI_API_URL}hoyowiki/zzz/wapi/entry_page`;
		return urlWithParams(url, { entry_page_id: id });
	};

	static menuFilter = ({ menuId }: { menuId: number }) => {
		const url = `${this.HOYOLAB_WIKI_API_URL}hoyowiki/zzz/wapi/get_menu_filters`;
		return urlWithParams(url, { menu_id: menuId });
	};

	/**
	 * ========================================================================
	 * ============================== Game Records ============================
	 * ========================================================================
	 */

	static index = ({ server, uid }: GameRecordParams) => {
		const url = `${this.HOYOLAB_API_URL}event/game_record_zzz/api/zzz/index`;
		return urlWithParams(url, { server, role_id: uid });
	};

	static note = ({ server, uid }: GameRecordParams) => {
		const url = `${this.HOYOLAB_API_URL}event/game_record_zzz/api/zzz/note`;
		return urlWithParams(url, { server, role_id: uid });
	};

	static challenge = ({ server, uid, scheduleType }: GameRecordParams) => {
		const url = `${this.HOYOLAB_API_URL}event/game_record_zzz/api/zzz/challenge`;
		return urlWithParams(url, { region: server, uid, schedule_type: scheduleType });
	};

	static memDetail = ({ server, uid, scheduleType }: GameRecordParams) => {
		const url = `${this.HOYOLAB_API_URL}event/game_record_zzz/api/zzz/mem_detail`;
		return urlWithParams(url, { region: server, uid, schedule_type: scheduleType });
	};
}
