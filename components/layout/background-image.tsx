import React from 'react';

function BackgroundImage() {
	return (
		<div className="from-background via-background/55 absolute top-0 left-0 z-[-1] h-screen w-screen bg-gradient-to-t">
			<div
				className="fixed top-0 left-0 h-screen w-screen"
				style={{
					background: 'url(/assets/bg.png) no-repeat top / cover',
				}}
			/>
		</div>
	);
}

export default BackgroundImage;
