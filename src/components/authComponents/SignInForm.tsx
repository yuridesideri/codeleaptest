import { FormEvent, useState } from "react";
import { useUserData } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../contexts/ThemeContext";

export default function SignInForm() {
	const [inputName, setInputName] = useState<string>("");
	const { user, setUser } = useUserData();
	const navigate = useNavigate();
	const { theme } = useTheme();

	console.log("Logged as:", user?.name);

	function handleSubmit(e: FormEvent): void {
		e.preventDefault();
		if (!inputName || inputName === "") {
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
			return;
		}
		setUser!({ name: inputName });
		navigate("/");
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
					className="h-[32px] rounded-lg border border-black indent-3 outline outline-1"
					placeholder="John Doe"
				/>
				<button
					type="submit"
					className={`mt-4 flex h-8 w-[111px] items-center justify-center self-end  text-base font-bold text-white transition-all duration-200 ease-in-out hover:scale-105 ${
						inputName === "" ? "bg-gray-500" : "bg-primary"
					}`}
				>
					Enter
				</button>
				<ToastContainer />
			</form>
		</div>
	);
}
