'use client';

import { useCallback } from 'react';

import { useProgressBar } from '@/context/progress-bar';
import { useTransitionRouter } from '@/context/transition-router';

import { NextLink, useRouter } from './navigation';

import type { AnimateOptions } from '@/context/transition-router';
import type { ComponentProps, MouseEvent } from 'react';

interface LinkProps extends ComponentProps<typeof NextLink> {
	isExternal?: boolean;
	animateOptions?: AnimateOptions;
}

export function Link(props: LinkProps) {
	const { href, children, isExternal, onClick: onClickProp, animateOptions, ...rest } = props;
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

			startRouteTransition({
				animateOptions,
				callback: () => {
					router.push(href.toString());
					progress.done();
				},
			});
		},
		[onClickProp, stage, startRouteTransition, animateOptions, progress, router, href],
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
