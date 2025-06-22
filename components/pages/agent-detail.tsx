import { cn } from '@/utils/common/misc';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';

interface AgentDetailProps {
	agentId: string;
	name?: string;
	description?: string;
	img?: string;
	codeName?: string;
	className?: string;
}

function AgentDetail(props: AgentDetailProps) {
	const {
		// agentId,
		name,
		description,
		img,
		codeName,
		className,
	} = props;
	return (
		<div className={cn('w-full', className)}>
			<div className="flex w-full flex-col gap-4 sm:flex-row">
				<div className="stick top-0 w-full sm:w-1/2">
					<Image
						optimizeImg
						alt={name || 'Agent Image'}
						height={750}
						src={img}
						width={750}
						classNames={{
							wrapper: 'w-full aspect-square',
							img: 'size-full object-cover',
						}}
					/>
				</div>
				<div className="z-10 flex w-full flex-col gap-3 sm:w-1/2">
					<Box fullWidth className="items-start" radius="lg" showDecorImgs={false} size="sm">
						<span className="not-prose s4 text-primary-foreground ml-4 !font-black sm:ml-6">
							AGENT INFO
						</span>
						<div className="bg-background relative mt-1 flex w-full rounded-sm px-4 py-4 sm:px-6">
							<div className="flex flex-col">
								<h1>{name}</h1>
								{codeName ? (
									<span className="text-muted-foreground not-prose s6 !tracking-widest">
										{codeName}
									</span>
								) : null}
							</div>
						</div>
					</Box>
					{description ? (
						<Box fullWidth showBgCorner radius="lg" showDecorImgs={false}>
							<div
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							/>
						</Box>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default AgentDetail;
