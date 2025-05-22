import React from 'react';

interface PageTitleProps {
	title: string;
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
}

function PageTitle(props: PageTitleProps) {
	const { title, leftContent, rightContent } = props;
	return (
		<div className="flex h-14 w-full items-center justify-between px-3">
			<div className="flex gap-3">
				<h1 className="not-prose s7">{title}</h1>
				{leftContent}
			</div>
			{rightContent}
		</div>
	);
}

export default PageTitle;
