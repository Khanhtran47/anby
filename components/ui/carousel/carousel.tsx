'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '@/utils/common/misc';
import { Button } from '@/components/ui/button';

import type { UseEmblaCarouselType } from 'embla-carousel-react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	mainOptions?: CarouselOptions;
	thumbsOptions?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: 'horizontal' | 'vertical';
	setEmblaMainApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	thumbsRef: ReturnType<typeof useEmblaCarousel>[0];
	emblaMainApi: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	activeIndex: number;
	onThumbClick: (index: number) => void;
	orientation: 'horizontal' | 'vertical';
	handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />');
	}

	return context;
}

const Carousel = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
	(
		{
			orientation = 'horizontal',
			mainOptions,
			thumbsOptions,
			setEmblaMainApi,
			plugins,
			className,
			children,
			...props
		},
		ref,
	) => {
		const [carouselRef, emblaMainApi] = useEmblaCarousel(
			{
				...mainOptions,
				axis: orientation === 'horizontal' ? 'x' : 'y',
			},
			plugins,
		);

		const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
			{
				...thumbsOptions,
				axis: orientation === 'horizontal' ? 'x' : 'y',
				containScroll: 'keepSnaps',
				dragFree: true,
			},
			plugins,
		);

		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);
		const [activeIndex, setActiveIndex] = React.useState(0);

		const scrollPrev = React.useCallback(() => {
			emblaMainApi?.scrollPrev();
		}, [emblaMainApi]);

		const scrollNext = React.useCallback(() => {
			emblaMainApi?.scrollNext();
		}, [emblaMainApi]);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === 'ArrowRight') {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext],
		);

		const onThumbClick = React.useCallback(
			(index: number) => {
				if (!emblaMainApi || !emblaThumbsApi) return;
				emblaMainApi.scrollTo(index);
			},
			[emblaMainApi, emblaThumbsApi],
		);

		const onSelect = React.useCallback(() => {
			if (!emblaMainApi) {
				return;
			}

			if (emblaThumbsApi) {
				const selected = emblaMainApi.selectedScrollSnap();
				setActiveIndex(selected);
				emblaThumbsApi.scrollTo(selected);
			}
			setCanScrollPrev(emblaMainApi.canScrollPrev());
			setCanScrollNext(emblaMainApi.canScrollNext());
		}, [emblaMainApi, emblaThumbsApi]);

		React.useEffect(() => {
			if (!emblaMainApi || !setEmblaMainApi) {
				return;
			}
			setEmblaMainApi(emblaMainApi);
		}, [emblaMainApi, setEmblaMainApi]);

		React.useEffect(() => {
			if (!emblaMainApi) {
				return;
			}

			onSelect();
			emblaMainApi.on('reInit', onSelect);
			emblaMainApi.on('select', onSelect);

			return () => {
				emblaMainApi?.off('select', onSelect);
			};
		}, [emblaMainApi, onSelect]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					emblaMainApi,
					mainOptions,
					thumbsOptions,
					orientation: orientation || (mainOptions?.axis === 'y' ? 'vertical' : 'horizontal'),
					scrollPrev,
					scrollNext,
					canScrollPrev,
					canScrollNext,
					activeIndex,
					handleKeyDown,
					onThumbClick,
					thumbsRef: emblaThumbsRef,
				}}
			>
				<div
					ref={ref}
					aria-roledescription="carousel"
					className={cn('relative grid w-full gap-2 focus:outline-none', className)}
					role="button"
					tabIndex={0}
					onKeyDownCapture={handleKeyDown}
					{...props}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		);
	},
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		classNames?: {
			wrapper?: string;
			content?: string;
		};
	}
>(({ className, classNames, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div ref={carouselRef} className={cn('overflow-hidden', classNames?.wrapper)}>
			<div
				ref={ref}
				className={cn(
					'flex',
					orientation === 'horizontal' ? '' : 'flex-col',
					className,
					classNames?.content,
				)}
				{...props}
			/>
		</div>
	);
});
CarouselContent.displayName = 'CarouselContent';

const CarouselThumbContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {}
>(({ className, children, ...props }, ref) => {
	const { thumbsRef, orientation } = useCarousel();
	return (
		<div ref={thumbsRef} className="overflow-hidden" {...props}>
			<div
				ref={ref}
				className={cn('flex items-end', orientation === 'horizontal' ? '' : 'flex-col', className)}
			>
				{children}
			</div>
		</div>
	);
});
CarouselThumbContent.displayName = 'CarouselThumbContent';

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const { orientation } = useCarousel();

		return (
			<div
				ref={ref}
				aria-roledescription="slide"
				role="group"
				className={cn(
					'min-w-0 shrink-0 grow-0 basis-full',
					orientation === 'horizontal' ? 'pl-4' : 'pt-4',
					className,
				)}
				{...props}
			/>
		);
	},
);
CarouselItem.displayName = 'CarouselItem';

const CarouselThumbItem = React.forwardRef<
	HTMLDivElement,
	{
		index: number;
	} & React.HTMLAttributes<HTMLDivElement>
>(({ className, index, children, ...props }, ref) => {
	const { activeIndex, onThumbClick, orientation } = useCarousel();
	const isSlideActive = activeIndex === index;
	return (
		<div
			{...props}
			ref={ref}
			aria-pressed={isSlideActive}
			role="button"
			tabIndex={0}
			className={cn(
				'bg-background flex min-w-0 shrink-0 grow-0 basis-1/3',
				`${orientation === 'vertical' ? 'pt-4' : 'pl-4'}`,
				className,
			)}
			onClick={() => onThumbClick(index)}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onThumbClick(index);
				}
			}}
		>
			<div
				className={`relative aspect-square w-full rounded-md opacity-50 transition-opacity ${
					isSlideActive ? '!opacity-100' : ''
				}`}
			>
				{children}
			</div>
		</div>
	);
});
CarouselThumbItem.displayName = 'CarouselThumbItem';

const CarouselIndicator = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button> & { index: number; showNumber?: boolean }
>(({ className, index, showNumber = true, ...props }, ref) => {
	const { activeIndex, onThumbClick } = useCarousel();
	const isSlideActive = activeIndex === index;
	return (
		<Button
			ref={ref}
			data-active={isSlideActive}
			variant="ghost"
			className={cn(
				'size-6 rounded-full px-0 py-1',
				'data-[active=false]:bg-primary/60 data-[active=true]:animate-bg-gradient data-[active=true]:hover:animate-bg-gradient hover:w-12 data-[active=true]:w-12',
				className,
			)}
			onClick={() => onThumbClick(index)}
			{...props}
		>
			{showNumber ? (
				<span className="text-primary-foreground not-prose s4">{index + 1}</span>
			) : (
				<span className="sr-only">Slide {index + 1}</span>
			)}
		</Button>
	);
});
CarouselIndicator.displayName = 'CarouselIndicator';

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
	({ className, variant, size = 'icon', icon = 'arrow-left-bold', ...props }, ref) => {
		const { orientation, scrollPrev, canScrollPrev } = useCarousel();

		return (
			<Button
				ref={ref}
				icon={icon}
				isDisabled={!canScrollPrev}
				showBgPattern={false}
				size={size}
				variant={variant}
				className={cn(
					'absolute z-10 size-10 rounded-full select-none',
					orientation === 'horizontal'
						? 'top-1/2 -left-2 -translate-y-1/2'
						: '-top-2 left-1/2 -translate-x-1/2 rotate-90',
					className,
				)}
				onClick={scrollPrev}
				{...props}
			>
				<span className="sr-only">Previous slide</span>
			</Button>
		);
	},
);
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
	({ className, variant, size = 'icon', icon = 'arrow-right-bold', ...props }, ref) => {
		const { orientation, scrollNext, canScrollNext } = useCarousel();

		return (
			<Button
				ref={ref}
				icon={icon}
				isDisabled={!canScrollNext}
				showBgPattern={false}
				size={size}
				variant={variant}
				className={cn(
					'absolute z-10 size-10 rounded-full select-none',
					orientation === 'horizontal'
						? 'top-1/2 -right-6 -translate-y-1/2'
						: '-bottom-6 left-1/2 -translate-x-1/2 rotate-90',
					className,
				)}
				onClick={scrollNext}
				{...props}
			>
				<span className="sr-only">Next slide</span>
			</Button>
		);
	},
);
CarouselNext.displayName = 'CarouselNext';

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	CarouselIndicator,
	CarouselThumbContent,
	CarouselThumbItem,
};
