'use client';

import { lazy } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils/common/misc';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type {
	AdditionalInformation,
	AgentTalent,
	Ascension,
	BaseInfo,
	CharacterBackground,
	CharacterVoice,
	FilterValue,
	Gallery,
	MindscapeCinema,
	VideoCollection,
} from '@/services/hakushin/models/agent';

const AgentImage = lazy(() => import('./agent-image'));
const Attributes = lazy(() => import('./attributes'));
const GeneralTab = lazy(() => import('./general-tab'));
const SkillsTab = lazy(() => import('./skills-tab'));
const BuildsTab = lazy(() => import('./builds-tab'));

interface AgentDetailProps {
	agentId: string;
	name?: string;
	description?: string;
	img?: string;
	codeName?: string;
	className?: string;
	faction?: FilterValue[];
	attackType?: FilterValue[];
	rarity?: FilterValue;
	specialty?: FilterValue[];
	stat?: FilterValue[];
	baseInfo?: BaseInfo;
	color?: string;
	agentTalent?: AgentTalent;
	ascension?: Ascension;
	mindscapeCinema?: MindscapeCinema;
	gallery?: Gallery;
	videoCollection?: VideoCollection;
	characterBackground?: CharacterBackground;
	characterVoice?: CharacterVoice;
	additionalInformation?: AdditionalInformation;
}

function AgentDetail(props: AgentDetailProps) {
	const {
		// agentId,
		name,
		description,
		img,
		codeName,
		className,
		faction,
		// attackType,
		rarity,
		specialty,
		stat,
		baseInfo,
		agentTalent,
		// ascension,
		// mindscapeCinema,
		// gallery,
		// videoCollection,
		// characterBackground,
		// characterVoice,
		// additionalInformation,
	} = props;

	const t = useTranslations('AgentDetail');

	return (
		<div className={cn('flex w-full flex-col gap-3', className)}>
			<Tabs className="flex w-full flex-col gap-3 sm:flex-row" defaultValue="general">
				<AgentImage img={img} name={name} rarity={rarity} />
				<div className="z-10 w-full gap-3 sm:w-1/2 sm:pb-24">
					<TabsContent forceMount className="mt-0 flex size-full flex-col gap-3" value="general">
						<GeneralTab
							codeName={codeName}
							description={description}
							faction={faction}
							name={name}
							specialty={specialty}
							stat={stat}
						/>
					</TabsContent>
					<TabsContent forceMount className="mt-0 flex size-full flex-col gap-3" value="skills">
						<SkillsTab agentTalent={agentTalent} />
					</TabsContent>
					<TabsContent forceMount className="mt-0 flex size-full flex-col gap-3" value="builds">
						<BuildsTab />
					</TabsContent>

					<TabsList className="sticky right-0 bottom-4 z-20 mt-3 h-16 w-full">
						{['general', 'skills', 'builds'].map((tab) => (
							<TabsTrigger
								key={tab}
								className="s7 h-12 w-1/3 !font-black !tracking-normal italic !text-shadow-none"
								value={tab}
							>
								{t(tab)}
							</TabsTrigger>
						))}
					</TabsList>
				</div>
			</Tabs>
			<Attributes baseInfo={baseInfo} />
		</div>
	);
}

export default AgentDetail;
