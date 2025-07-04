'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { cn } from '@/utils/common/misc';
import { useHydrated } from '@/utils/react/hooks/use-hydrated';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';

function ThemeToggle({
	showValue = false,
	classNames,
}: {
	showValue?: boolean;
	classNames?: {
		trigger?: string;
		content?: string;
		item?: string;
	};
}) {
	const isHydrated = useHydrated();
	const { setTheme, theme: currentTheme } = useTheme();
	const t = useTranslations('ThemeToggle');
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					aria-label="Toggle theme"
					className={cn(showValue ? 'rounded-sm' : 'rounded-full', classNames?.trigger)}
					size={showValue ? 'lg' : 'icon'}
				>
					{currentTheme === 'light' ? (
						<Icon name="sun-bold" size="md" />
					) : (
						<Icon name="moon-bold" size="md" />
					)}
					{showValue ? (
						currentTheme && isHydrated ? (
							<span className="not-prose s6 !font-bold italic">{t(currentTheme)}</span>
						) : null
					) : (
						<span className="sr-only">Toggle theme</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className={classNames?.content}>
				{['light', 'dark'].map((theme) => (
					<DropdownMenuItem
						key={theme}
						active={theme === currentTheme}
						className={classNames?.item}
						onClick={() => setTheme(theme)}
					>
						{theme === 'light' ? (
							<Icon name="sun-bold" size="md" />
						) : (
							<Icon name="moon-bold" size="md" />
						)}
						{t(theme)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default ThemeToggle;
