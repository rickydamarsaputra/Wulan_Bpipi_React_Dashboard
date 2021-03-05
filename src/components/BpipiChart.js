import React, { useContext } from "react";
import { motion } from "framer-motion";
import { BpipiContext } from "../context/BpipiContext";
import Chart from "../shere/Chart";
import Button from "../shere/Button";

import BpipiBgText from "../img/bpipi-bg-text.png";
import Shoes from "../img/shoes.png";
import PartnerLogoFhd from "../img/partner-logo-fhd.png";
import PartnerLogoLg from "../img/partner-logo-lg.png";
import PartnerLogoSm from "../img/partner-logo-sm.png";

export default function BpipiChart() {
	const { charts, buttons, setIframe, setIframeUrl } = useContext(BpipiContext);
	const handleClick = () => {
		setIframeUrl("http://bpipi.kemenperin.go.id/hasil-survey-kepuasan-pelanggan/");
		setIframe(true);
	};

	return (
		<section className="bpipi-chart flex justify-end relative">
			<img src={BpipiBgText} alt="bpipi-bg-text" className="absolute w-3/5 top-0 left-0 ml-20 hidden lg:block" />
			<img src={PartnerLogoLg} alt="bpipi-partner-logo" className="lg:absolute fhd:hidden hidden lg:block left-0 bottom-0 ml-20" />
			<img src={PartnerLogoFhd} alt="bpipi-partner-logo" className="fhd:absolute hidden fhd:block left-0 bottom-0 ml-20" />
			<motion.img src={Shoes} alt="bpipi-shoes" className="absolute bpipi-shoes hidden lg:block cursor-pointer" initial={{ x: -1000 }} animate={{ x: 0 }} transition={{ duration: 0.5, type: "tween" }} drag dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} dragElastic={0.6} />
			<motion.div className="lg:w-custom w-full fhd:p-10 lg:p-5 md:p-10 lg:pl-20 fhd:pl-24 lg:mx-0 md:mx-10 mx-5 flex justify-center lg:bg-white z-10" initial={{ x: 1000 }} animate={{ x: 0 }} transition={{ duration: 0.5, delay: 0.5, type: "tween" }}>
				<div className="w-full">
					<div className="grid lg:grid-cols-2 gap-5">
						{charts.map((chart, index) => (
							<Chart key={index} chart={chart} />
						))}
					</div>
					<div className="w-full grid lg:grid-cols-3 gap-5 mt-5">
						{buttons.map((button, index) => (
							<Button key={index} button={button} />
						))}
						<div className="lg:hidden flex md:justify-center border-t border-white pt-5">
							<img src={PartnerLogoSm} alt="" />
						</div>
					</div>
					<div className="flex items-center justify-between mt-4">
						<div className="capitalize fhd:text-xl text-sm text-white lg:text-black text-center">* skala index 1-4</div>
						<button onClick={handleClick} className="focus:outline-none capitalize fhd:text-xl text-sm text-white lg:text-black text-center border-2 lg:border-gray-800 border-white rounded-full py-1 px-2">
							Hasil Survey Periode Sebelumnya
						</button>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
