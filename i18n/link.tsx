'use client';

import { useCallback } from 'react';

import { useProgressBar } from '@/context/progress-bar';
import { useTransitionRouter } from '@/context/transition-router';

import { NextLink, useRouter } from './navigation';

import type { ComponentProps, MouseEvent } from 'react';

interface LinkProps extends ComponentProps<typeof NextLink> {
	isExternal?: boolean;
}

export function Link(props: LinkProps) {
	const { href, children, isExternal, onClick: onClickProp, ...rest } = props;
	const progress = useProgressBar();
	const { stage, startRouteTransition } = useTransitionRouter();
	const router = useRouter();
	const onClick = useCallback(
		(e: MouseEvent<HTMLAnchorElement>) => {
			if (onClickProp) onClickProp(e);
			e.preventDefault();

			if (stage) return;

			if (!stage) {
				progress.start();
			}

			startRouteTransition(() => {
				router.push(href.toString());
				progress.done();
			});
		},
		[href, stage, onClickProp, progress, router, startRouteTransition],
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
