import { defineConfig, loadEnv } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	process.env = { ...process.env, ...env };

	return {
		optimizeDeps: {
			include: ['sb-original/default-loader', 'sb-original/image-context'],
		},
		plugins: [tsConfigPaths()],
	};
});
