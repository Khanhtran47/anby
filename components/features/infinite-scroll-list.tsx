'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLayoutStore } from '@/store/use-layout-store';
import { useLocale } from 'next-intl';

import { getListAgents } from '@/services/hakushin/api/agent';
import { LANGUAGES } from '@/constants/lang';

import { Spinner } from '../ui/spinner';

import type { Agent } from '@/services/hakushin/models/agent';

type ItemType = InfiniteScrollProps['type'] extends 'agent' ? Agent : any;

interface InfiniteScrollProps {
	type: 'agent' | 'w-engine' | 'bangboo' | 'drive-disc';
	initialItems: ItemType[];
	initialPage: number;
	limit: number;
	totalItems: number;
	renderItem: (item: ItemType) => React.ReactNode;
	className?: string;
}

export default function InfiniteScroll(props: InfiniteScrollProps) {
	const {
		// type,
		initialItems,
		initialPage,
		limit,
		totalItems,
		renderItem,
		className,
	} = props;
	const locale = useLocale();
	const langKey = LANGUAGES.find((lang) => lang.code === locale)?.langKey || 'en-us';

	const { viewportRef } = useLayoutStore((state) => state);

	const [items, setItems] = useState<ItemType[]>(initialItems);
	const [page, setPage] = useState(initialPage);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(totalItems > initialItems.length);
	const [error, setError] = useState('');

	const observerTarget = useRef<HTMLDivElement>(null);

	const loadMoreItems = useCallback(async () => {
		if (loading || !hasMore) return;

		setLoading(true);
		const nextPage = page + 1;

		try {
			const result = await getListAgents({ page: nextPage, langKey });

			if ('error' in result) {
				setError(result.error);
			} else if (result.items && result.items.length > 0) {
				setItems((prevItems) => [...prevItems, ...result.items]);
				setPage(nextPage);

				// Check if we've reached the end
				if (nextPage >= result.totalPages || result.items.length < limit) {
					setHasMore(false);
				}
			} else {
				setHasMore(false);
			}
		} catch (err) {
			setError('Failed to load more items. Please try again later.');
			console.error('Error in client component:', err);
		} finally {
			setLoading(false);
		}
	}, [loading, hasMore, page, limit, langKey]);

	// Setup the intersection observer
	useEffect(() => {
		const target = observerTarget.current;
		if (!target || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					void loadMoreItems();
				}
			},
			{ threshold: 0.1, root: viewportRef?.current },
		);

		observer.observe(target);

		// Cleanup observer on unmount
		return () => {
			if (target) {
				observer.unobserve(target);
			}
		};
		// eslint-disable-next-line react-hooks/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasMore, loading]);

	return (
		<>
			{/* Error message if any */}
			{error && <p className="my-4 text-center text-red-500">{error}</p>}

			{/* Items list */}
			<div className={className}>{items.map((item) => renderItem(item))}</div>

			{/* Loading indicator and observer target */}
			<div ref={observerTarget} className="mt-8 flex h-20 items-center justify-center">
				{loading ? <Spinner size="lg" /> : null}
			</div>
		</>
	);
}
