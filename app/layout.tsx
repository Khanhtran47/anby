import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { Metadata } from 'next';

import '@/styles/globals.css';

import { GlobalImageConfigsProvider } from '@/context/global-image-configs.context';
import ReactQueryProvider from '@/context/react-query-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
	title: 'Project Anby',
	description: 'Project Anby is a wiki for Zenless Zone Zero game.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning dir="ltr" lang="en">
			<body
				className="size-full antialiased"
				style={{
					cursor: "url('/assets/images/cursor-icon.png'), auto",
				}}
			>
				<ReactQueryProvider>
					<ThemeProvider
						disableTransitionOnChange
						enableSystem
						attribute="class"
						defaultTheme="dark"
					>
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
					</ThemeProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
