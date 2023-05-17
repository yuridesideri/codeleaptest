import { useState } from "react";
import trashDeleteIcon from "../../assets/trashDeleteIcon.svg";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../../contexts/ThemeContext";

export default function DeletePost({ postId }: { postId: number }) {
	const [showModal, setShowModal] = useState(false);
	const { theme } = useTheme();

	function handlePostDelete() {
		try {
			axios
				.delete(`https://dev.codeleap.co.uk/careers/${postId}/`)
				.then(() => {
					toast.success("Success in deleting your post", {
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
			toast.error("Failed in deleting your post", {
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
				src={trashDeleteIcon}
				alt="Delete"
			/>
			{showModal &&
				createPortal(
					<Modal closeModal={() => setShowModal(false)}>
						<div
							className="top-0 flex h-[146px] w-full max-w-[660px] flex-col justify-between rounded-[16px] border border-solid
						border-borderColor bg-mainContentBackground p-6"
						>
							<h1 className="font-bold">
								Are you sure you want to delete this item?
							</h1>
							<div className="buttons flex gap-4 self-end">
								<button
									onClick={() => setShowModal(false)}
									className="flex h-[32px] w-[120px] items-center justify-center rounded-[8px] border border-solid border-borderColor bg-white font-bold text-black hover:scale-105 transition-all duration-200"
								>
									Cancel
								</button>
								<button
									onClick={() => handlePostDelete()}
									className="flex h-[32px] w-[120px] items-center justify-center rounded-[8px] border bg-[#FF5151] font-bold text-white hover:scale-105 transition-all duration-200"
								>
									Delete
								</button>
							</div>
						</div>
					</Modal>,
					document.getElementById("modal") as HTMLElement
				)}
			<ToastContainer />
		</>
	);
}
