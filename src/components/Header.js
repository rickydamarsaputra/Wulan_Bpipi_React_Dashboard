import React from "react";
import moment from "moment";
import "moment/locale/id";

import BpipiLogo from "../img/bpipi-kemenperin-logo.png";

export default function Header() {
	return (
		<header>
			<div className="lg:mx-auto md:mx-20 mx-5 flex justify-end fhd:mb-10 lg:mb-5 md:mb-0 mb-5">
				<div className="w-full lg:px-20 flex md:flex-row flex-col md:space-y-0 space-y-5 justify-between lg:items-end items-center fhd:text-xl md:text-base text-lg text-white">
					<img src={BpipiLogo} alt="" className="lg:w-56 fhd:w-64 w-48" />
					<div>
						<span className="font-semibold">{moment().locale("id").format("dddd")}</span> - {moment().format("D MMMM y")}
					</div>
				</div>
			</div>
		</header>
	);
}
