import { useEffect, useState } from "react";

export default function CreatePost() {
	const [textAreaSize, setTextAreaSize] = useState(72);

	useEffect(() => {
		setTextAreaSize(72);
	}, [textAreaSize]);

	return (
		<div
			id="post-container"
			className="flex min-h-[334px] w-[752px] rounded-2xl border border-solid p-[24px]"
		>
			<form
				action=""
				className="flex min-h-max w-full flex-col justify-between"
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
					/>
				</div>
				<div className="flex flex-col">
					<label>Content</label>
					<textarea
						placeholder="Content here"
						className="h-[74px] resize-none rounded-lg border border-black pl-3 pt-2 leading-4 outline outline-1 transition-all duration-200 ease-in-out placeholder:text-placeholderText"
					/>
				</div>
				<button
					type="submit"
					className="mt-4 flex h-8 w-[120px] items-center justify-center self-end bg-primary text-base font-bold text-white transition-all duration-200 ease-in-out hover:scale-105"
				>
					Create
				</button>
			</form>
		</div>
	);
}
