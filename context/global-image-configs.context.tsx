'use client';

import { createContext } from 'react';

export type TargetFormat = 'webp' | 'jpg' | 'png';

/**
 * - src: the src prop passed to the Image component
 * - width: the width prop passed to the Image component
 * - height: the height prop passed to the Image component
 * - format: the format prop passed to the Image component
 * - optimizerEndpoint: the GlobalImageConfigs optimizerEndpoint value
 */
type GetSrcArgs = {
	/**
	 * The src prop passed to the Image component
	 */
	src: string;
	/**
	 * The width prop passed to the Image component
	 */
	width: number;
	/**
	 * The height prop passed to the Image component
	 */
	height: number;
	/**
	 * The format prop passed to the Image component
	 */
	format?: TargetFormat;
	/**
	 * The quality prop passed to the Image component
	 */
	quality?: number;
	/**
	 * The fit prop passed to the Image component
	 */
	fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
	/**
	 * @description The position prop passed to the Image component, it is used to control the position of the image when using the fit prop with a value of cover or contain. The width and height parameters should also be specified when using the position prop.
	 * @default 'center'
	 */
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
	/**
	 * @description The cacheControl prop passed to the Image component
	 * Defines for how long an image should be cached by the browser. This will change the max-age of the Cache-Control HTTP-header.
	 * The duration can be specified in days, weeks, months, and years using the following suffixes:
	 *   - d: days
	 *   - w: weeks, 7 days
	 *   - M: months, 30 days
	 *   - y: years, 365 days
	 * @example '7d' - 7 days, '2w' - 2 weeks, '3M' - 3 months, '1y' - 1 year
	 */
	cacheControl?: string;
	/**
	 * @description The background prop passed to the Image component
	 * Sets the background color of the image
	 * The background parameter can be specified as a 3, 4, 6 or 8-digit hexadecimal color code.
	 * @example '000' - black, 'fff' - white, 'ff0000' - red
	 */
	background?: string;
	/**
	 * The otherParams prop passed to the Image component
	 */
	otherParams?: Record<string, string>;
	/**
	 * The GlobalImageConfigs optimizerEndpoint value
	 */
	optimizerEndpoint: string;
};

/**
 * Function to return a custom src string given the src, width, height, format, and optimizerEndpoint
 */
type GetSrc = (args: GetSrcArgs) => string;

/**
 * - breakpoints: width[] breakpoints for the picture's "sizes" attribute. Must be in ascending order.
 *   Defaults to Tailwind's breakpoints (sm, md, lg, xl, 2xl): [640, 768, 1024, 1280, 1536]
 * - getSrc: Function to return a custom src string given the src, width, height, format, and optimizerEndpoint
 *   Defaults to function returning `{optimizerEndpoint}?src={src}&w={width}&h={height}&format={format}`
 * - targetFormats: string[] formats that are supported
 *   Defaults to ["webp"] (original image format is always included and doesn't need to be specified)
 * - optimizerEndpoint: The path ("/path/to/optimizer") or URL ("https://my-optimizer.com") to the image optimizer endpoint
 *   Defaults to "/img"
 * - __react18FetchPriority: boolean to use React 18's fetchpriority prop on the img element instead of React 19's FetchPriority
 */
type GlobalImgConfigsProps = {
	/**
	 * boolean to enable/disable image optimization
	 */
	optimizeImg: boolean;
	/**
	 * width[] breakpoints for the picture's "sizes" attribute. Must be in ascending order.
	 * Defaults to Tailwind's breakpoints (sm, md, lg, xl, 2xl): [640, 768, 1024, 1280, 1536]
	 */
	breakpoints: number[];
	/**
	 * Function to return a custom src string given the src, width, height, format, and optimizerEndpoint
	 * Defaults to function returning `{optimizerEndpoint}?src={src}&w={width}&h={height}&format={format}`
	 */
	getSrc: GetSrc;
	/**
	 * string[] formats that are supported
	 * Defaults to ["webp"] (original image format is always included and doesn't need to be specified)
	 */
	targetFormats: TargetFormat[];
	/**
	 * number quality of the image
	 * Defaults to undefined (no quality parameter is passed to the optimizer)
	 */
	quality?: number;
	/**
	 * The path ("/path/to/optimizer") or URL ("https://my-optimizer.com") to the image optimizer endpoint
	 * Defaults to "/img"
	 */
	optimizerEndpoint: string;
	/**
	 * The path ("/path/to/cors-proxy") or URL ("https://my-cors-proxy.com") to the CORS proxy endpoint
	 * Defaults to ""
	 */
	corsProxyEndpoint?: string;
};

/**
 * @param {GetSrcArgs} args
 * @returns {string} The src string for the picture element's img and sources
 * @description The default getSrc function for the GlobalImageConfigs
 * It takes an img src, width, height, format, and optimizerEndpoint
 * and returns: `${optimizerEndpoint}?src=${src}&w=${width}&h=${height}&format=${format}`
 */
const defaultGetSrc: GetSrc = ({
	src,
	width,
	height,
	format,
	quality,
	fit,
	background,
	position,
	cacheControl,
	otherParams,
	optimizerEndpoint,
}) => {
	const params = new URLSearchParams({
		url: src,
		w: width.toString(),
		h: height.toString(),
	});
	if (format) params.append('output', format);
	if (fit) params.append('fit', fit);
	if (quality) params.append('q', quality.toString());
	if (background) params.append('bg', background);
	if (position) params.append('a', position);
	if (cacheControl) params.append('maxage', cacheControl);
	if (otherParams) {
		Object.entries(otherParams).forEach(([key, value]) => {
			params.append(key, value);
		});
	}
	return optimizerEndpoint + '?' + params.toString();
};

