import { cn } from '@/utils/common/misc';
import { BangbooCard, BangbooCardSkeleton } from '@/components/ui/card/bangboo-card';

import { Skeleton } from '../ui/skeleton';

function ListBangboos(props: {
	bangboos: {
		id: number;
		code: string;
		names: {
			id: string;
			name: string;
		}[];
		desc: string;
		icon: string | undefined;
		rarity: number;
	}[];
	className?: string;
	title?: string;
}) {
	const { bangboos, className, title } = props;
	return (
		<section
			className={cn(
				'max-w-screen-4xl mx-auto my-5 flex w-full flex-col items-center py-2 pr-4 pl-2',
				className,
			)}
		>
			{title ? <h2 className="w-full px-4 text-left lg:px-6">{title}</h2> : null}
			<div className="relative grid w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(125px,1fr))] items-stretch justify-items-center gap-3 lg:px-10">
				{bangboos?.map((bangboo) => (
					<BangbooCard
						key={bangboo.id}
						id={bangboo.id}
						img={bangboo.icon}
						name={bangboo.code}
						rarity={bangboo.rarity}
					/>
				))}
			</div>
		</section>
	);
}

function ListBangboosSkeleton(props: { number: number; className?: string }) {
	const { number, className } = props;
	return (
		<section
			className={cn(
				'max-w-screen-4xl mx-auto my-5 flex w-full flex-col items-start py-2 pr-4 pl-2',
				className,
			)}
		>
			<Skeleton className="mt-2 mb-3 ml-4 h-6 w-36 lg:ml-6" />
			<div className="relative grid w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(125px,1fr))] items-stretch justify-items-center gap-3 lg:px-10">
				{Array.from({ length: number }).map((_, index) => (
					<BangbooCardSkeleton key={index} />
				))}
			</div>
		</section>
	);
}

export { ListBangboos, ListBangboosSkeleton };
