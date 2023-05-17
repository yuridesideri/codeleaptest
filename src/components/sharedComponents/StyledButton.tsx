import React, { MouseEventHandler } from "react";
import { ColorRing } from "react-loader-spinner";

interface StyledButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
	className?: React.HTMLAttributes<HTMLButtonElement>["className"];
	loading: boolean;
	loadingColor?: string;
	backgroundColor?: string;
	disabled?: boolean;
	disabledColor?: string;
}

export default function StyledButton({
	onClick = () => {},
	children,
	className,
	backgroundColor = "primary",
	loading = false,
	loadingColor = "#ffffff",
	disabled = false,
	disabledColor = "gray-500",
}: StyledButtonProps) {
	return (
		<button
			onClick={onClick}
			type="submit"
			className={`mt-4 flex h-8 w-[111px] items-center justify-center self-end text-base font-bold text-white transition-all duration-200 ease-in-out hover:scale-105 ${
				disabled ? "bg-" + disabledColor : "bg-" + backgroundColor
			}
            ${className}
            `}
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
						new Array(5).fill(loadingColor) as [
							string,
							string,
							string,
							string,
							string
						]
					}
				/>
			) : (
				children
			)}
		</button>
	);
}
