import React from 'react';

interface PageHeaderProps {
	title: string;
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
}

function PageHeader(props: PageHeaderProps) {
	const { title, leftContent, rightContent } = props;
	return (
		<>
			<div className="mt-1 flex h-full items-center justify-center gap-3">
				<h1 className="not-prose s9 text-muted-foreground !pb-0 !font-black uppercase">{title}</h1>
				{leftContent}
			</div>
			{rightContent}
		</>
	);
}

export default PageHeader;
