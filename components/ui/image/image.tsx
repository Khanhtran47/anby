/* eslint-disable react-hooks/react-compiler */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useContext, useMemo, useState, version } from 'react';
import { tv } from 'tailwind-variants';

import { GlobalImageConfigs } from '@/context/global-image-configs.context';

import type { TargetFormat } from '@/context/global-image-configs.context';
import type { Ref } from 'react';
import type { VariantProps } from 'tailwind-variants';

const image = tv({
	slots: {
		wrapper: 'relative block',
		img: 'relative z-10',
	},
	variants: {
		radius: {
			none: {},
			sm: {},
			md: {},
			lg: {},
			xl: {},
			'2xl': {},
			'3xl': {},
			'4xl': {},
			full: {},
		},
		shadow: {
			none: {
				wrapper: 'shadow-none',
				img: 'shadow-none',
			},
			'2xs': {
				wrapper: 'shadow-2xs',
				img: 'shadow-2xs',
			},
			xs: {
				wrapper: 'shadow-xs',
				img: 'shadow-xs',
			},
			sm: {
				wrapper: 'shadow-sm',
				img: 'shadow-sm',
			},
			md: {
				wrapper: 'shadow-md',
				img: 'shadow-md',
			},
			lg: {
				wrapper: 'shadow-lg',
				img: 'shadow-lg',
			},
			xl: {
				wrapper: 'shadow-xl',
				img: 'shadow-xl',
			},
			'2xl': {
				wrapper: 'shadow-2xl',
				img: 'shadow-2xl',
			},
		},
		isZoomed: {
			true: {
				wrapper: ['relative', 'overflow-hidden'],
				img: ['object-cover', 'transform', 'hover:scale-[1.15]'],
			},
		},
		showSkeleton: {
			true: {
				wrapper: ['group', 'relative', 'overflow-hidden', 'bg-content3 dark:bg-content2'],
				img: 'opacity-0 data-[loaded=true]:opacity-100',
			},
		},
		showPlaceholder: {
			true: {
				img: 'opacity-50 data-[loaded=true]:opacity-100',
			},
		},
		disableAnimations: {
			true: {
				img: 'transition-none',
			},
			false: {
				img: '!duration-300 transition-transform-opacity motion-reduce:transition-none',
			},
		},
	},
	defaultVariants: {
		radius: 'lg',
		shadow: 'none',
		isZoomed: false,
		showSkeleton: false,
		showPlaceholder: false,
		disableAnimations: false,
	},
	compoundVariants: [
		{
			showSkeleton: true,
			disableAnimations: false,
			class: {
				wrapper: [
					// before
					'before:opacity-100',
					'before:absolute',
					'before:inset-0',
					'before:-translate-x-full',
					'before:animate-[shimmer_2s_infinite]',
					'before:border-t',
					'before:border-slate-300/30',
					'before:bg-gradient-to-r',
					'before:from-transparent',
					'before:via-slate-300',
					'dark:before:via-slate-700',
					'before:to-transparent',
				],
			},
		},
		{
			showSkeleton: true,
			disableAnimations: false,
			showPlaceholder: false,
			class: {
				wrapper: [
					//after
					'after:opacity-100',
					'after:absolute',
					'after:inset-0',
					'after:-z-10',
					'after:bg-slate-200',
					'dark:after:bg-slate-800',
				],
			},
		},
	],
	compoundSlots: [
		{
			slots: ['wrapper', 'img'],
			radius: 'none',
			class: 'rounded-none',
		},
		{
			slots: ['wrapper', 'img'],
			radius: 'full',
			class: 'rounded-full',
		},
		{
			slots: ['wrapper', 'img'],
			radius: 'sm',
			class: 'rounded-sm',
		},
		{
			slots: ['wrapper', 'img'],
			radius: 'md',
			class: 'rounded-md',
		},
		{
			slots: ['wrapper', 'img'],
			radius: 'lg',
			class: 'rounded-lg',
		},
		{
			slots: ['wrapper', 'img'],
			radius: 'xl',
			class: 'rounded-xl',
		},
		{
			slots: ['wrapper', 'img'],
			radius: '2xl',
			class: 'rounded-2xl',
		},
		{
			slots: ['wrapper', 'img'],
			radius: '3xl',
			class: 'rounded-3xl',
		},
		{
			slots: ['wrapper', 'img'],
			radius: '4xl',
			class: 'rounded-4xl',
		},
	],
});

