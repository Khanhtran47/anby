import { cn } from '@/utils/common/misc';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';

interface AgentDetailProps {
	agentId: string;
	name?: string;
	description?: string;
	img?: string;
	icon?: string;
	className?: string;
}

function AgentDetail(props: AgentDetailProps) {
	const {
		// agentId,
		name,
		description,
		img,
		// icon,
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
					{description ? (
						<Box fullWidth showBgCorner showBgPattern={false}>
							<div
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							/>
						</Box>
					) : null}
				</div>
				<div className="w-full sm:w-1/2">
					<Box
						fullWidth
						className="items-start"
						showBgPattern={false}
						showDecorImgs={false}
						size="sm"
					>
						<span className="not-prose s4 text-primary-foreground ml-6 !font-black">
							AGENT INFO
						</span>
						<div className="bg-background relative mt-1 flex w-full rounded-xl px-6 py-4">
							<div className="flex flex-col">
								<h1>{name}</h1>
							</div>
						</div>
					</Box>
				</div>
			</div>
		</div>
	);
}

export default AgentDetail;
