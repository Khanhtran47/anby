'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			className="toaster group"
			theme={theme as ToasterProps['theme']}
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--background)',
					'--border-radius': 'var(--radius-xl)',
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:!shadow-[inset_0_0_0_4px] group-[.toaster]:!shadow-border group-[.toaster]:!border-2',
				},
			}}
			{...props}
		/>
	);
}

export { Toaster };