export type ImageVariantProps = Omit<VariantProps<typeof image>, 'showSkeleton'>;
export type ImageSlots = keyof ReturnType<typeof image>;

type ImgElementWithDataProp = HTMLImageElement & {
	'data-loaded-src': string | undefined;
	'data-loaded': boolean;
};

type OnLoadingComplete = (result: { naturalWidth: number; naturalHeight: number }) => void;

/**
 * - width: the intrinsic width of the image in pixels; used to calculate the aspect ratio. Provide alternate width and height to change the aspect ratio.
 * - height: the intrinsic height of the image in pixels; used to calculate the aspect ratio. Provide alternate width and height to change the aspect ratio.
 * - isAboveFold: whether the image is above the fold or not, affects what default optimization settings are used
 * - placeholder: url of a low quality image to use as a placeholder until the full image loads
 * - optimizeImg: whether to optimize the image or not
 * - classNames: class names for the wrapper and img elements
 * - onLoaded: callback function to be called when the image is loaded
 * - optimizerEndpoint: the endpoint to use for image optimization
 * - disableSkeleton: whether to disable the skeleton loading effect or not
 */
export type ImageProps = Omit<
	React.ImgHTMLAttributes<HTMLImageElement>,
	'width' | 'height' | 'src'
> &
	ImageVariantProps & {
		width?: number | string;
		height?: number | string;
		isAboveFold?: boolean;
		placeholder?: string;
		optimizeImg?: boolean;
		classNames?: {
			wrapper?: string;
			img?: string;
		};
		onLoaded?: () => void;
		optimizerEndpoint?: string;
		disableSkeleton?: boolean;
		src?: string | null;
		fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
		position?:
			| 'center'
			| 'top'
			| 'right'
			| 'bottom'
			| 'left'
			| 'top-right'
			| 'top-left'
			| 'bottom-right'
			| 'bottom-left';
		cacheControl?: string;
		background?: string;
		addCorsProxy?: boolean;
		ref?: Ref<HTMLImageElement>;
		showSkeleton?: boolean;
	};

/**
 * Image component
 * @param {ImageProps} props - The props for the image, including HTMLImageElement attributes
 * @param {string} props.src - The URL of the image to display
 * @param {number|string} props.width - The intrinsic width of the image in pixels; used to calculate the aspect ratio. Provide alternate width and height to change the aspect ratio.
 * @param {number|string} props.height - The intrinsic height of the image in pixels; used to calculate the aspect ratio. Provide alternate width and height to change the aspect ratio.
 * @param {boolean} [props.isAboveFold] - Whether the image is above the fold or not, affects what default optimization settings are used
 * @param {string} [props.placeholder] - URL of a low quality image to use as a placeholder until the full image loads
 * @param {boolean} [props.optimizeImg] - Whether to optimize the image or not
 * @param {string} [props.optimizerEndpoint] - The endpoint to use for image optimization
 * @param {string} [props.className] - Additional class name for the image
 * @param {string} [props.classNames.wrapper] - Additional class name for the wrapper
 * @param {string} [props.classNames.img] - Additional class name for the image
 * @param {string} [props.radius] - The border radius of the image
 * @param {string} [props.shadow] - The shadow of the image
 * @param {boolean} [props.isZoomed] - Whether the image is zoomed on hover or not
 * @param {boolean} [props.disableAnimations] - Whether to disable animations or not
 * @param {function} [props.onLoaded] - Callback function to be called when the image is loaded
 * @param {function} [props.onLoad] - Callback function to be called when the image is loaded
 * @param {object} [props.style] - Additional styles for the image
 * @param {boolean} [props.disableSkeleton] - Whether to disable the skeleton loading effect or not
 * @param {string} [props.fit] - The fit of the image
 * @param {string} [props.position] - The position of the image
 * @param {string} [props.cacheControl] - The cache control for the image
 * @param {string} [props.background] - The background color of the image
 * @param {boolean} [props.addCorsProxy] - Whether to add a CORS proxy or not
 * @param {boolean} [props.showSkeleton] - Whether to show the skeleton loading effect or not
 */
