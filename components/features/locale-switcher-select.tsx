'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function LocaleSwitcherSelect() {
	const t = useTranslations('LocaleSwitcher');
	const locale = useLocale();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const params = useParams();

	return (
		<Select
			defaultValue={locale}
			disabled={isPending}
			onValueChange={(value) => {
				startTransition(() => {
					// @ts-expect-error -- TypeScript will validate that only known `params`
					// are used in combination with a given `pathname`. Since the two will
					// always match for the current route, we can skip runtime checks.
					router.replace({ pathname, params }, { locale: value });
				});
			}}
		>
			<SelectTrigger className="w-[160px]">
				<SelectValue aria-label={t('selectLanguage')} placeholder={t('selectLanguage')} />
			</SelectTrigger>
			<SelectContent side="bottom">
				{routing.locales.map((l) => (
					<SelectItem key={l} value={l}>
						{t(l)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
