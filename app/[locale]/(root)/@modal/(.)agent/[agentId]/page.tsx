import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { AGENTS_MAPPING } from '@/constants/mapping';
import ModalRoute from '@/components/features/modal-route';
import { DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

const AgentDetailContent = React.lazy(() => import('./content'));
const AgentDetailHeader = React.lazy(() => import('./header'));

type Props = {
	params: Promise<{ agentId: string }>;
};

async function AgentDetailModalPage({ params }: Props) {
	const [{ agentId }, t] = await Promise.all([params, getTranslations('NotFoundPage')]);
	const isAgentIdExists = AGENTS_MAPPING.some((agent) => agent.id === Number(agentId));
	return (
		<ModalRoute
			contentHeight={isAgentIdExists ? 'full' : 'fit'}
			contentWidth={isAgentIdExists ? '8xl' : 'fit'}
			dialogDescription={isAgentIdExists ? '' : t('description')}
			dialogTitle={isAgentIdExists ? '' : t('agentNotFound')}
			classNames={{
				header: isAgentIdExists ? 'flex flex-row items-center gap-2 py-2' : '',
			}}
			dialogHeader={
				isAgentIdExists ? (
					<Suspense
						fallback={
							<Skeleton className="h-16 w-56">
								<DialogTitle className="sr-only">Loading...</DialogTitle>
							</Skeleton>
						}
					>
						<AgentDetailHeader agentId={agentId} isAgentIdExists={isAgentIdExists} />
					</Suspense>
				) : null
			}
			notFound={
				!isAgentIdExists
					? {
							state: true,
							showImage: true,
							showBackToHome: true,
							backLink: '/agent',
						}
					: undefined
			}
		>
			<Suspense
				fallback={
					<div className="flex size-full items-center justify-center">
						<Spinner size="lg" />
					</div>
				}
			>
				<AgentDetailContent agentId={agentId} isAgentIdExists={isAgentIdExists} />
			</Suspense>
		</ModalRoute>
	);
}

export default AgentDetailModalPage;
