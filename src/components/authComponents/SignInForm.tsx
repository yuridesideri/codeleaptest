import { FormEvent, useState } from "react";
import { useUserData } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../contexts/ThemeContext";
import StyledButton from "../sharedComponents/StyledButton";

export default function SignInForm() {
	const [inputName, setInputName] = useState<string>("");
	const { user, setUser } = useUserData();
	const navigate = useNavigate();
	const { theme } = useTheme();
	const [loading, setLoading] = useState<boolean>(false);

	console.log("Logged as:", user?.name);

	function handleSubmit(e: FormEvent): void {
		e.preventDefault();
		setLoading(true);
		try {
			if (!inputName || inputName === "") {
				throw new Error("No name provided");
			}
			setUser!({ name: inputName });
			setTimeout(() => {
				toast.success("Welcome, " + inputName + "!", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					theme,
				});
			}, 300);
			navigate("/");
		} catch (err: any) {
			if (err.message === "No name provided")
				toast.error("Please enter an awesome name!!", {
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
		<div className="flex h-[205px] w-[500px] flex-col justify-between rounded-2xl border-[1px] border-[#CCCCCC] bg-mainContentBackground p-6">
			<h1 className="self-start text-[22px] font-bold">
				Welcome to CodeLeap network!
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col">
				<label
					htmlFor="name"
					className="font-['VT323', normal] mb-2 text-base font-normal"
				>
					Please enter your username
				</label>
				<input
					type="text"
					name="name"
					onChange={(e) => setInputName(e.target.value)}
					id="name"
					className="form-input placeholder:text-placeholderText"
					placeholder="John Doe"
				/>
				<StyledButton
					{...{
						loading,
						className: `${
							inputName === "" ? "bg-gray-500" : "bg-primary"
						}`,
					}}
				>
					Enter
				</StyledButton>
				<ToastContainer />
			</form>
		</div>
	);
}
