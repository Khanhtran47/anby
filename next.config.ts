import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		dangerouslyAllowSVG: true,
		unoptimized: true,
	},
	experimental: {
		reactCompiler: true,
	},
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
