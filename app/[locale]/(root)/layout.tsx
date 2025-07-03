'use client';

import { lazy, Suspense, useRef } from 'react';
import { useMediaQuery } from '@react-hookz/web';
import { animate } from 'motion/react';

import TransitionRouter from '@/context/transition-router';
import { AppSidebar } from '@/components/layout/app-sidebar';
import BackgroundImage from '@/components/layout/background-image';
import MainContent from '@/components/layout/main-content';
import { TailwindIndicator } from '@/components/features/tailwind-indicator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

const BottomNav = lazy(() => import('@/components/layout/bottom-nav'));
const Header = lazy(() => import('@/components/layout/header'));

function RootLayout({
	children,
	breadcrumb,
	modal,
}: {
	children: React.ReactNode;
	breadcrumb?: React.ReactNode;
	modal?: React.ReactNode;
}) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
	return (
		<TransitionRouter
			enter={async () => {
				if (wrapperRef.current) {
					await animate(wrapperRef.current, { opacity: [0, 1] }, { duration: 0.5 });
				}
			}}
			leave={async () => {
				if (wrapperRef.current) {
					await animate(wrapperRef.current, { opacity: [1, 0] }, { duration: 0.2 });
				}
			}}
		>
			<div className="relative flex flex-col py-3">
				<BackgroundImage />
				<TailwindIndicator />
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
						<MainContent>
							<div ref={wrapperRef} className="relative size-full">
								{children}
							</div>
							{modal}
						</MainContent>
					</SidebarInset>
				</SidebarProvider>
			</div>
		</TransitionRouter>
	);
}

export default RootLayout;
