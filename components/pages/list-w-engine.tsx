import { cn } from '@/utils/common/misc';
import WEngineCard from '@/components/ui/card/w-engine-card';

function ListWEngines(props: {
	wEngines: {
		id: number;
		code: string;
		names: {
			id: string;
			name: string;
		}[];
		desc: string;
		icon: string | undefined;
		rarity: number;
		specialty: number;
	}[];
	className?: string;
	title?: string;
}) {
	const { wEngines, className, title } = props;
	return (
		<section
			className={cn(
				'max-w-screen-4xl mx-auto my-5 flex w-full flex-col items-center py-2 pr-4 pl-2',
				className,
			)}
		>
			{title ? <h2 className="w-full px-4 text-left lg:px-6">{title}</h2> : null}
			<div className="relative grid w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(125px,1fr))] items-stretch justify-items-center gap-3 lg:px-10">
				{wEngines?.map((wEngine) => (
					<WEngineCard
						key={wEngine.id}
						id={wEngine.id}
						img={wEngine.icon}
						name={wEngine.code}
						rarity={wEngine.rarity}
						specialty={wEngine.specialty}
					/>
				))}
			</div>
		</section>
	);
}

export default ListWEngines;
