'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils/common/misc';
import { ItemCard } from '@/components/ui/card/item-card';
import { Dialog } from '@/components/ui/dialog';

import type { CHS } from '@/services/hakushin/models/drive-disc';

function ListDriveDisc(props: {
	driveDiscs: {
		icon: string | undefined;
		CHS: CHS;
		EN: CHS;
		JA: CHS;
		KO: CHS;
		id: number;
	}[];
	className?: string;
	title?: string;
}) {
	const { driveDiscs, className, title } = props;
	const t = useTranslations('DriveDiscPage');
	const [openDriveDiscDetails, setOpenDriveDiscDetails] = React.useState(false);
	const [selectedDriveDisc, setSelectedDriveDisc] = React.useState<{
		icon: string | undefined;
		CHS: CHS;
		EN: CHS;
		JA: CHS;
		KO: CHS;
		id: number;
	} | null>(null);
	return (
		<section
			className={cn(
				'max-w-screen-4xl mx-auto flex w-full flex-col items-center py-2 pr-4 pl-2',
				className,
			)}
		>
			{title ? <h2 className="w-full px-4 text-left lg:px-6">{title}</h2> : null}
			<div className="relative my-5 grid w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-stretch justify-items-center gap-3 lg:px-10">
				{driveDiscs?.map((item) => (
					<ItemCard
						key={item.id}
						as="button"
						img={item.icon}
						name={item.EN.name}
						rarity={4}
						onClick={() => {
							setOpenDriveDiscDetails(true);
							setSelectedDriveDisc(driveDiscs.find((disc) => disc.id === item.id) || null);
						}}
					/>
				))}
			</div>
			<Dialog
				dialogTitle={selectedDriveDisc?.EN?.name}
				setShowDialog={setOpenDriveDiscDetails}
				showDialog={openDriveDiscDetails}
				dialogFooter={
					<span className="not-prose s9 text-muted-foreground !pb-0 !font-black uppercase">
						{t('title')}
					</span>
				}
			>
				{selectedDriveDisc ? (
					<div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
						{selectedDriveDisc !== null && (
							<ItemCard
								as="div"
								className="aspect-square"
								img={selectedDriveDisc.icon}
								rarity={4}
							/>
						)}
						<div className="text-left">
							<p
								className="text-lg font-bold"
								dangerouslySetInnerHTML={{
									__html: `2-Pc: ${selectedDriveDisc.EN.desc2}`,
								}}
							/>
							<p
								className="text-lg font-bold"
								dangerouslySetInnerHTML={{
									__html: `4-Pc: ${selectedDriveDisc.EN.desc4}`,
								}}
							/>
						</div>
					</div>
				) : null}
			</Dialog>
		</section>
	);
}

export { ListDriveDisc };
