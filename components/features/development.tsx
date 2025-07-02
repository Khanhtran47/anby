'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/link';
import { cn } from '@/utils/common/misc';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

interface DevelopmentProps {
	className?: string;
	classNames?: {
		wrapper?: string;
		imgWrapper?: string;
		img?: string;
	};
}

function Development(props: DevelopmentProps) {
	const { className, classNames } = props;
	const t = useTranslations('Development');

	return (
		<div
			className={cn(
				'flex size-full min-h-[calc(100svh-7.5rem)] flex-col items-center justify-center sm:min-h-[calc(100svh-5.75rem)]',
				className,
				classNames?.wrapper,
			)}
		>
			<Image
				alt="Overtimeboo fight GIF"
				height={192}
				src="/assets/gif/zzz-bangboo.gif"
				width={128}
				classNames={{
					wrapper: cn('mb-4 aspect-square w-56', classNames?.imgWrapper),
					img: cn('size-full object-cover', classNames?.img),
				}}
			/>
			<h1>{t('title')}</h1>
			<p>{t('description')}</p>
			<div className="mt-4 flex items-center justify-center gap-4">
				<Button asChild wrapIcon className="h-12" icon="home-bold">
					<Link href="/">{t('home')}</Link>
				</Button>
			</div>
		</div>
	);
}

export default Development;
