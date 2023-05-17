import { Route, Routes } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
	return (
		<div className="App h-screen w-full">
			<UserProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-in" element={<SignIn />} />
				</Routes>
			</UserProvider>
		</div>
	);
}

export default App;
