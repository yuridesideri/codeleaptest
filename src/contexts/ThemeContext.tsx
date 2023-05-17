import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const ThemeContext = createContext<{
	theme?: Theme;
	setTheme?: React.Dispatch<React.SetStateAction<Theme>>;
}>({});

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [theme, setTheme] = useState<Theme>(
		(localStorage.getItem("theme") as Theme) || "light"
	);

	useEffect(() => {
		const root = window.document.documentElement;
		root.className = "";
		root.classList.add(theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
