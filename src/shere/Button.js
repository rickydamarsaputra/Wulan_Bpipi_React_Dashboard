import React, { useContext } from "react";
import { BpipiContext } from "../context/BpipiContext";

export default function Button({ button: { icon, text, link } }) {
	const { setIframe, setIframeUrl } = useContext(BpipiContext);
	const openIframe = () => {
		setIframeUrl(link);
		setIframe(true);
	};
	return (
		<button onClick={openIframe} className="font-semibold fhd:text-xl text-sm p-4 bg-white transition duration-500 hover:bg-blue-custom hover:text-white rounded-lg shadow-custom focus:outline-none text-left">
			<i className={`${icon} mr-2`}></i>
			{text}
		</button>
	);
}
