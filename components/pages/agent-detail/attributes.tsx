import { Fragment } from 'react';

import { cn } from '@/utils/common/misc';
import { AGENTS_MAPPING } from '@/constants/mapping';
import { Box } from '@/components/ui/box';
import { ItemCard } from '@/components/ui/card/item-card';

import type { BaseInfo } from '@/services/main/models/agent';

function Attributes(props: { baseInfo?: BaseInfo }) {
	const { baseInfo } = props;

	const getHref = ({ id, type }: { id: number; type: string }) => {
		if (type === 'agent') {
			const agentId = AGENTS_MAPPING.find((agent) => agent.hoyoId === id.toString());
			if (agentId) {
				return `/agent/${agentId.id}`;
			} else {
				return undefined;
			}
			// TODO: Support for w-engine and bangboo
		} else {
			return undefined;
		}
	};
	return (
		<Box
			fullWidth
			showBgCorner
			showDecorImgs
			className="z-10"
			radius="lg"
			size="lg"
			title={baseInfo?.name}
		>
			<div className="flex flex-col flex-wrap gap-y-3 py-3 sm:flex-row">
				{baseInfo?.data && baseInfo.data.length > 0
					? baseInfo.data.map((item) => (
							<div
								key={item.id}
								className="border-border flex w-full flex-wrap items-center gap-y-3 border-b pb-3 sm:w-1/2"
							>
								<span className="s7 text-muted-foreground w-48 !font-bold whitespace-pre-line">
									{item.key}
								</span>
								{item.value ? (
									item.isMaterial ? (
										item.value.length > 0 ? (
											<div className="flex flex-wrap gap-3">
												{item.value.map((val, index) => (
													<Fragment key={index}>
														{typeof val === 'object' ? (
															val.icon && val.menuId ? (
																<ItemCard
																	addCorsProxy
																	isExternalLink
																	classNames={{ text: 's1' }}
																	direction="col"
																	href={getHref({ id: val.ep_id, type: val.menuId })}
																	img={val.icon}
																	name={val.name}
																	title={val.name}
																	className={cn(
																		'w-24 p-1',
																		val.menuId === 'agent' ? '' : 'cursor-default',
																	)}
																/>
															) : (
																<span>
																	{val.name}
																	{index < (item.value?.length ?? 0) - 1 ? ', ' : ''}
																</span>
															)
														) : null}
													</Fragment>
												))}
											</div>
										) : (
											<span className="text-muted-foreground">-</span>
										)
									) : (
										<div
											dangerouslySetInnerHTML={{
												__html: item.value,
											}}
										/>
									)
								) : null}
							</div>
						))
					: null}
			</div>
		</Box>
	);
}

export default Attributes;
