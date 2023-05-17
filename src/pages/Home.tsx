import { useEffect } from "react";
import { useUserData } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const { user } = useUserData();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user?.name) navigate("/sign-in");
	}, []);

	return <></>;
}
