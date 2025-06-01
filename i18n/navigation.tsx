'use client';

import { startTransition } from 'react';
import { createNavigation } from 'next-intl/navigation';

import { useProgressBar } from '@/context/progress-bar';

import { routing } from './routing';

import type { ComponentProps } from 'react';

const { Link: NextLink, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

function Link({ href, children, onClick, ...rest }: ComponentProps<typeof NextLink>) {
	const progress = useProgressBar();
	const router = useRouter();

	return (
		<NextLink
			href={href}
			onClick={(e) => {
				e.preventDefault();
				progress.start();

				startTransition(() => {
					router.push(href.toString());
					progress.done();
				});

				onClick?.(e);
			}}
			{...rest}
		>
			{children}
		</NextLink>
	);
}

export { Link, redirect, usePathname, useRouter, getPathname };
