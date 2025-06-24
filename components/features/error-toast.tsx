'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

interface ErrorToastProps {
	title: string;
	description?: string;
	duration?: number;
	type?: 'error' | 'warning' | 'info' | 'success';
}

function ErrorToast(props: ErrorToastProps) {
	const { title, description, duration = 5000, type = 'error' } = props;

	useEffect(() => {
		switch (type) {
			case 'error':
				toast.error(title, {
					description,
					duration,
				});
				break;
			case 'warning':
				toast.warning(title, {
					description,
					duration,
				});
				break;
			case 'info':
				toast.info(title, {
					description,
					duration,
				});
				break;
			case 'success':
				toast.success(title, {
					description,
					duration,
				});
				break;
		}
		// eslint-disable-next-line react-hooks/react-compiler
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
}

export default ErrorToast;
