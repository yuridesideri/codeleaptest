import { FormEvent, useState } from "react";
import { useUserData } from "../../contexts/UserContext";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../../contexts/ThemeContext";
import StyledButton from "../sharedComponents/StyledButton";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const { theme } = useTheme();
	const { user } = useUserData();

	function handleCreate(e: FormEvent<HTMLFormElement>): void {
		e.preventDefault();
		setLoading(true);
		const data = {
			username: user!.name,
			title,
			content,
		};
		try {
			axios.post("https://dev.codeleap.co.uk/careers/", data).then(() => {
				toast.success("Success in creating your post", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme,
				});
				location.reload();
			});
		} catch (err) {
			toast.error("Error creating post", {
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
			setLoading(false);
		}
	}

	return (
		<div
			id="post-container"
			className="mb-[12px] flex min-h-[334px] w-full max-w-[752px] rounded-2xl border border-solid border-borderColor p-[24px]"
		>
			<form
				className="flex min-h-max w-full flex-col justify-between"
				onSubmit={handleCreate}
			>
				<h1 className="text-[22px] font-bold">What's on your mind?</h1>
				<div className="flex flex-col">
					<label>Title</label>
					<input
						placeholder="Hello World"
						className="form-input placeholder:text-placeholderText"
						type="text"
						name="title"
						id="title"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label>Content</label>
					<textarea
						onChange={(e) => setContent(e.target.value)}
						placeholder="Content here"
						className="h-[74px] resize-none rounded-lg border border-black pl-3 pt-2 leading-4 outline outline-1 transition-all duration-200 ease-in-out placeholder:text-placeholderText"
					/>
				</div>
				<StyledButton
					loading={loading}
					disabled={content === "" || title === ""}
					className="w-[120px]"
				>
					Create
				</StyledButton>
			</form>
		</div>
	);
}
