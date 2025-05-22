'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

type Props = {
	error: Error;
	reset(): void;
};

export default function Error({ error, reset }: Props) {
	const t = useTranslations('Error');

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex size-full flex-col items-center justify-center">
			<h1>{t('title')}</h1>
			{t.rich('description', {
				p: (chunks) => <p className="mt-4">{chunks}</p>,
				retry: (chunks) => (
					<Button className="text-white underline underline-offset-2" type="button" onClick={reset}>
						{chunks}
					</Button>
				),
			})}
		</div>
	);
}
