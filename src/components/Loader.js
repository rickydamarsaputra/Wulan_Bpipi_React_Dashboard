import React from "react";

export default function Loader() {
	return (
		<div className="w-screen h-screen fixed top-0 bottom-0 flex justify-center items-center bg-blue-custom z-50">
			<i className="fas fa-spinner fa-pulse text-white text-4xl"></i>
		</div>
	);
}
