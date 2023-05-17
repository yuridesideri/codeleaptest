import dayjs from "dayjs";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

interface ReadPostProps {
	loggedUser: string;
	postUser: string;
	created_datetime: Date;
	content: string;
	title: string;
	id: number;
}

export default function ReadPost({
	loggedUser,
	postUser,
	created_datetime,
	content,
	title,
	id,
}: ReadPostProps) {
	return (
		<div className="mb-[12px] mt-[12px] flex min-h-[316px] w-full max-w-[752px] flex-col justify-between">
			<header className="flex justify-between rounded-tl-[16px] rounded-tr-[16px] bg-primary p-[24px] ">
				<h1 className="font-bold text-darkTextColor">
					{title}
				</h1>
				<div className="flex gap-[23px]">
					{loggedUser === postUser && (
						<>
							<DeletePost postId={id} />
							<EditPost postId={id} />
						</>
					)}
				</div>
			</header>
			<div
				id="card-content"
				className="flex grow flex-col rounded-bl-[16px] rounded-br-[16px] border-b border-l border-r border-t-0 border-solid border-borderColor p-[24px]"
			>
				<div className="mb-4 flex justify-between">
					<p className="font-bold text-commentText dark:text-darkCommentText">
						@{postUser}
					</p>
					<p className="text-commentText  dark:text-darkCommentText">
						{dayjs().diff(created_datetime, "minute")} minutes ago
					</p>
				</div>
				<p className="min-h-full w-full text-[18px] dark:text-white">{content}</p>
			</div>
		</div>
	);
}
