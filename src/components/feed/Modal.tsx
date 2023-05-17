interface DeleteModalProps {
	closeModal: () => void;
	children: React.ReactNode;
}

export default function Modal({
	closeModal,
	children,
}: DeleteModalProps) {
	return (
		<div
			id="modal-container"
			className="fixed top-0 flex h-screen w-full items-center justify-center bg-modal"
			onClick={(e) => {
				if (e.target === e.currentTarget) closeModal();
			}}
		>
			{children}
		</div>
	);
}
