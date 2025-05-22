import React from 'react';

import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Icon } from '@/components/ui/icon';

import type { ReactElement } from 'react';

export default async function BreadcrumbSlot(props: { params: Promise<{ all: string[] }> }) {
	const params = await props.params;
	const routes = routing.locales.includes(params.all[0] as (typeof routing.locales)[number])
		? params.all.slice(1)
		: params.all;
	const breadcrumbItems: ReactElement[] = [];
	let breadcrumbPage: ReactElement = <></>;
	for (let i = 0; i < routes.length; i++) {
		const route = routes[i];
		const href = `/${routes.at(0)}/${route}`;
		if (i === routes.length - 1) {
			breadcrumbPage = (
				<BreadcrumbItem>
					<BreadcrumbPage className="capitalize">{route.replace(/-/g, ' ')}</BreadcrumbPage>
				</BreadcrumbItem>
			);
		} else {
			breadcrumbItems.push(
				<React.Fragment key={href}>
					<BreadcrumbItem>
						<BreadcrumbLink asChild className="capitalize">
							<Link aria-label={route} href={href}>
								{route.replace(/-/g, ' ')}
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
				</React.Fragment>,
			);
		}
	}

	return (
		<Breadcrumb showBgPattern showHomeIcon>
			<BreadcrumbList>
				<BreadcrumbItem showHomeIcon>
					<BreadcrumbLink asChild>
						<Link aria-label="Home" href="/">
							<Icon name="home-bold" size="md" />
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				{breadcrumbItems}
				{breadcrumbPage}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
