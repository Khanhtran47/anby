'use client';

import * as React from 'react';
import { Item, Gallery as PSGallery, useGallery } from 'react-photoswipe-gallery';

import type { UIElementData } from 'photoswipe';
import type { GalleryProps } from 'react-photoswipe-gallery';

import '@/styles/pswp.css';

import { useTranslations } from 'next-intl';

import { isNext } from '@/utils/common/misc';

function Gallery(
	props: Omit<GalleryProps, 'options' | 'withDownloadButton'> & {
		/**
		 * Adds UI control for downloading the original image of the current slide
		 */
		downloadButton?: boolean;
		/**
		 * Adds UI control for rotating the current image
		 */
		rotateButton?: boolean;
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
	const {
		children,
		options,
		onOpen: onOpenProp,
		downloadButton,
		rotateButton = false,
		uiElements,
		...rest
	} = props;
	const t = useTranslations('Pswp');

	const rotateButtonUI: UIElementData = {
		name: 'rotate',
		ariaLabel: t('rotate'),
		title: t('rotate'),
		className: 'mr-2',
		order: 9,
		isButton: true,
		html: `<svg class="w-5 h-5 inline self-center text-inherit"><use href="${href}#rotate-bold"></use></svg>`,
		appendTo: 'bar',
		onClick: (_e, _el, pswpInstance) => {
			if (!pswpInstance.currSlide?.content.element) {
				return;
			}

			const item = pswpInstance.currSlide.content.element;

			const prevRotateAngle = Number(item.dataset.rotateAngel) || 0;
			const rotateAngle = prevRotateAngle === 270 ? 0 : prevRotateAngle + 90;

			// add slide rotation
			item.style.transform = `${item.style.transform.replace(
				`rotate(-${prevRotateAngle}deg)`,
				'',
			)} rotate(-${rotateAngle}deg)`;
			item.dataset.rotateAngel = String(rotateAngle);
		},
		onInit: (_el, pswpInstance) => {
			// remove applied rotation on slide change
			// https://photoswipe.com/events/#slide-content-events
			pswpInstance.on('contentRemove', () => {
				if (!pswpInstance.currSlide?.content.element) {
					return;
				}

				const item = pswpInstance.currSlide.content.element;
				item.style.transform = `${item.style.transform.replace(
					`rotate(-${item.dataset.rotateAngel}deg)`,
					'',
				)}`;
				delete item.dataset.rotateAngel;
			});
		},
	};

	return (
		<PSGallery
			uiElements={[...(rotateButton ? [rotateButtonUI] : []), ...(uiElements ? uiElements : [])]}
			withDownloadButton={downloadButton}
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
