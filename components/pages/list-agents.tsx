'use client';

import { lazy } from 'react';
import { tv } from 'tailwind-variants';

import { cn } from '@/utils/common/misc';
import { AgentCard, AgentCardSkeleton } from '@/components/ui/card/agent-card';

import { Skeleton } from '../ui/skeleton';

import type { Agent } from '@/services/main/models/agent';

const InfiniteScroll = lazy(() => import('@/components/features/infinite-scroll-list'));

const entryList = tv({
	base: 'relative grid min-h-[300px] w-full auto-cols-fr grid-flow-dense grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-stretch justify-items-center lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] lg:px-10',
});

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
			<div className={entryList()}>
				{Array.from({ length: number }).map((_, index) => (
					<AgentCardSkeleton key={index} />
				))}
			</div>
		</section>
	);
}

function ListAgents(props: {
	agents: {
		items: Agent[];
		page: number;
		pageSize: number;
		totalPages: number;
		totalItems: number;
	};
	className?: string;
	title?: string;
	infiniteScroll?: boolean;
}) {
	const { agents, className, title, infiniteScroll = false } = props;
	return (
		<section
			className={cn(
				'max-w-screen-4xl mx-auto my-5 flex w-full flex-col items-center py-2 pr-4 pl-2',
				className,
			)}
		>
			{title ? <h2 className="w-full px-4 text-left lg:px-6">{title}</h2> : null}
			{infiniteScroll ? (
				<InfiniteScroll
					className={entryList()}
					initialItems={agents.items}
					initialPage={1}
					limit={30}
					totalItems={agents.totalItems}
					type="agent"
					renderItem={(item: Agent) => (
						<AgentCard
							key={item.id}
							faction={item.faction}
							id={item.id}
							img={item.img}
							name={item.name}
							rarity={item.rarity}
							specialty={item.specialty}
							spStat={item.spStat}
							stat={item.stat}
						/>
					)}
				/>
			) : (
				<div className={entryList()}>
					{agents.items.map((agent) => (
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
			)}
		</section>
	);
}

export { ListAgents, ListAgentsSkeleton };
