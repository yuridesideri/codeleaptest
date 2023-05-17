import { useState } from "react";
import SignOut from "../authComponents/SignOut";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "../../contexts/ThemeContext";

export default function Header() {
	const { theme, setTheme } = useTheme();
	const [isDarkMode, setDarkMode] = useState(theme === "dark" ? true : false);

	const toggleDarkMode = (checked: boolean) => {
		setDarkMode(checked);
		setTheme!(checked ? "dark" : "light");
	};

	return (
		<header className="sticky left-0 right-0 top-0 ml-auto mr-auto mt-0 flex h-[80px] max-w-[800px] items-center justify-between bg-primary shadow-xl drop-shadow-lg">
			<h1
				onClick={() => location.reload()}
				className="ml-[37px] cursor-pointer text-[22px] font-bold text-white hover:scale-105"
			>
				CodeLeap Network
			</h1>
			<div className="flex gap-5">
				<DarkModeSwitch
					className="w-6"
					style={{ marginBottom: "0.25rem" }}
					checked={isDarkMode}
					onChange={toggleDarkMode}
					size={120}
				/>
				<SignOut />
			</div>
		</header>
	);
}
