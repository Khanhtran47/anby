async function catchErrorTyped<T, E extends new (message?: string) => Error>(
	promise: Promise<T>,
	errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
	try {
		const data = await promise;
		return [undefined, data] as [undefined, T];
	} catch (error) {
		if (errorsToCatch == undefined) {
			return [error as InstanceType<E>];
		}

		if (errorsToCatch.some((e) => error instanceof e)) {
			return [error as InstanceType<E>];
		}

		throw error;
	}
}

function parseJSON<T>(data: string | undefined, fallback?: T): T | undefined {
	if (!data) return fallback || undefined;
	try {
		const parsed = JSON.parse(data);
		return parsed as T;
	} catch (e) {
		console.warn('Failed to parse JSON:', e);
		return fallback || undefined;
	}
}

export { catchErrorTyped, parseJSON };
