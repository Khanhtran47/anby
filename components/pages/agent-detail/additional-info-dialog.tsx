'use client';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';

import { ScrollArea } from '@/components/ui/scroll-area';

import type { AdditionalInformation } from '@/services/hakushin/models/agent';

function AdditionalInformationDialog(props: { additionalInformation?: AdditionalInformation }) {
	const { additionalInformation } = props;
	const { data } = additionalInformation || {};
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
							className="[&>p]:text-muted-foreground mt-5 [&>p]:!mt-0 [&>p]:!text-xl [&>p]:!font-semibold [&>p]:has-[span]:mb-8 [&>p>span]:!text-xl"
							dangerouslySetInnerHTML={{
								__html: item.desc || '',
							}}
						/>
						{index < data.list!.length - 1 ? <hr className="border-border my-4 border-t" /> : null}
					</Fragment>
				))
			) : (
				<div className="text-muted-foreground">{t('noAdditionalInformation')}</div>
			)}
		</ScrollArea>
	);
}

export default AdditionalInformationDialog;
