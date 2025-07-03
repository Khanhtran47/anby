'use client';

import { useCallback } from 'react';

import { useTransitionRouter } from '@/context/transition-router';

import { NextLink, useRouter } from './navigation';

import type { AnimateOptions } from '@/context/transition-router';
import type { ComponentProps, MouseEvent } from 'react';

interface LinkProps extends ComponentProps<typeof NextLink> {
	isExternal?: boolean;
	animateOptions?: AnimateOptions;
}

export function Link(props: LinkProps) {
	const {
		href,
		children,
		isExternal,
		onClick: onClickProp,
		animateOptions = {
			animateName: 'fade',
		},
		...rest
	} = props;
	const { stage, startRouteTransition } = useTransitionRouter();
	const router = useRouter();
	const onClick = useCallback(
		(e: MouseEvent<HTMLAnchorElement>) => {
			if (onClickProp) onClickProp(e);
			e.preventDefault();

			if (stage) return;

			startRouteTransition({
				animateOptions,
				callback: () => {
					router.push(href.toString());
				},
			});
		},
		[onClickProp, stage, startRouteTransition, animateOptions, router, href],
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
