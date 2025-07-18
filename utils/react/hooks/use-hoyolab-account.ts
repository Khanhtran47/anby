import { useEffect, useMemo, useState } from 'react';
import { useLocalStorageValue } from '@react-hookz/web';

import { getOrCreateUserKey } from '@/services/indexedDB/key';
import { decryptDataWithKey, encryptDataWithKey } from '@/utils/common/crypto-web';
import { parseJSON } from '@/utils/common/function';
import { hoyolabAccountSchema } from '@/schemas/account-sync';

import type { HoyolabAccount } from '@/schemas/account-sync';

export function useHoyolabAccount() {
	const hoyolabAccounts = useLocalStorageValue<string>('hyl-acc', {
		defaultValue: '',
	});
	const [accounts, setAccounts] = useState<HoyolabAccount[]>([]);

	const loadAccountLists = async (): Promise<HoyolabAccount[]> => {
		if (typeof window === 'undefined' || !hoyolabAccounts.value) return [];

		try {
			const key = await getOrCreateUserKey();
			const decryptedAccounts = await decryptDataWithKey(hoyolabAccounts.value, key);
			const parsedAccounts = parseJSON(decryptedAccounts, []);
			if (Array.isArray(parsedAccounts)) {
				return parsedAccounts.map((account) => hoyolabAccountSchema.parse(account));
			} else {
				console.warn('Parsed Hoyolab accounts is not an array:', parsedAccounts);
			}
		} catch (error) {
			console.error('Failed to load Hoyolab accounts:', error);
		}

		return [];
	};

	const saveAccountLists = async (list: HoyolabAccount[]) => {
		const key = await getOrCreateUserKey();
		const json = JSON.stringify(list);
		const encrypted = await encryptDataWithKey(json, key);
		hoyolabAccounts.set(encrypted);
	};

	useEffect(() => {
		(async () => {
			const loadedAccounts = await loadAccountLists();
			setAccounts(loadedAccounts);
		})();
		// eslint-disable-next-line react-hooks/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addAccount = async (data: HoyolabAccount) => {
		const newAccounts = [...accounts, data];
		await saveAccountLists(newAccounts);
		setAccounts(newAccounts);
	};

	const removeAccount = async (id: string) => {
		const newAccounts = accounts.filter((account) => account.id !== id);
		await saveAccountLists(newAccounts);
		setAccounts(newAccounts);
	};

	const updateAccount = async (data: HoyolabAccount) => {
		const newAccounts = accounts.map((account) => (account.id === data.id ? data : account));
		await saveAccountLists(newAccounts);
		setAccounts(newAccounts);
	};

	const setDefaultAccount = async (id: string) => {
		const newAccounts = accounts.map((account) => {
			if (account.id === id) {
				return { ...account, isDefault: true };
			}
			if (account.isDefault) {
				return { ...account, isDefault: false };
			}
			return account;
		});
		await saveAccountLists(newAccounts);
		setAccounts(newAccounts);
	};

	const defaultAccount = useMemo(() => {
		return accounts.find((account) => account.isDefault) || null;
	}, [accounts]);

	return {
		accounts,
		defaultAccount,
		addAccount,
		removeAccount,
		updateAccount,
		setDefaultAccount,
	};
}
