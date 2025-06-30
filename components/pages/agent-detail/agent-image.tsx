'use client';

import { useMediaQuery } from '@react-hookz/web';

import { Image } from '@/components/ui/image';

import type { FilterValue } from '@/services/hakushin/models/agent';

function AgentImage(props: { name?: string; rarity?: FilterValue; img?: string }) {
	const { name, rarity, img } = props;
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });

	return (
		<div className="sticky top-0 h-fit w-full sm:w-1/2">
			<Image
				disableSkeleton
				optimizeImg
				alt={name || 'Agent Image'}
				height={750}
				src={img}
				width={750}
				classNames={{
					wrapper: 'w-full aspect-square relative',
					img: 'size-full object-cover',
				}}
			/>
			{rarity?.icon && isSm !== undefined ? (
				<Image
					optimizeImg
					alt={rarity?.value}
					height={isSm ? 32 : 64}
					radius="none"
					src={rarity.icon}
					width={isSm ? 32 : 64}
					classNames={{
						wrapper: 'size-8 sm:size-16 absolute top-0 left-0 z-10',
						img: 'size-full object-cover',
					}}
				/>
			) : null}
		</div>
	);
}

export default AgentImage;
