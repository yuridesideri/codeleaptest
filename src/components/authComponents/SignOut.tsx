import { GoSignOut } from "react-icons/go";
import { useUserData } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

export default function SignOut() {
	const { setUser } = useUserData();
	const navigate = useNavigate();

	function handleSignOut(e: MouseEvent): void {
		e.preventDefault();
		setUser!({ name: undefined });
		navigate("/sign-in");
	}
	return (
		<div
			onClick={handleSignOut}
			className="mr-[37px] aspect-square w-[23px] cursor-pointer fill-red text-rose-500 hover:scale-105"
		>
			<GoSignOut className="h-full w-full" alt="log out icon" />
		</div>
	);
}
