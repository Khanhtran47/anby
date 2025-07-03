import { createContext, startTransition, use, useEffect, useState } from 'react';

import type { ReactNode } from 'react';

type TransitionRouterStage = 'entering' | 'leaving' | undefined;

type TransitionRouterStartFunction = (t: {
	animateOptions?: AnimateOptions;
	callback: () => void | Promise<void>;
}) => void;

const TransitionRouterContext = createContext<{
	stage: TransitionRouterStage;
	startRouteTransition: TransitionRouterStartFunction;
}>({
	stage: undefined,
	startRouteTransition: () => {},
});

export type AnimateOptions = {
	animateName?: 'none' | 'fade' | 'slide';
	duration?: number;
};

export type TransitionRouterCallback = (t?: AnimateOptions) => Promise<void | VoidFunction>;

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
	const [animateOptions, setAnimateOptions] = useState<AnimateOptions | undefined>();

	useEffect(() => {
		if (!shouldEnter) return;

		setStage('entering');
		startTransition(async () => {
			await enter(animateOptions).then((cleanup) => cleanup?.());
			setStage(undefined);
			setShouldEnter(false);
			setAnimateOptions(undefined);
		});
		// eslint-disable-next-line react-hooks/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enter, shouldEnter]);

	const startRouteTransition: TransitionRouterStartFunction = ({ animateOptions, callback }) => {
		if (!stage) {
			setStage('leaving');
		}
		startTransition(async () => {
			if (!shouldEnter) {
				setShouldEnter(true);
				setAnimateOptions(animateOptions);
			}
			await leave(animateOptions).then((cleanup) => cleanup?.());
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
