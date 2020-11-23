import React, { useContext } from "react";
import { motion } from "framer-motion";
import { BpipiContext } from "../context/BpipiContext";

export default function Iframe() {
	const { setIframe, iframeUrl } = useContext(BpipiContext);
	const closeIframe = (e) => {
		setIframe(false);
	};

	return (
		<section className="bpipi-iframe bg-blue-custom w-screen h-screen fixed top-0 z-50">
			<iframe src={iframeUrl} frameBorder="0" className="w-screen h-screen" title="bpipi-iframe"></iframe>
			<motion.button initial={{ x: 266 }} whileHover={{ x: 0 }} transition={{ type: "tween" }} onClick={closeIframe} className="absolute top-0 right-0 bg-blue-custom bg-opacity-75 py-2 px-4 rounded-l-full mt-20 shadow-md text-sm text-white focus:outline-none z-50">
				<i className="fas fa-home pr-5 text-lg"></i> Klik untuk kembali ke halaman awal
			</motion.button>
		</section>
	);
}
