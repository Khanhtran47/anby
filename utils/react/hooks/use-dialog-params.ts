'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { useRouter } from '@/i18n/navigation';

/**
 * Custom React hook for managing dialog open/close state via URL search parameters.
 *
 * This hook provides a simple API to open or close a dialog by manipulating a specific
 * query parameter in the URL. It is useful for keeping dialog state in sync with the URL,
 * enabling deep linking and browser navigation support.
 *
 * @param key - The query parameter key used to control the dialog's open state.
 * @returns An object containing:
 * - `isOpen`: A boolean indicating if the dialog is open (when the parameter value is 'open').
 * - `open`: A function to set the parameter and open the dialog.
 * - `close`: A function to remove the parameter and close the dialog.
 *
 * @example
 * ```tsx
 * const { isOpen, open, close } = useDialogParams('myDialog');
 * ```
 */
export function useDialogParams(key: string) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const openDialog = useCallback(
		(key: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(key, value);
			router.push(`?${params.toString()}`);
		},
		[searchParams, router],
	);

	const closeDialog = useCallback(
		(key: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.delete(key);
			router.push(`?${params.toString()}`);
		},
		[searchParams, router],
	);

	const isOpen = useMemo(() => searchParams.get(key) === 'open', [searchParams, key]);

	return {
		isOpen,
		open: () => openDialog(key, 'open'),
		close: () => closeDialog(key),
	};
}
