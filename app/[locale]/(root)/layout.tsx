'use client';

import { lazy, Suspense, useCallback } from 'react';
import { useMediaQuery } from '@react-hookz/web';
import { useAnimate } from 'motion/react';

import TransitionRouter from '@/context/transition-router';
import { AppSidebar } from '@/components/layout/app-sidebar';
import BackgroundImage from '@/components/layout/background-image';
import MainContent from '@/components/layout/main-content';
import { TailwindIndicator } from '@/components/features/tailwind-indicator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

import type { TransitionRouterCallback } from '@/context/transition-router';

const BottomNav = lazy(() => import('@/components/layout/bottom-nav'));
const Header = lazy(() => import('@/components/layout/header'));

function RootLayout({
	children,
	breadcrumb,
	modal,
	pageHeader,
}: {
	children: React.ReactNode;
	breadcrumb?: React.ReactNode;
	modal?: React.ReactNode;
	pageHeader?: React.ReactNode;
}) {
	const [wrapperRef, wrapperAnimate] = useAnimate();
	const [pageHeaderRef, pageHeaderAnimate] = useAnimate();
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });

	const enter = useCallback<TransitionRouterCallback>(
		async (animateOptions) => {
			const { animateName, duration } = animateOptions || {};
			if (wrapperRef.current) {
				switch (animateName) {
					case 'none':
						break;
					case 'fade':
						await Promise.all([
							wrapperAnimate(
								wrapperRef.current,
								{ opacity: [0, 1] },
								{ duration: duration || 0.5 },
							),
							pageHeaderAnimate(
								pageHeaderRef.current,
								{ opacity: [0, 1] },
								{ duration: duration || 0.5 },
							),
						]);
						break;
					case 'slide':
						await Promise.all([
							wrapperAnimate(
								wrapperRef.current,
								{ opacity: [0, 1], y: [20, 0] },
								{ duration: duration || 0.5 },
							),
							pageHeaderAnimate(
								pageHeaderRef.current,
								{ opacity: [0, 1], y: [20, 0] },
								{ duration: duration || 0.5 },
							),
						]);
						break;
					default:
						await Promise.all([
							wrapperAnimate(
								wrapperRef.current,
								{ opacity: [0, 1] },
								{ duration: duration || 0.5 },
							),
							pageHeaderAnimate(
								pageHeaderRef.current,
								{ opacity: [0, 1] },
								{ duration: duration || 0.5 },
							),
						]);
						break;
				}
			}
		},
		[wrapperAnimate, wrapperRef, pageHeaderAnimate, pageHeaderRef],
	);

	const leave = useCallback<TransitionRouterCallback>(
		async (animateOptions) => {
			const { animateName, duration } = animateOptions || {};
			if (wrapperRef.current) {
				switch (animateName) {
					case 'none':
						break;
					case 'fade':
						await Promise.all([
							wrapperAnimate(
								wrapperRef.current,
								{ opacity: [1, 0] },
								{ duration: duration || 0.2 },
							),
							pageHeaderAnimate(
								pageHeaderRef.current,
								{ opacity: [1, 0] },
								{ duration: duration || 0.2 },
							),
						]);
						break;
					case 'slide':
						await Promise.all([
							wrapperAnimate(
								wrapperRef.current,
								{ opacity: [1, 0], y: [0, 20] },
								{ duration: duration || 0.2 },
							),
							pageHeaderAnimate(
								pageHeaderRef.current,
								{ opacity: [1, 0], y: [0, 20] },
								{ duration: duration || 0.2 },
							),
						]);
						break;
					default:
						await Promise.all([
							wrapperAnimate(
								wrapperRef.current,
								{ opacity: [1, 0] },
								{ duration: duration || 0.2 },
							),
							pageHeaderAnimate(
								pageHeaderRef.current,
								{ opacity: [1, 0] },
								{ duration: duration || 0.2 },
							),
						]);
						break;
				}
			}
		},
		[wrapperAnimate, wrapperRef, pageHeaderAnimate, pageHeaderRef],
	);

	return (
		<TransitionRouter enter={enter} leave={leave}>
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
							{pageHeader ? (
								<div className="fixed top-0 left-0 z-50 h-14 w-full backdrop-blur-sm">
									<div className="relative flex size-full items-center justify-center px-6">
										<div className="pattern-diagonal-lines pattern-bg-muted pattern-background pattern-opacity-60 pattern-size-2 absolute top-0 left-0 z-[-1] mx-1 mt-1 h-[52px] w-[calc(100%-8px)] rounded-t-md" />
										<div
											ref={pageHeaderRef}
											className="flex size-full max-w-[1920px] items-center justify-between"
										>
											{pageHeader}
										</div>
									</div>
								</div>
							) : null}
							<div ref={wrapperRef} className="size-full max-w-[1920px]">
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
