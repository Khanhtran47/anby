'use client';

import { useCallback, useMemo } from 'react';

import { cn } from '@/utils/common/misc';
import { useTransitionRouter } from '@/context/transition-router';

import { NextLink, usePathname, useRouter } from './navigation';

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
		className,
		...rest
	} = props;
	const pathname = usePathname();
	const { stage, startRouteTransition } = useTransitionRouter();
	const router = useRouter();
	const isActive = useMemo(() => pathname === href, [pathname, href]);
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
			className={cn(isActive || stage ? 'pointer-events-none !cursor-default' : '', className)}
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
