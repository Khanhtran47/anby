'use client';

import { useMediaQuery } from '@react-hookz/web';

import { Image } from '@/components/ui/image';

import type { FilterValue } from '@/services/hakushin/models/agent';

function AgentImage(props: { name?: string; rarity?: FilterValue; img?: string }) {
	const { name, rarity, img } = props;
	const isLg = useMediaQuery('(max-width: 1024px)', { initializeWithValue: false });

	return (
		<div className="sticky top-0 h-fit w-full lg:w-1/2">
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
			{rarity?.icon && isLg !== undefined ? (
				<Image
					optimizeImg
					alt={rarity?.value}
					height={isLg ? 32 : 64}
					radius="none"
					src={rarity.icon}
					width={isLg ? 32 : 64}
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
