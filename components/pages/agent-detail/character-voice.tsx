'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import useSound from 'use-sound';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import type { CharacterVoice } from '@/services/main/models/agent';

// AudioManager to control global audio playback
class AudioManager {
	static currentStop: (() => void) | null = null;

	static register(stopFn: () => void) {
		if (AudioManager.currentStop && AudioManager.currentStop !== stopFn) {
			AudioManager.currentStop();
		}
		AudioManager.currentStop = stopFn;
	}

	static unregister(stopFn: () => void) {
		if (AudioManager.currentStop === stopFn) {
			AudioManager.currentStop = null;
		}
	}
}

function PlayVoice({ url }: { url: string }) {
	const [timeLeft, setTimeLeft] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [isEnded, setIsEnded] = useState<boolean>(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const [play, { stop, pause, duration }] = useSound(url, {
		onend: () => {
			setIsRunning(false);
			setTimeLeft(duration || 0);
			setIsEnded(true);
		},
	});

	const handleStop = useCallback(() => {
		stop();
		setIsRunning(false);
		setTimeLeft(duration || 0);
	}, [stop, duration]);

	const handlePlay = useCallback(() => {
		AudioManager.register(handleStop); // Pause/stop other audio
		if (timeLeft > 0) {
			play();
			setIsRunning(true);
		} else {
			setTimeLeft(duration || 0);
			play();
			setIsRunning(true);
		}
		// eslint-disable-next-line react-hooks/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeLeft, play, duration]);

	const handlePause = useCallback(() => {
		pause();
		setIsRunning(false);
	}, [pause]);

	// Register/unregister stop function with AudioManager
	useEffect(() => {
		if (isRunning) {
			AudioManager.register(handleStop);
		}
		return () => {
			AudioManager.unregister(handleStop);
		};
		// eslint-disable-next-line react-hooks/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRunning]);

	useEffect(() => {
		if (duration) {
			setTimeLeft(duration);
		} else {
			setTimeLeft(0);
		}
	}, [duration]);

	useEffect(() => {
		if (isEnded) {
			setIsRunning(false);
			setTimeLeft(duration || 0);
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		}
	}, [duration, isEnded]);

	useEffect(() => {
		if (isRunning && timeLeft > 0) {
			timerRef.current = setInterval(() => {
				setTimeLeft((prev) => prev - 1000);
			}, 1000);
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [isRunning, timeLeft]);

	useEffect(() => {
		if (timeLeft === 0) {
			setIsRunning(false);
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		}
	}, [timeLeft]);

	return (
		<div className="flex items-center justify-between gap-4">
			<div className="flex items-center gap-2">
				<Button
					aria-label={isRunning ? 'Pause Voice' : 'Play Voice'}
					className="px-4 py-2"
					icon={isRunning ? 'pause-bold' : 'play-bold'}
					size="icon"
					type="button"
					onClick={() => {
						if (isRunning) {
							handlePause();
						} else {
							handlePlay();
						}
					}}
				/>
				<Button
					aria-label="Stop Voice"
					className="px-4 py-2"
					icon="stop-bold"
					size="icon"
					type="button"
					onClick={handleStop}
				/>
			</div>
			<span className="text-muted-foreground not-prose s6 !font-black">
				{' '}
				{`${String(Math.floor(timeLeft / 1000 / 60)).padStart(2, '0')}:${String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')}`}
			</span>
		</div>
	);
}

function CharacterVoiceDialog(props: { characterVoice?: CharacterVoice }) {
	const { characterVoice } = props;
	const { data } = characterVoice || {};
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
						{item?.audios && item.audios.length > 0 ? (
							<div className="mt-4 flex w-full flex-col gap-2">
								{item.audios.map((audio, audioIndex) =>
									audio?.url ? (
										<PlayVoice key={`${item.title}-${audioIndex}`} url={audio.url} />
									) : null,
								)}
							</div>
						) : null}
						{index < data.list.length - 1 ? <hr className="border-border my-4 border-t" /> : null}
					</Fragment>
				))
			) : (
				<div className="text-muted-foreground">{t('noCharacterVoice')}</div>
			)}
		</ScrollArea>
	);
}

export default CharacterVoiceDialog;
