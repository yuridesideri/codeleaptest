import SignInForm from "../components/authComponents/SignInForm";

export default function SignIn() {
	return (
		<>
			<main className="flex min-h-full items-center justify-center bg-backgroundLight dark:bg-backgroundDark ">
				<SignInForm />
			</main>
		</>
	);
}
