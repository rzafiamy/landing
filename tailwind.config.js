/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

export default {
	content: [
		'./**/*.{html,js}',
		'./pages/**/*.{html,js}',
	],
	darkMode: "selector",
	theme: {
		extend: {
			fontFamily: {
				sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
			},
		},
		colors: {
			transparent: "transparent",
			primary: {
				DEFAULT: "#63A36D",
				50: "#E6F2E9",
				100: "#CCE5D3",
				200: "#99CBA7",
				300: "#66B17B",
				400: "#33974F",
				500: "#007D23",
				600: "#00661C",
				700: "#004F15",
				800: "#00380E",
				900: "#002107",
			},
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			emerald: colors.emerald,
			indigo: colors.indigo,
			yellow: colors.yellow,
			green: colors.green,
			slate: colors.slate,
		},
	},
	plugins: [],
};
