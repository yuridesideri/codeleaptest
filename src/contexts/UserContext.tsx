import { createContext, useContext, useEffect, useState } from "react";

export interface userData {
	id?: number;
	name?: string;
}

interface UserContext {
	user: userData;
	setUser: (user: userData) => void;
}

export const UserContext = createContext<Partial<UserContext>>({});

export default function UserProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState<userData>({
		name: localStorage.getItem("username") || undefined,
	});

	useEffect(() => {
		if (user.name) {
			console.log(user.name);
			localStorage.setItem("username", user.name);
		} else {
			localStorage.removeItem("username");
		}
	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUserData() {
	return useContext(UserContext);
}
