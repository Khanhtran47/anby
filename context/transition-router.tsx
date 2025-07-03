import { createContext, startTransition, use, useEffect, useState } from 'react';

import type { ReactNode } from 'react';

type TransitionRouterStage = 'entering' | 'leaving' | undefined;

type TransitionRouterStartFunction = (callback: () => void | Promise<void>) => void;

const TransitionRouterContext = createContext<{
	stage: TransitionRouterStage;
	startRouteTransition: TransitionRouterStartFunction;
}>({
	stage: undefined,
	startRouteTransition: () => {},
});

type TransitionRouterCallback = () => Promise<void | VoidFunction>;

type Props = {
	children: ReactNode;
	leave: TransitionRouterCallback;
	enter: TransitionRouterCallback;
};

export function useTransitionRouter() {
	return use(TransitionRouterContext);
}

export default function TransitionRouter({ children, leave, enter }: Props) {
	const [shouldEnter, setShouldEnter] = useState(false);
	const [stage, setStage] = useState<TransitionRouterStage>();

	useEffect(() => {
		if (!shouldEnter) return;

		setStage('entering');
		startTransition(async () => {
			await enter().then((cleanup) => cleanup?.());
			setStage(undefined);
			setShouldEnter(false);
		});
	}, [enter, shouldEnter]);

	const startRouteTransition: TransitionRouterStartFunction = (callback) => {
		if (!stage) {
			setStage('leaving');
		}
		startTransition(async () => {
			if (!shouldEnter) {
				setShouldEnter(true);
			}
			await leave().then((cleanup) => cleanup?.());
			await callback();
		});
	};

	return (
		<TransitionRouterContext.Provider
			value={{
				stage,
				startRouteTransition,
			}}
		>
			{children}
		</TransitionRouterContext.Provider>
	);
}
