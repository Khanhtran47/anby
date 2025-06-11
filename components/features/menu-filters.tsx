'use client';

import React, { startTransition, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/utils/common/misc';
import { useProgressBar } from '@/context/progress-bar';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Sheet } from '@/components/ui/sheet';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface MenuFiltersProps {
	menuFilters:
		| {
				id: string;
				key: string;
				text: string;
				values: {
					id: string;
					icon: string;
					value: string;
					enumString: string;
				}[];
		  }[]
		| {
				error: string;
		  };
}

function MenuFilters(props: MenuFiltersProps) {
	const { menuFilters } = props;

	const t = useTranslations('MenuFilters');
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const progress = useProgressBar();

	const [open, setOpen] = React.useState(false);
	const [filters, setFilters] = React.useState<string[]>(
		(searchParams.get('filter_ids') || '').split(',').filter(Boolean),
	);

	const handleApplyFilters = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
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
		},
		[filters, pathname, progress, replace, searchParams],
	);

	const handleResetFilters = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			setFilters([]);
			setOpen(false);
			progress.start();
			startTransition(() => {
				const params = new URLSearchParams(searchParams);
				params.delete('filter_ids');
				replace(`${pathname}?${params.toString()}`);
				progress.done();
			});
		},
		[pathname, progress, replace, searchParams],
	);

	if ('error' in menuFilters) {
		return null;
	}
	return (
		<Sheet
			contentWidth="3xl"
			setShowSheet={setOpen}
			sheetTitle={t('title')}
			showSheet={open}
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
			<ToggleGroup
				className="flex-col items-start gap-0"
				groupType="separate"
				size="icon"
				type="multiple"
				value={filters}
				variant="outline"
				onValueChange={setFilters}
			>
				{menuFilters.map((filter) => (
					<div key={filter.id} className="mb-6 flex flex-col gap-2">
						<p className="not-prose s7">{filter.text}</p>
						<div className="flex flex-wrap items-center gap-4">
							{filter.values.map((value) => (
								<ToggleGroupItem
									key={value.id}
									aria-label={`Toggle ${value.value}`}
									className={cn('shrink-0')}
									title={value.value}
									value={value.id}
								>
									<Image
										optimizeImg
										alt={value.value}
										height={24}
										radius="none"
										width={24}
										classNames={{
											wrapper: 'w-6 aspect-square',
											img: 'size-full object-cover',
										}}
										src={
											filter.key === 'agent_rarity'
												? `https://anby.trandk.live/assets/images/${value.enumString}-rank.png`
												: value.icon
										}
									/>
								</ToggleGroupItem>
							))}
						</div>
					</div>
				))}
			</ToggleGroup>
		</Sheet>
	);
}

export default MenuFilters;
