import { FormEvent, useState } from "react";
import editIcon from "../../assets/editIcon.svg";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../../contexts/ThemeContext";
import StyledButton from "../sharedComponents/StyledButton";

export default function EditPost({ postId }: { postId: number }) {
	const [showModal, setShowModal] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");
	const { theme } = useTheme();
	const [loading, setLoading] = useState(false);

	function handlePostEdit(e: FormEvent): void {
		e.preventDefault();
		const data = {
			title: newTitle,
			content: newContent,
		};
		try {
			axios
				.patch(`https://dev.codeleap.co.uk/careers/${postId}/`, data)
				.then(() => {
					toast.success("Success in editing your post", {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme,
					});
					setTimeout(() => {
						location.reload();
					}, 3000);
				});
		} catch (err: any) {
			console.log(err);
			toast.error("Failed in editing your post", {
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
			setShowModal(false);
		}
	}
	return (
		<>
			<img
				onClick={() => setShowModal(true)}
				className="cursor-pointer hover:scale-105"
				src={editIcon}
				alt="Delete"
			/>
			{showModal &&
				createPortal(
					<Modal closeModal={() => setShowModal(false)}>
						<form
							className="top-0 flex h-[334px] w-full max-w-[660px] flex-col justify-between rounded-[16px] border border-solid
                            border-borderColor bg-mainContentBackground p-6"
							onSubmit={handlePostEdit}
						>
							<h1 className="text-[22px] font-bold">
								What's on your mind?
							</h1>
							<div className="flex flex-col">
								<label>Title</label>
								<input
									placeholder="Hello World"
									className="form-input placeholder:text-placeholderText"
									type="text"
									name="title"
									id="title"
									onChange={(e) =>
										setNewTitle(e.target.value)
									}
								/>
							</div>
							<div className="flex flex-col">
								<label>Content</label>
								<textarea
									onChange={(e) =>
										setNewContent(e.target.value)
									}
									placeholder="Content here"
									className="h-[74px] resize-none rounded-lg border border-black pl-3 pt-2 leading-4 outline outline-1 transition-all duration-200 ease-in-out placeholder:text-placeholderText"
								/>
							</div>
							<div className="buttons flex gap-4 self-end">
								<button
									onClick={() => setShowModal(false)}
									className="flex h-[32px] w-[120px] items-center justify-center rounded-[8px] border border-solid border-borderColor bg-white font-bold text-black transition-all duration-200 hover:scale-105"
								>
									Cancel
								</button>
								<StyledButton
									onClick={handlePostEdit}
									loading={loading}
									disabled={
										newContent === "" || newTitle === ""
									}
									backgroundColor="bg-green"
									className="mt-0 flex h-[32px] w-[120px] items-center justify-center rounded-[8px] border font-bold text-white"
								>
									Save
								</StyledButton>
							</div>
							<ToastContainer />
						</form>
					</Modal>,
					document.getElementById("modal") as HTMLElement
				)}
			<ToastContainer />
		</>
	);
}
