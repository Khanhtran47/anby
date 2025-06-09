import { fetchWithErrorHandling } from '@/utils/common/misc';

import { Hoyolab } from '../utils';

import type { EntryList } from '../models/entry-list';

export const getEntryList = async ({
	langKey = 'en-us',
	filters = [],
	menuId,
	page = 1,
	pageSize = 10,
}: {
	/**
	 * The language key for the request.
	 * Defaults to 'en-us' if not provided.
	 * @example 'en-us'
	 */
	langKey?: string;
	/**
	 * An array of filters to apply to the entry list.
	 * This can include various filter criteria such as item type, rarity, etc.
	 * @example ['3', '4']
	 */
	filters?: string[];
	/**
	 * The menu ID to list types for.
	 * This is typically the ID of the menu you want to fetch items for.
	 * For example, '8' for the "Agents" menu.
	 * @example '8'
	 */
	menuId: string;
	page: number;
	pageSize: number;
}) => {
	const result = await fetchWithErrorHandling<EntryList>(Hoyolab.entryList(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'X-Rpc-Language': langKey,
			'X-Rpc-Wiki_app': 'zzz',
			Origin: 'https://wiki.hoyolab.com',
			Referer: 'https://wiki.hoyolab.com/',
		},
		body: JSON.stringify({
			filters,
			menu_id: menuId,
			page_num: page,
			page_size: pageSize,
			use_es: true,
		}),
	});
	if (result && 'error' in result) {
		return { error: result.error };
	}
	return result;
};
