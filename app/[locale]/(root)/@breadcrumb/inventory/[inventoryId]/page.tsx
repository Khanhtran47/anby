import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/link';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Icon } from '@/components/ui/icon';

export default async function BreadcrumbSlot({
	params,
}: {
	params: Promise<{ inventoryId: string }>;
}) {
	const { inventoryId } = await params;
	const t = await getTranslations('SidebarMenu');
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
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link aria-label={t('inventory')} href="/inventory">
							{t('inventory')}
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage className="capitalize">{inventoryId}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
