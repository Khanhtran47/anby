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

export default async function BreadcrumbSlot({ params }: { params: Promise<{ agentId: string }> }) {
	const { agentId } = await params;
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
						<Link aria-label={t('agent')} href="/agent">
							{t('agent')}
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage className="capitalize">{agentId}</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
