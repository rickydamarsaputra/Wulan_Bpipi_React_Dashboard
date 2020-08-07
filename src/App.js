import React from "react";

import Header from "./components/Header";
import BpipiChart from "./components/BpipiChart";

export default function App() {
	return (
		<div className="w-screen h-screen bg-blue-custom py-10 overflow-hidden">
			<Header />
			<BpipiChart />
		</div>
	);
}
