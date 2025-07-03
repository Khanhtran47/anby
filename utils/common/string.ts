function urlWithParams(baseUrl: string, params?: Record<string, string | number | undefined>) {
	if (!params) return baseUrl;
	const query = Object.entries(params)
		.filter(([_, v]) => v !== undefined && v !== null && v !== '')
		.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
		.join('&');
	return query ? `${baseUrl}?${query}` : baseUrl;
}

export { urlWithParams };
