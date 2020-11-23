import React, { useContext } from "react";
import { BpipiContext } from "../../context/BpipiContext";
import BpipiChart from "../../components/BpipiChart";
import Header from "../../components/Header";
import Iframe from "../../components/Iframe";

export default function Index() {
	const { iframe } = useContext(BpipiContext);
	return (
		<div className="lg:w-screen lg:h-screen lg:py-0 py-10 bg-blue-custom flex flex-col md:items-stretch items-center justify-center overflow-hidden">
			<Header />
			<BpipiChart />
			{iframe && <Iframe />}
		</div>
	);
}
