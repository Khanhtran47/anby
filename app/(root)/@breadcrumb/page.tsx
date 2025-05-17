import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Icon } from '@/components/ui/icon';

export default function BreadcrumbSlot() {
	return (
		<Breadcrumb showBgPattern showHomeIcon className="pr-0">
			<BreadcrumbList>
				<BreadcrumbItem showHomeIcon>
					<BreadcrumbPage>
						<Icon name="home-bold" size="md" />
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
