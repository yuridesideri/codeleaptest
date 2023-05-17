import { Route, Routes } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import ThemeProvider from "./contexts/ThemeContext";

function App() {
	return (
		<div id="App" className="relative h-screen w-full">
			<ThemeProvider>
				<UserProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/sign-in" element={<SignIn />} />
					</Routes>
					<div
						id="modal"
					></div>
				</UserProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
