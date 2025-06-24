'use client';

import React, { startTransition, Suspense, useCallback, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { lazily } from 'react-lazily';

import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/utils/common/misc';
import { useProgressBar } from '@/context/progress-bar';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const { ToggleGroup, ToggleGroupItem } = lazily(() => import('@/components/ui/toggle-group'));
const { ScrollArea } = lazily(() => import('@/components/ui/scroll-area'));
const { Image } = lazily(() => import('@/components/ui/image'));

interface MenuFiltersProps {
	menuFilters: {
		id: string;
		key: string;
		text: string;
		values: {
			id: string;
			icon: string;
			value: string;
			enumString: string;
		}[];
	}[];
}

function MenuFilters(props: MenuFiltersProps) {
	const { menuFilters } = props;

	const t = useTranslations('MenuFilters');
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const progress = useProgressBar();

	const currentSearchParams = useMemo(
		() => (searchParams.get('filter_ids') || '').split(',').filter(Boolean),
		[searchParams],
	);

	const [open, setOpen] = React.useState(false);
	const [filters, setFilters] = React.useState<string[]>(currentSearchParams);

	const handleApplyFilters = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			if (
				filters.length === currentSearchParams.length &&
				filters.every((f) => currentSearchParams.includes(f))
			) {
				return;
			} else {
				setOpen(false);
				progress.start();
				startTransition(() => {
					const params = new URLSearchParams(searchParams);
					if (filters.length > 0) {
						params.set('filter_ids', filters.join(','));
					} else {
						params.delete('filter_ids');
					}
					replace(`${pathname}?${params.toString()}`);
					progress.done();
				});
			}
		},
		[currentSearchParams, filters, pathname, progress, replace, searchParams],
	);

	const handleResetFilters = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			if (filters.length === 0) {
				return;
			} else {
				setFilters([]);
			}
		},
		[filters.length],
	);

	useEffect(() => {
		if (open) {
			setFilters(currentSearchParams);
		} else {
			setFilters([]);
		}
		// Reset filters when the sheet is closed
		return () => {
			if (!open) {
				setFilters([]);
			}
		};
	}, [currentSearchParams, open]);

	return (
		<Sheet
			contentWidth="3xl"
			setShowSheet={setOpen}
			sheetTitle={t('title')}
			showSheet={open}
			classNames={{
				footer: 'shrink-0',
			}}
			sheetFooter={
				<>
					<Button
						wrapIcon
						aria-label="Cancel"
						icon="close-circle-bold"
						classNames={{
							root: 'w-full',
							icon: 'text-red-500',
						}}
						onClick={() => {
							setOpen(false);
						}}
					>
						{t('cancel')}
					</Button>
					<Button
						wrapIcon
						aria-label="Reset Filters"
						icon="refresh-circle-bold"
						isDisabled={filters.length === 0}
						classNames={{
							root: 'w-full',
							icon: 'text-yellow-500',
						}}
						onClick={handleResetFilters}
					>
						{t('reset')}
					</Button>
					<Button
						wrapIcon
						aria-label="Apply Filters"
						icon="check-circle-bold"
						classNames={{
							root: 'w-full',
							icon: 'text-green-500',
						}}
						onClick={handleApplyFilters}
					>
						{t('apply')}
					</Button>
				</>
			}
			trigger={
				<Button wrapIcon icon="filter-bold" size="lg" onClick={() => setOpen(true)}>
					{t('title')}
				</Button>
			}
		>
			<Suspense
				fallback={
					<div className="flex size-full items-center justify-center">
						<Spinner />
					</div>
				}
			>
				<ScrollArea
					className="h-[calc(95dvh-21rem)] w-full sm:h-[calc(100dvh-18rem)]"
					type="scroll"
				>
					<ToggleGroup
						className="flex-col items-start gap-0"
						groupType="separate"
						size="icon"
						type="multiple"
						value={filters}
						variant="outline"
						onValueChange={setFilters}
					>
						<TooltipProvider>
							{menuFilters.map((filter) => (
								<div key={filter.id} className="mb-6 flex flex-col gap-2">
									<p className="not-prose s7">{filter.text}</p>
									<div className="flex flex-wrap items-center gap-2">
										{filter.values.map((value) => (
											<Tooltip key={value.id} delayDuration={0}>
												<ToggleGroupItem
													aria-label={`Toggle ${value.value}`}
													value={value.id}
													className={cn(
														'shrink-0',
														['specialties', 'stats'].includes(filter.key.split('_')[1])
															? 'data-[state=on]:[&>*]:brightness-0'
															: '',
													)}
												>
													<TooltipTrigger asChild className="size-full">
														<Image
															optimizeImg
															alt={value.value}
															height={24}
															radius="none"
															width={24}
															classNames={{
																wrapper: 'size-full flex justify-center items-center',
																img: 'object-cover size-6 aspect-square',
															}}
															src={
																filter.key === 'agent_rarity'
																	? `https://anby.trandk.live/assets/images/${value.enumString}-rank.png`
																	: value.icon
															}
														/>
													</TooltipTrigger>
												</ToggleGroupItem>
												<TooltipContent side="top" sideOffset={15}>
													{value.value}
												</TooltipContent>
											</Tooltip>
										))}
									</div>
								</div>
							))}
						</TooltipProvider>
					</ToggleGroup>
				</ScrollArea>
			</Suspense>
		</Sheet>
	);
}

export default MenuFilters;