const defaultContext: GlobalImgConfigsProps = {
	optimizeImg: false,
	breakpoints: [640, 768, 1024, 1280, 1536],
	getSrc: defaultGetSrc,
	targetFormats: ['webp'],
	quality: undefined,
	optimizerEndpoint: '/img',
	corsProxyEndpoint: '',
};

/**
 * - optimizeImg: boolean to enable/disable image optimization
 * - breakpoints: width[] breakpoints for the picture's "sizes" attribute. Must be in ascending order.
 *   Defaults to Tailwind's breakpoints (sm, md, lg, xl, 2xl): [640, 768, 1024, 1280, 1536]
 * - getSrc: fn to return custom src string given the src, width, height, format, and optimizerEndpoint
 *   Defaults to function returning `{optimizerEndpoint}?src={src}&w={width}&h={height}&format={format}`
 * - targetFormats: string[] formats that are supported
 *   Defaults to ["webp"] (original image format is always included and doesn't need to be specified)
 * - optimizerEndpoint: The path ("/path/to/optimizer") or URL ("https://my-optimizer.com") to the image optimizer endpoint
 *   Defaults to "/img"
 */
type GlobalImageConfigsProviderProps = {
	/**
	 * boolean to enable/disable image optimization
	 */
	optimizeImg?: boolean;
	/**
	 * width[] breakpoints for the picture's "sizes" attribute. Must be in ascending order.
	 * Defaults to Tailwind's breakpoints (sm, md, lg, xl, 2xl): [640, 768, 1024, 1280, 1536]
	 */
	breakpoints?: GlobalImgConfigsProps['breakpoints'];
	/**
	 * fn to return custom src string given the src, width, height, format, and optimizerEndpoint
	 * Defaults to function returning `{optimizerEndpoint}?src={src}&w={width}&h={height}&format={format}`
	 */
	getSrc?: GlobalImgConfigsProps['getSrc'];
	/**
	 * string[] formats that are supported
	 * Defaults to ["webp"] (original image format is always included and doesn't need to be specified)
	 */
	targetFormats?: GlobalImgConfigsProps['targetFormats'];
	/**
	 * number quality of the image
	 * Defaults to undefined (no quality parameter is passed to the optimizer)
	 */
	quality?: GlobalImgConfigsProps['quality'];
	/**
	 * The path ("/path/to/optimizer") or URL ("https://my-optimizer.com") to the image optimizer endpoint
	 * Defaults to "/img"
	 */
	optimizerEndpoint?: GlobalImgConfigsProps['optimizerEndpoint'];
	/**
	 * The path ("/path/to/cors-proxy") or URL ("https://my-cors-proxy.com") to the CORS proxy endpoint
	 * Defaults to ""
	 */
	corsProxyEndpoint?: string;
	/**
	 * The children of the provider
	 */
	children: React.ReactNode;
};

export const GlobalImageConfigs = createContext<GlobalImgConfigsProps>(defaultContext);

/**
 * GlobalImageConfigsProvider component
 * @param {GlobalImageConfigsProviderProps} props - The props for the provider
 * @param {boolean} props.optimizeImg - boolean to enable/disable image optimization
 * @param {string[]} props.breakpoints - width[] breakpoints for the picture's "sizes" attribute. Must be in ascending order.
 *   Defaults to Tailwind's breakpoints (sm, md, lg, xl, 2xl): [640, 768, 1024, 1280, 1536]
 * @param {() => string} props.getSrc - fn to return custom src string given the src, width, height, format, and optimizerEndpoint
 *   Defaults to function returning `{optimizerEndpoint}?src={src}&w={width}&h={height}&format={format}`
 * @param {string[]} props.targetFormats - formats that are supported
 *   Defaults to ["webp"] (original image format is always included and doesn't need to be specified)
 * @param {string} props.optimizerEndpoint - The path ("/path/to/optimizer") or URL ("https://my-optimizer.com") to the image optimizer endpoint
 *   Defaults to "/img"
 * @param {string} props.corsProxyEndpoint - The path ("/path/to/cors-proxy") or URL ("https://my-cors-proxy.com") to the CORS proxy endpoint
 * @param {React.ReactNode} props.children - The children of the provider
 */
export function GlobalImageConfigsProvider({
	optimizeImg,
	breakpoints,
	getSrc,
	targetFormats,
	quality,
	optimizerEndpoint,
	corsProxyEndpoint,
	children,
}: GlobalImageConfigsProviderProps) {
	const contextValue = {
		optimizeImg: optimizeImg || false,
		breakpoints: breakpoints || defaultContext.breakpoints,
		getSrc: getSrc || defaultContext.getSrc,
		targetFormats: targetFormats || defaultContext.targetFormats,
		quality: quality || defaultContext.quality,
		optimizerEndpoint: optimizerEndpoint || defaultContext.optimizerEndpoint,
		corsProxyEndpoint: corsProxyEndpoint || defaultContext.corsProxyEndpoint,
	};

	return <GlobalImageConfigs.Provider value={contextValue}>{children}</GlobalImageConfigs.Provider>;
}
