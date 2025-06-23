import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
	return (
		<div className="flex size-full min-h-[calc(100svh-7.5rem)] flex-col items-center justify-center sm:min-h-[calc(100svh-5.75rem)]">
			<Spinner size="lg" />
		</div>
	);
}
