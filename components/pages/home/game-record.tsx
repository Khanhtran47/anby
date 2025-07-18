'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/link';
import { useHoyolabAccount } from '@/utils/react/hooks/use-hoyolab-account';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import GameRecordBox from './game-record-box';

function GameRecord() {
	const t = useTranslations('HomePage');
	const { defaultAccount, accounts } = useHoyolabAccount();

	return (
		<Box
			fullWidth
			showBgCorner
			className="items-start gap-4"
			radius="md"
			size="lg"
			title={t('gameRecord')}
		>
			{accounts.length > 0 ? (
				!defaultAccount ? (
					<>
						<span className="s4">{t('noDefaultAccount')}</span>
						<Button asChild wrapIcon icon="settings-bold">
							<Link className="text-primary hover:underline" href="/settings?hoyolab-settings=open">
								{t('accountSettings')}
							</Link>
						</Button>
					</>
				) : (
					<GameRecordBox defaultAccount={defaultAccount} />
				)
			) : (
				<div className="flex w-full justify-center">
					<Spinner />
				</div>
			)}
		</Box>
	);
}

export default GameRecord;
