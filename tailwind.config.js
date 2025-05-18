import tailwindBgPatterns from 'tailwindcss-bg-patterns';

/** @type {import('tailwindcss').Config} */
export default {
	theme: {
		screens: {
			'2xs': '375px',
			xs: '425px',
			sm: '650px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1400px',
			'3xl': '1600px',
			'4xl': '1920px',
			'5xl': '2560px',
		},
	},
	plugins: [tailwindBgPatterns],
};
