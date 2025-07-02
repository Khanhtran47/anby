export default {
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeHiddenElems: false,
				},
			},
		},
		'removeDimensions',
	],
	js2svg: {
		indent: 2,
		pretty: true,
	},
};
