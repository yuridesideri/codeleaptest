import { FormEvent, useState } from "react";
import { useUserData } from "../../contexts/UserContext";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
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
				toast.success("Post created");
				location.reload();
			});
		} catch (err) {
			console.log("probl");
			toast.error("Error creating post");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div
			id="post-container"
			className="mb-[12px] flex min-h-[334px] w-[752px] rounded-2xl border border-solid border-borderColor p-[24px]"
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
				<button
					type="submit"
					className="mt-4 flex h-8 w-[120px] items-center justify-center self-end bg-primary text-base font-bold text-white transition-all duration-200 ease-in-out hover:scale-105"
				>
					{loading ? (
						<ColorRing
							visible={true}
							height="40"
							width="40"
							ariaLabel="blocks-loading"
							wrapperStyle={{}}
							wrapperClass="blocks-wrapper"
							colors={
								new Array(5).fill("#ffffff") as [
									string,
									string,
									string,
									string,
									string
								]
							}
						/>
					) : (
						"Create"
					)}
				</button>
			</form>
		</div>
	);
}
