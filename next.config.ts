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
		ppr: 'incremental',
		reactCompiler: true,
	},
};

export default nextConfig;
