import { cn } from '@/utils/common/misc';
import { AgentCard, AgentCardSkeleton } from '@/components/ui/card/agent-card';

import { Skeleton } from '../ui/skeleton';

import type { Skin } from '@/services/hakushin/types';

function ListAgents(props: {
	agents: {
		id: number;
		faction: number;
		rarity: number;
		specialty: number;
		stat: number;
		name: string;
		code: string;
		desc: string;
		img: string | undefined;
		skin: {
			[key: string]: Skin;
		};
		spStat: {
			name: string | undefined;
			icon: string | undefined;
		};
	}[];
	className?: string;
	title?: string;
}) {
	const { agents, className, title } = props;
	return (
		<section
			className={cn(
				'max-w-screen-4xl mx-auto my-5 flex w-full flex-col items-center py-2 pr-4 pl-2',
				className,
			)}
		>
			{title ? <h2 className="w-full px-4 text-left lg:px-6">{title}</h2> : null}
			<div className="relative grid min-h-[300px] w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch justify-items-center lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:px-10">
				{agents?.map((agent) => (
					<AgentCard
						key={agent.id}
						faction={agent.faction}
						id={agent.id}
						img={agent.img}
						name={agent.name}
						rarity={agent.rarity}
						specialty={agent.specialty}
						spStat={agent.spStat}
						stat={agent.stat}
					/>
				))}
			</div>
		</section>
	);
}

function ListAgentsSkeleton(props: { className?: string; number: number }) {
	const { className, number } = props;
	return (
		<section
			className={cn(
				'max-w-screen-4xl mx-auto my-5 flex w-full flex-col items-start py-2 pr-4 pl-2',
				className,
			)}
		>
			<Skeleton className="mt-2 mb-3 ml-4 h-6 w-36 lg:ml-6" />
			<div className="relative grid min-h-[300px] w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch justify-items-center lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:px-10">
				{Array.from({ length: number }).map((_, index) => (
					<AgentCardSkeleton key={index} />
				))}
			</div>
		</section>
	);
}

export { ListAgents, ListAgentsSkeleton };
