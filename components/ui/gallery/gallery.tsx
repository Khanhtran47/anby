'use client';

import * as React from 'react';
import { Item, Gallery as PSGallery, useGallery } from 'react-photoswipe-gallery';

import type { GalleryProps } from 'react-photoswipe-gallery';

import 'photoswipe/dist/photoswipe.css';

function Gallery(props: GalleryProps) {
	const { children, ...rest } = props;

	return <PSGallery {...rest}>{children}</PSGallery>;
}

export { Gallery, Item, useGallery };
