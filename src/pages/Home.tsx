import { useUserData, userData } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/feed/CreatePost";
import ReadPost from "../components/feed/ReadPost";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import SignOut from "../components/authComponents/SignOut";
import Header from "../components/header/Header";

export default function Home() {
	const { user } = useUserData() as { user: userData };
	const navigate = useNavigate();
	const { theme } = useTheme();
	const [loadingPosts, setLoadingPosts] = useState(false);
	const [postsArray, setPostsArray] = useState<
		| {
				id: number;
				username: string;
				created_datetime: Date;
				title: string;
				content: string;
		  }[]
		| []
	>([]);

	console.log(postsArray);

	useEffect(() => {
		setLoadingPosts(true);
		try {
			axios.get("https://dev.codeleap.co.uk/careers/").then((res) => {
				setPostsArray(res.data.results);
			});
		} catch (err) {
			toast.error("Error fetching post", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme,
			});
		} finally {
			setLoadingPosts(false);
		}
	}, []);

	useEffect(() => {
		if (!user.name) navigate("/sign-in");
	}, []);

	return (
		<div className="absolute min-h-screen w-full bg-backgroundLight dark:bg-backgroundDark">
			<Header />

			<main className="m-auto flex min-h-screen max-w-[800px] flex-col items-center bg-mainContentBackground dark:bg-mainContentBackgroundDark p-[24px] pt-[24px]">
				<CreatePost />
				{!loadingPosts &&
					postsArray.length !== 0 &&
					postsArray.map((post) => (
						<ReadPost
							key={post.id}
							{...{
								...post,
								loggedUser: user.name!,
								postUser: post.username,
							}}
						/>
					))}
			</main>
			<footer></footer>
		</div>
	);
}
