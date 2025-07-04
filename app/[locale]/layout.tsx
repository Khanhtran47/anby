import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import type { Locale } from 'next-intl';

import '@/styles/globals.css';
import '@/styles/typography.css';

import { notFound } from 'next/navigation';

import { GlobalImageConfigsProvider } from '@/context/global-image-configs.context';
import { ProgressBar } from '@/context/progress-bar';
import ReactQueryProvider from '@/context/react-query-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
	const { locale } = await props.params;

	const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

	return {
		title: t('title'),
		description: t('description'),
		icons: {
			icon: '/favicon.ico',
		},
	};
}

export default async function LocaleLayout({ children, params }: Readonly<Props>) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<html suppressHydrationWarning dir="ltr" lang={locale}>
			<head>
				<meta charSet="UTF-8" />
				<meta content="width=device-width, initial-scale=1.0" name="viewport" />
				<meta content="#000000" name="theme-color" />
				<meta content="disable darkreader" name="darkreader-lock" />
			</head>
			<body
				className="size-full antialiased"
				style={{
					cursor: "url('/assets/images/cursor-icon.png'), auto",
				}}
			>
				<NextIntlClientProvider>
					<ReactQueryProvider>
						<ThemeProvider disableTransitionOnChange attribute="class" defaultTheme="dark">
							<ProgressBar className="animate-bg-gradient fixed top-0 z-[10000] h-1.5 rounded-r-full">
								<GlobalImageConfigsProvider
									corsProxyEndpoint={process.env.NEXT_PUBLIC_CORS_PROXY}
									optimizeImg={process.env.NEXT_PUBLIC_OPTIMIZE_IMAGES === 'ON'}
									optimizerEndpoint={process.env.NEXT_PUBLIC_OPTIMIZE_IMAGES_ENDPOINT}
									targetFormats={['webp', 'jpg', 'png']}
								>
									{children}
									<Toaster />
									<ReactQueryDevtools initialIsOpen={false} />
								</GlobalImageConfigsProvider>
							</ProgressBar>
						</ThemeProvider>
					</ReactQueryProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
