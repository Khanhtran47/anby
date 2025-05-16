import React from 'react';

function BackgroundImage() {
	return (
		<div className="absolute top-0 left-0 z-[-1] size-full bg-[url(/assets/images/bg-light.png)] bg-cover bg-top bg-no-repeat dark:bg-[url(/assets/images/bg-dark.png)]" />
	);
}

export default BackgroundImage;
