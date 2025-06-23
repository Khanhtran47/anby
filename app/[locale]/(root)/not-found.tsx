import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
	const t = useTranslations('NotFoundPage');

	return (
		<div className="flex size-full min-h-[calc(100svh-7.5rem)] flex-col items-center justify-center sm:min-h-[calc(100svh-5.75rem)]">
			<h1>{t('title')}</h1>
			<p>{t('description')}</p>
		</div>
	);
}
