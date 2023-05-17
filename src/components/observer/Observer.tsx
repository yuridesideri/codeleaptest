import { MutableRefObject, ReactElement, useEffect, useRef } from "react";

export default function UIInfiniteScroll({
	fetchMore,
}: {
	fetchMore: () => void;
}): ReactElement {
	const containerRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

	useEffect(() => {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		};

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				observer.disconnect();
				fetchMore();
			}
		}, options);

		observer.observe(containerRef.current as HTMLDivElement);

		return () => {
			observer.disconnect();
		};
	}, []);

	return <div ref={containerRef} />;
}
