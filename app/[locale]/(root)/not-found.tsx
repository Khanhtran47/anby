import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
	const t = useTranslations('NotFoundPage');

	return (
		<div className="flex size-full flex-col items-center justify-center">
			<h1>{t('title')}</h1>
			<p>{t('description')}</p>
		</div>
	);
}
