import { useEffect } from "react";
import { useUserData } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/feed/CreatePost";

export default function Home() {
	const { user } = useUserData();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user?.name) navigate("/sign-in");
	}, []);

	return (
		<div className="absolute min-h-screen w-full bg-backgroundLight">
			<header className="absolute left-0 right-0 top-0 ml-auto mr-auto mt-0 flex h-[80px] w-[800px] items-center bg-primary shadow-xl drop-shadow-lg">
				<h1 className="ml-[37px] text-[22px] font-bold text-white">
					CodeLeap Network
				</h1>
			</header>
			<main className="m-auto flex min-h-screen w-[800px] flex-col bg-mainContentBackground p-[24px] pt-[104px] items-center">
				<CreatePost />
			</main>
		</div>
	);
}
