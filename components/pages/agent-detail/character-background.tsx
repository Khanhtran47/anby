import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

import { ScrollArea } from '@/components/ui/scroll-area';

import type { CharacterBackground } from '@/services/hakushin/models/agent';

function CharacterBackgroundDialog(props: { characterBackground?: CharacterBackground }) {
	const { characterBackground } = props;
	const { data } = characterBackground || {};
	const t = useTranslations('AgentDetail');
	return (
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
	);
}

export default CharacterBackgroundDialog;
