import { useUserData, userData } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import CreatePost from "../components/feed/CreatePost";
import ReadPost from "../components/feed/ReadPost";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import Header from "../components/header/Header";
import { ColorRing } from "react-loader-spinner";
import UIInfiniteScroll from "../components/observer/Observer";

interface Post {
	id: number;
	username: string;
	created_datetime: Date;
	title: string;
	content: string;
}

export default function Home() {
	const { user } = useUserData() as { user: userData };
	const navigate = useNavigate();
	const { theme } = useTheme();
	const [loadingPosts, setLoadingPosts] = useState(false);
	const [throttle, setThrottle] = useState(true);
	const postRequestUrlRef = useRef("https://dev.codeleap.co.uk/careers/");
	const [postsArray, setPostsArray] = useState<Post[] | []>([]);

	console.log(loadingPosts);

	useEffect(() => {
		setLoadingPosts(true);
		try {
			axios.get(postRequestUrlRef.current).then((res) => {
				console.log(res);
				setPostsArray(res.data.results);
				postRequestUrlRef.current = res.data.next;
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

	useEffect(() => {
		if (throttle) return;
		const THROTTLE_TIME = 4000; //ms
		setTimeout(() => setThrottle(true), THROTTLE_TIME);
	}, [throttle]);

	async function handleInfiniteScroll() {
		if (!throttle) return;
		setThrottle(false);
		setLoadingPosts(true);
		console.log(postRequestUrlRef.current);
		try {
			const response: { data: { results: Post[]; next: string } } =
				await axios.get(postRequestUrlRef.current);
			const newPosts: Post[] = response?.data.results;
			console.log("resposta:", response);
			postRequestUrlRef.current = response.data.next;
			setPostsArray((posts) => [...posts, ...newPosts]);
		} catch (err: any) {
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
		//
	}

	return (
		<div className="absolute min-h-screen w-full bg-backgroundLight dark:bg-backgroundDark">
			<Header />

			<main className="m-auto flex min-h-screen max-w-[800px] flex-col items-center bg-mainContentBackground p-[24px] pt-[24px] dark:bg-mainContentBackgroundDark">
				<CreatePost />
				{loadingPosts && postsArray.length === 0 ? (
					<div className="fixed bottom-0 left-auto right-auto">
						<ColorRing
							visible={true}
							height="40"
							width="40"
							ariaLabel="blocks-loading"
							wrapperStyle={{}}
							wrapperClass="blocks-wrapper"
							colors={
								new Array(5).fill("#7695EC") as [
									string,
									string,
									string,
									string,
									string
								]
							}
						/>
					</div>
				) : (
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
					))
				)}
				{postsArray.length !== 0 && !loadingPosts && throttle && (
					<UIInfiniteScroll
						// fetchMore={() => console.log("aqui estou eu")}
						fetchMore={() => handleInfiniteScroll()}
					/>
				)}
			</main>
			<footer></footer>
		</div>
	);
}
