'use client';

import * as React from 'react';
import { Item, Gallery as PSGallery, useGallery } from 'react-photoswipe-gallery';

import type { GalleryProps } from 'react-photoswipe-gallery';

import '@/styles/pswp.css';

import { useTranslations } from 'next-intl';

import { isNext } from '@/utils/common/misc';

function Gallery(
	props: Omit<GalleryProps, 'options'> & {
		options?: Omit<
			GalleryProps['options'],
			| 'arrowPrevSVG'
			| 'arrowNextSVG'
			| 'closeSVG'
			| 'zoomSVG'
			| 'closeTitle'
			| 'zoomTitle'
			| 'arrowNextTitle'
			| 'arrowPrevTitle'
			| 'errorMsg'
		>;
	},
) {
	const href = isNext ? '/assets/icons/sprite.svg' : './assets/icons/sprite.svg';
	const { children, options, onOpen: onOpenProp, ...rest } = props;
	const t = useTranslations('Pswp');

	return (
		<PSGallery
			options={{
				...options,
				arrowNextSVG: `<svg class="w-5 h-5 inline self-center text-inherit"><use href="${href}#arrow-right-bold"></use></svg>`,
				arrowPrevSVG: `<svg class="w-5 h-5 inline self-center text-inherit"><use href="${href}#arrow-left-bold"></use></svg>`,
				closeSVG: `<svg class="w-5 h-5 inline self-center text-inherit"><use href="${href}#close-bold"></use></svg>`,
				closeTitle: t('close'),
				zoomTitle: t('zoom'),
				arrowNextTitle: t('next'),
				arrowPrevTitle: t('previous'),
				errorMsg: t('errorMsg'),
			}}
			onOpen={(pswp) => {
				if (pswp.element) {
					pswp.element.ariaLabel = 'gallery';
				}
				if (onOpenProp) {
					onOpenProp(pswp);
				}
			}}
			{...rest}
		>
			{children}
		</PSGallery>
	);
}

export { Gallery, Item, useGallery };
