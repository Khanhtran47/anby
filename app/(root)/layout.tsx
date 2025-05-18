'use client';

import { lazy, Suspense } from 'react';
import { useMediaQuery } from '@react-hookz/web';

import { AppSidebar } from '@/components/layout/app-sidebar';
import BackgroundImage from '@/components/layout/background-image';
import MainContent from '@/components/layout/main-content';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

const BottomNav = lazy(() => import('@/components/layout/bottom-nav'));
const Header = lazy(() => import('@/components/layout/header'));

function Layout({
	children,
	breadcrumb,
}: {
	children: React.ReactNode;
	breadcrumb?: React.ReactNode;
}) {
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
	return (
		<div className="relative flex flex-col py-3">
			<BackgroundImage />
			<SidebarProvider className="px-3">
				<AppSidebar />
				<SidebarInset className="h-[calc(100svh-1.5rem)] flex-col-reverse bg-transparent sm:flex-col">
					{isSm ? (
						<Suspense fallback={<Skeleton className="h-20 w-full" />}>
							<BottomNav />
						</Suspense>
					) : isSm === false ? (
						<Suspense fallback={<Skeleton className="h-16 w-full" />}>
							<Header breadcrumb={breadcrumb} />
						</Suspense>
					) : (
						<Skeleton className="h-20 w-full sm:h-16" />
					)}
					<MainContent>{children}</MainContent>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}

export default Layout;
