import { Fragment, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import type { CharacterBackground } from '@/services/hakushin/models/agent';

function CharacterBackgroundDialog(props: {
	name?: string;
	characterBackground?: CharacterBackground;
}) {
	const { characterBackground, name } = props;
	const { data } = characterBackground || {};
	const t = useTranslations('AgentDetail');
	const [open, setOpen] = useState(false);
	return (
		<Dialog
			contentHeight="full"
			dialogTitle={`${name} - ${characterBackground?.name}`}
			setShowDialog={setOpen}
			showDialog={open}
			classNames={{
				overlay: 'z-[60]',
				content: 'z-[70]',
			}}
			trigger={
				<Button
					className="s6 max-w-full grow !font-black !text-shadow-none sm:max-w-1/2"
					size="lg"
					onClick={() => setOpen(true)}
				>
					{characterBackground?.name}
				</Button>
			}
		>
			<ScrollArea
				className="3xl:h-[calc(100dvh-14rem)] h-[calc(95dvh-11rem)] w-full sm:h-[calc(100dvh-16rem)]"
				type="always"
			>
				{data?.list && data.list.length > 0 ? (
					data.list.map((item, index) => (
						<Fragment key={`${item.title}-${index}`}>
							<h3 className="not-prose s8 !font-black">{item.title}</h3>
							<div
								className="[&>p]:text-muted-foreground mt-2 [&>p]:!text-xl [&>p]:!font-medium [&>p]:has-[span]:mb-8 [&>p>span]:!text-xl [&>p>span]:!font-medium"
								dangerouslySetInnerHTML={{
									__html: item.desc || '',
								}}
							/>
							{index < data.list.length - 1 ? <hr className="border-border my-4 border-t" /> : null}
						</Fragment>
					))
				) : (
					<div className="text-muted-foreground">{t('noCharacterBackground')}</div>
				)}
			</ScrollArea>
		</Dialog>
	);
}

export default CharacterBackgroundDialog;
