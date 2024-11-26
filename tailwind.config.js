/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ["*"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
