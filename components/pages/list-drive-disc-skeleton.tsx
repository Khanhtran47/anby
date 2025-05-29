import { cn } from '@/utils/common/misc';
import { ItemCardSkeleton } from '@/components/ui/card/item-card';
import { Skeleton } from '@/components/ui/skeleton';

function ListDriveDiscSkeleton(props: { number: number; className?: string }) {
	const { number, className } = props;
	return (
		<section
			className={cn(
				'max-w-screen-4xl mx-auto my-5 flex w-full flex-col items-start py-2 pr-4 pl-2',
				className,
			)}
		>
			<Skeleton className="mt-2 mb-3 ml-4 h-6 w-36 lg:ml-6" />
			<div className="relative my-5 grid w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-stretch justify-items-center gap-3 lg:px-10">
				{Array.from({ length: number }).map((_, index) => (
					<ItemCardSkeleton key={index} />
				))}
			</div>
		</section>
	);
}

export { ListDriveDiscSkeleton };
