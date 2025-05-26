import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { catchErrorTyped } from './function';

import type { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function fetchWithErrorHandling<T>(url: string, options?: RequestInit) {
	const [error, res] = await catchErrorTyped(fetch(url, options));
	if (error) {
		console.error('Fetch error:', error);
		return { error: error.message || 'An error occurred while fetching data.' } as {
			error: string;
		};
	} else {
		try {
			const data = await res.json();
			return data as T;
		} catch (jsonError) {
			console.error('JSON parse error:', jsonError);
			return { error: 'An error occurred while parsing the response.' } as { error: string };
		}
	}
}
