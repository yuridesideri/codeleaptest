/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				backgroundLight: "#DDDDDD",
				backgroundDark: "#222222",
				mainContentBackground: "#FFFFFF",
				mainContentBackgroundDark: "#333333",
				commentText: "#777777",
				placeholderText: "#CCCCCC",
				borderColor: "#999999",
				darkCommentText: "#AAAAAA",
				darkTextColor: "#FFFFFF",
				textColor: "#000000",
				primary: "#7695EC",
				primaryDark: "#7695EC",
				red: "#FF0000",
				green: "#00FF00",
				modal: "rgba(119, 119, 119, 0.8)",
				darkModal: "rgba(34, 34, 34, 0.8)",
				 extend: {
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.54)',
      },
    },
			},
		},
		variants: {
			extend: {
				textOpacity: ["dark"],
			},
		},
		plugins: [],
	},
};
