import trashDeleteIcon from "../../assets/trashDeleteIcon.svg";
import editIcon from "../../assets/editIcon.svg";

export default function ReadPost() {
	return (
		<div className="mb-[12px] mt-[12px] flex min-h-[316px] flex-col justify-between">
			<header className="flex justify-between rounded-tl-[16px] rounded-tr-[16px] bg-primary p-[24px] ">
				<h1 className="font-bold text-darkTextColor">
					My First Post at CodeLeap Network!
				</h1>
				<div className="flex gap-[34px]">
					<img className="hover:scale-105 cursor-pointer" src={trashDeleteIcon} alt="Delete" />
					<img className="hover:scale-105 cursor-pointer" src={editIcon} alt="Edit" />
				</div>
			</header>
			<div
				id="card-content"
				className="flex grow flex-col rounded-bl-[16px] rounded-br-[16px] border-b border-l border-r border-t-0 border-solid border-borderColor p-[24px]"
			>
				<div className="mb-4 flex justify-between">
					<p className="text-commentText font-bold">@name</p>
					<p className="text-commentText">time minutes ago</p>
				</div>
				<p className="min-h-full w-full text-[18px]">
					{" "}
					Curabitur suscipit suscipit tellus. Phasellus consectetuer
					vestibulum elit. Pellentesque habitant morbi tristique
					senectus et netus et malesuada fames ac turpis egestas.
					Maecenas egestas arcu quis ligula mattis placerat. Duis vel
					nibh at velit scelerisque suscipit. Duis lobortis massa
					imperdiet quam. Aenean posuere, tortor sed cursus feugiat,
					nunc augue blandit nunc, eu sollicitudin urna dolor sagittis
					lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia
					erat. Curabitur suscipit suscipit tellus. Phasellus
					consectetuer vestibulum elit. Pellentesque habitant morbi
					tristique senectus et netus et malesuada fames ac turpis
					egestas. Maecenas egestas arcu quis ligula mattis placerat.
					Duis vel nibh at velit scelerisque suscipit. Duis lobortis
					massa imperdiet quam. Aenean posuere, tortor sed cursus
					feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor
					sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus
					lacinia erat.
				</p>
			</div>
		</div>
	);
}
