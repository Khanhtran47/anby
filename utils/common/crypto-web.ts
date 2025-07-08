const encoder = new TextEncoder();
const decoder = new TextDecoder();

// For AES-256-GCM, 256 bits = 32 bytes
export async function generateAesKey(): Promise<CryptoKey> {
	return crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
}

export async function exportAesKey(key: CryptoKey): Promise<JsonWebKey> {
	return crypto.subtle.exportKey('jwk', key);
}

export async function importAesKey(jwk: JsonWebKey): Promise<CryptoKey> {
	return crypto.subtle.importKey('jwk', jwk, { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']);
}

export async function encryptDataWithKey(data: string, key: CryptoKey): Promise<string> {
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const ciphertext = await crypto.subtle.encrypt(
		{ name: 'AES-GCM', iv },
		key,
		encoder.encode(data),
	);
	const combined = new Uint8Array(iv.length + ciphertext.byteLength);
	combined.set(iv, 0);
	combined.set(new Uint8Array(ciphertext), iv.length);
	return btoa(String.fromCharCode(...combined));
}

export async function decryptDataWithKey(b64: string, key: CryptoKey): Promise<string> {
	const combined = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
	const iv = combined.slice(0, 12);
	const data = combined.slice(12);

	const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
	return decoder.decode(plaintext);
}
