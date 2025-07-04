import React from 'react';

interface PageHeaderProps {
	title: string;
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
}

function PageHeader(props: PageHeaderProps) {
	const { title, leftContent, rightContent } = props;
	return (
		<div className="absolute top-0 left-0 z-50 h-14 w-full backdrop-blur-sm">
			<div className="relative flex size-full items-center justify-center px-6">
				<div className="pattern-diagonal-lines pattern-bg-muted pattern-background pattern-opacity-60 pattern-size-2 absolute top-0 left-0 z-[-1] mx-1 mt-1 h-[52px] w-[calc(100%-8px)] rounded-t-md" />
				<div className="flex size-full max-w-[1920px] items-center justify-between">
					<div className="mt-1 flex h-full items-center justify-center gap-3">
						<h1 className="not-prose s9 text-muted-foreground !pb-0 !font-black uppercase">
							{title}
						</h1>
						{leftContent}
					</div>
					{rightContent}
				</div>
			</div>
		</div>
	);
}

export default PageHeader;
