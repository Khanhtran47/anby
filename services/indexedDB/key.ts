import { openDB } from 'idb';

import { exportAesKey, generateAesKey, importAesKey } from '@/utils/common/crypto-web';

export const DB_NAME = 'AnbyDB';
export const STORE_NAME = 'encryptionKeys';

export async function getDB() {
	return openDB(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		},
	});
}

export async function saveKeyToDB(id: string, jwk: JsonWebKey) {
	const db = await getDB();
	await db.put(STORE_NAME, jwk, id);
}

export async function getKeyFromDB(id: string): Promise<JsonWebKey | undefined> {
	const db = await getDB();
	return db.get(STORE_NAME, id);
}

export async function deleteKeyFromDB(id: string) {
	const db = await getDB();
	await db.delete(STORE_NAME, id);
}

export async function getOrCreateUserKey(): Promise<CryptoKey> {
	const existingJwk = await getKeyFromDB('user-encryption-key');
	if (existingJwk) {
		return importAesKey(existingJwk);
	}
	const newKey = await generateAesKey();
	const jwk = await exportAesKey(newKey);
	await saveKeyToDB('user-encryption-key', jwk);
	return newKey;
}
