import React from 'react';
import Link from 'next/link';

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
	const breadcrumbItems: ReactElement[] = [];
	let breadcrumbPage: ReactElement = <></>;
	for (let i = 0; i < params.all.length; i++) {
		const route = params.all[i];
		const href = `/${params.all.at(0)}/${route}`;
		if (i === params.all.length - 1) {
			breadcrumbPage = (
				<BreadcrumbItem>
					<BreadcrumbPage className="capitalize">{route}</BreadcrumbPage>
				</BreadcrumbItem>
			);
		} else {
			breadcrumbItems.push(
				<React.Fragment key={href}>
					<BreadcrumbItem>
						<BreadcrumbLink asChild className="capitalize">
							<Link aria-label={route} href={href}>
								{route}
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
