import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
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
	params: Promise<{ driveDiscId: string }>;
}) {
	const { driveDiscId } = await params;
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
						<Link aria-label={t('drive-disc')} href="/drive-disc">
							{t('drive-disc')}
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage className="capitalize">{driveDiscId}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
