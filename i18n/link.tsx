'use client';

import { startTransition, useCallback } from 'react';

import { useProgressBar } from '@/context/progress-bar';

import { NextLink, useRouter } from './navigation';

import type { ComponentProps, MouseEvent } from 'react';

export function Link({
	href,
	children,
	onClick: onClickProp,
	isExternal,
	...rest
}: ComponentProps<typeof NextLink> & {
	isExternal?: boolean;
}) {
	const progress = useProgressBar();
	const router = useRouter();
	const onClick = useCallback(
		(e: MouseEvent<HTMLAnchorElement>) => {
			if (onClickProp) onClickProp(e);
			e.preventDefault();
			progress.start();

			startTransition(() => {
				router.push(href.toString());
				progress.done();
			});
		},
		[href, onClickProp, progress, router],
	);

	return (
		<NextLink
			href={href}
			{...(isExternal
				? {
						target: '_blank',
						rel: 'noopener noreferrer',
						onClick: onClickProp,
					}
				: {
						onClick,
					})}
			{...rest}
		>
			{children}
		</NextLink>
	);
}
