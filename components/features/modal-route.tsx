'use client';

import React from 'react';
import { useMediaQuery } from '@react-hookz/web';
import { useTranslations } from 'next-intl';
import { lazily } from 'react-lazily';

import { useRouter } from '@/i18n/navigation';
import { Dialog } from '@/components/ui/dialog';

import type { DialogProps } from '@/components/ui/dialog';

const { Image } = lazily(() => import('@/components/ui/image'));
const { Button } = lazily(() => import('@/components/ui/button'));
const { Link } = lazily(() => import('@/i18n/link'));

interface ModalRouteProps extends Omit<DialogProps, 'showDialog' | 'setShowDialog'> {
	notFound?: {
		state: boolean;
		showImage?: boolean;
		showBackToHome?: boolean;
		backLink?: string;
	};
	development?: boolean;
}

function ModalRoute(props: ModalRouteProps) {
	const {
		children,
		contentHeight = 'full',
		contentWidth = '5xl',
		onClose,
		notFound,
		development,
		...rest
	} = props;
	const isSm = useMediaQuery('(max-width: 650px)', { initializeWithValue: false });
	const [showDialog, setShowDialog] = React.useState(true);
	const router = useRouter();
	const tnf = useTranslations('NotFoundPage');
	const td = useTranslations('Development');
	return (
		<Dialog
			contentHeight={notFound?.state ? 'fit' : contentHeight}
			contentWidth={notFound?.state ? 'fit' : contentWidth}
			hideTitle={isSm}
			setShowDialog={setShowDialog}
			showDialog={showDialog}
			onClose={() => {
				router.back();
				if (onClose) {
					onClose();
				}
			}}
			{...rest}
		>
			{development ? (
				<div className="flex size-full flex-col items-center justify-center">
					<Image
						alt="Overtimeboo fight GIF"
						height={192}
						src="/assets/gif/zzz-bangboo.gif"
						width={128}
						classNames={{
							wrapper: 'mb-4 aspect-square w-56',
							img: 'size-full object-cover',
						}}
					/>
					<h1>{td('title')}</h1>
					<p>{td('description')}</p>
					<div className="mt-4 flex items-center justify-center gap-4">
						<Button asChild wrapIcon className="h-12" icon="home-bold">
							<Link href="/" onClick={() => setShowDialog(false)}>
								{td('home')}
							</Link>
						</Button>
					</div>
				</div>
			) : notFound?.state ? (
				<div className="flex size-full flex-col items-center justify-center">
					{notFound?.showImage ? (
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
					) : null}
					<div className="mt-4 flex items-center justify-center gap-4">
						{notFound?.showBackToHome ? (
							<Button asChild wrapIcon className="h-12" icon="home-bold">
								<Link href="/" onClick={() => setShowDialog(false)}>
									{tnf('home')}
								</Link>
							</Button>
						) : null}
						{notFound?.backLink ? (
							<Button asChild wrapIcon className="h-12" icon="arrow-left-bold">
								<Link href={notFound?.backLink} onClick={() => setShowDialog(false)}>
									{tnf('back')}
								</Link>
							</Button>
						) : (
							<Button
								wrapIcon
								icon="arrow-left-bold"
								size="lg"
								onClick={() => {
									router.back();
									setShowDialog(false);
								}}
							>
								{tnf('back')}
							</Button>
						)}
					</div>
				</div>
			) : (
				children
			)}
		</Dialog>
	);
}

export default ModalRoute;
