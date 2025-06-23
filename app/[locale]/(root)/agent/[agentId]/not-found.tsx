import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/link';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function NotFoundPage() {
	const t = useTranslations('NotFoundPage');

	return (
		<div className="flex size-full min-h-[calc(100svh-7.5rem)] flex-col items-center justify-center sm:min-h-[calc(100svh-5.75rem)]">
			<Image
				alt="Eous Sad GIF"
				height={192}
				src="/assets/gif/eous-sad.gif"
				width={128}
				classNames={{
					wrapper: 'w-32 aspect-[2/3] mb-4',
					img: 'object-cover size-full',
				}}
			/>
			<h1>{t('agentNotFound')}</h1>
			<p>{t('description')}</p>
			<div className="mt-4 flex items-center justify-center gap-4">
				<Button asChild wrapIcon className="h-12" icon="home-bold">
					<Link href="/">{t('home')}</Link>
				</Button>
				<Button asChild wrapIcon className="h-12" icon="arrow-left-bold">
					<Link href="/agent">{t('agents')}</Link>
				</Button>
			</div>
		</div>
	);
}