export function Image(props: ImageProps) {
	const {
		src,
		width,
		height,
		isAboveFold,
		placeholder = undefined,
		alt,
		optimizeImg: optimizeImgProp = false,
		classNames,
		className,
		radius,
		shadow,
		isZoomed,
		disableAnimations,
		onLoaded,
		onLoad,
		onError,
		optimizerEndpoint: optimizerEndpointProp,
		style,
		disableSkeleton = false,
		fit,
		position,
		cacheControl = '31d',
		background,
		addCorsProxy,
		ref,
		showSkeleton: showSkeletonProp = false,
		...imgProps
	} = props;

	const {
		breakpoints,
		getSrc,
		targetFormats,
		quality,
		optimizeImg,
		optimizerEndpoint: globalOptimizerEndpoint,
		corsProxyEndpoint,
	} = useContext(GlobalImageConfigs);
	const optimizerEndpoint = optimizerEndpointProp ?? globalOptimizerEndpoint;

	const [isLoading, setIsLoading] = useState(true);
	const [isLoadError, setIsLoadError] = useState(false);

	const optimizeImage = useMemo(() => {
		if (!isLoadError) {
			return optimizeImgProp ?? optimizeImg;
		}
		return false;
	}, [optimizeImgProp, optimizeImg, isLoadError]);
	const imageSrc = useMemo(() => {
		if (!src) return null;
		if (addCorsProxy && !isLoadError) {
			return `${corsProxyEndpoint}?url=${src}`;
		}
		return src;
	}, [src, addCorsProxy, corsProxyEndpoint, isLoadError]);
	const slots = useMemo(
		() =>
			image({
				radius,
				shadow,
				isZoomed,
				showSkeleton: (isLoading && !disableSkeleton) || showSkeletonProp,
				showPlaceholder: isLoading && !!placeholder,
				disableAnimations,
			}),
		[
			radius,
			shadow,
			isZoomed,
			isLoading,
			disableSkeleton,
			placeholder,
			disableAnimations,
			showSkeletonProp,
		],
	);
	const imageStyle = useMemo<React.CSSProperties | undefined>(() => {
		if (!isLoading || !placeholder) return style;
		return {
			backgroundImage: placeholder ? `url(${placeholder})` : undefined,
			backgroundSize: placeholder ? 'cover' : undefined,
			backgroundPosition: placeholder ? 'center' : undefined,
			backgroundRepeat: 'no-repeat',
			...style,
		};
	}, [isLoading, placeholder, style]);

	// Note fetchPriority is not supported in React 18, only in React 19
	// So it's lowercased here to avoid React warnings in React 18
	// Unfortunately, React 19 complains about fetchpriority being lowercase
	// https://github.com/pinterest/gestalt/pull/3976 but hopefully it will be fixed
	const fetchPriorityKey = version.startsWith('18') ? 'fetchpriority' : 'fetchPriority';
	const fetchPriorityProp = {
		[fetchPriorityKey]: isAboveFold ? 'high' : 'low',
	};

	async function handleLoading(
		img: ImgElementWithDataProp,
		src: string,
		onLoadingComplete: OnLoadingComplete | null | undefined,
	): Promise<void> {
		if (!img || img['data-loaded-src'] === src) {
			return;
		}
		img['data-loaded-src'] = src;
		const p = img && 'decode' in img ? img.decode() : Promise.resolve();
		await p
			.catch(() => {})
			.then(() => {
				if (!img.parentNode) {
					return;
				}
				setIsLoading(false);
				if (onLoadingComplete) {
					const { naturalWidth, naturalHeight } = img;
					onLoadingComplete({ naturalWidth, naturalHeight });
				}
			});
	}

	if (!optimizeImage) {
		// Return unoptimized image
		return (
			<div className={slots.wrapper({ class: classNames?.wrapper })}>
				<img
					// @ts-expect-error - react 19 new ref type compatibility
					ref={useCallback(
						async (img: ImgElementWithDataProp) => {
							if (img != null) {
								if (img?.complete) {
									if (imageSrc && img) {
										await handleLoading(img, imageSrc, onLoaded);
									}
								}
								if (ref) {
									if (typeof ref === 'function') {
										ref(img);
									} else {
										(ref as React.MutableRefObject<HTMLImageElement | null>).current = img;
									}
								}
							}
						},
						[ref, imageSrc, onLoaded],
					)}
					alt={alt}
					className={slots.img({ class: className || classNames?.img })}
					data-loaded={!isLoading}
					decoding={isAboveFold ? 'auto' : 'async'}
					height={height}
					loading={isAboveFold ? 'eager' : 'lazy'}
					role={alt ? undefined : 'presentation'}
					// @ts-expect-error - src is null if not provided
					src={imageSrc}
					style={imageStyle}
					width={width}
					onError={(event) => {
						setIsLoadError(true);
						if (onError) {
							onError(event);
						}
					}}
					onLoad={async (event) => {
						const img = event.currentTarget as ImgElementWithDataProp;
						if (imageSrc && img) {
							await handleLoading(img, imageSrc, onLoaded);
						}
						if (onLoad) {
							onLoad(event);
						}
					}}
					{...fetchPriorityProp}
					{...imgProps}
				/>
			</div>
		);
	}

	if (!imageSrc || !width || !height) {
		console.error('The `src`, `width`, and `height` props are required for the Image component.');
		return null;
	}

	const widthNum = typeof width === 'string' ? parseInt(width) : width;
	const heightNum = typeof height === 'string' ? parseInt(height) : height;
	const ratio = widthNum / heightNum;

	const filteredBreakpoints = breakpoints.filter((bp) => bp <= widthNum);

	return (
		<picture className={slots.wrapper({ class: classNames?.wrapper })}>
			{targetFormats.map((format?: TargetFormat) => (
				<source
					key={format}
					height={height}
					type={`image/${format}`}
					width={width}
					sizes={
						filteredBreakpoints.length
							? filteredBreakpoints.map((w: number) => `(max-width: ${w}px) ${w}px`).join(', ') +
								`, ${widthNum}px`
							: `${widthNum}px`
					}
					srcSet={
						filteredBreakpoints.length
							? [...filteredBreakpoints, widthNum]
									.map(
										(w) =>
											getSrc({
												src: imageSrc,
												width: w,
												height: w / ratio,
												format,
												quality,
												background,
												fit,
												cacheControl,
												position,
												optimizerEndpoint,
											}) + ` ${w}w`,
									)
									.join(', ')
							: getSrc({
									src: imageSrc,
									width: widthNum,
									height: heightNum,
									format,
									quality,
									background,
									fit,
									cacheControl,
									position,
									optimizerEndpoint,
								})
					}
				/>
			))}
			<img
				// @ts-expect-error - react 19 new ref type compatibility
				ref={useCallback(
					async (img: ImgElementWithDataProp) => {
						if (img != null) {
							if (img?.complete) {
								if (imageSrc && img) {
									await handleLoading(img, imageSrc, onLoaded);
								}
							}
							if (ref) {
								if (typeof ref === 'function') {
									ref(img);
								} else {
									(ref as React.MutableRefObject<HTMLImageElement | null>).current = img;
								}
							}
						}
					},
					[ref, imageSrc, onLoaded],
				)}
				alt={alt}
				data-loaded={!isLoading}
				decoding={isAboveFold ? 'auto' : 'async'}
				height={height}
				loading={isAboveFold ? 'eager' : 'lazy'}
				role={alt ? undefined : 'presentation'}
				width={width}
				{...fetchPriorityProp}
				className={slots.img({ class: className || classNames?.img })}
				style={imageStyle}
				sizes={
					filteredBreakpoints.length
						? filteredBreakpoints.map((w: number) => `(max-width: ${w}px) ${w}px`).join(', ') +
							`, ${widthNum}px`
						: undefined
				}
				src={getSrc({
					src: imageSrc,
					width: widthNum,
					height: heightNum,
					quality,
					background,
					fit,
					cacheControl,
					position,
					optimizerEndpoint,
				})}
				srcSet={
					filteredBreakpoints.length
						? [...filteredBreakpoints, widthNum]
								.map(
									(w) =>
										getSrc({
											src: imageSrc,
											width: w,
											height: w / ratio,
											quality,
											background,
											fit,
											cacheControl,
											position,
											optimizerEndpoint,
										}) + ` ${w}w`,
								)
								.join(', ')
						: undefined
				}
				onError={(event) => {
					setIsLoadError(true);
					if (onError) {
						onError(event);
					}
				}}
				onLoad={async (event) => {
					const img = event.currentTarget as ImgElementWithDataProp;
					if (imageSrc && img) {
						await handleLoading(img, imageSrc, onLoaded);
					}
					if (onLoad) {
						onLoad(event);
					}
				}}
				{...imgProps}
			/>
		</picture>
	);
}
