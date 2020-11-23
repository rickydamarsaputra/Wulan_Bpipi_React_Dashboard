import React, { useContext } from "react";
import { BpipiContext } from "./context/BpipiContext";
import { BpipiSurveyContext } from "./context/BpipiSurveyContext";
import { Route } from "react-router-dom";

import Loader from "./components/Loader";
import SurveyKepuasanPelanggan from "./pages/survey/SurveyKepuasanPelanggan";
import SurveyPresepsiAntiKorupsi from "./pages/survey/SurveyPresepsiAntiKorupsi";
import Home from "./pages/home/Index";

export default function App() {
	const { charts } = useContext(BpipiContext);
	const { servicesA, servicesB } = useContext(BpipiSurveyContext);

	return (
		<>
			<Route path="/" exact>
				{!charts.length ? <Loader /> : <Home />}
			</Route>
			<Route path="/survey/kepuasanpelanggan">{!servicesA.length ? <Loader /> : <SurveyKepuasanPelanggan />}</Route>
			<Route path="/survey/antikorupsi">{!servicesB.length ? <Loader /> : <SurveyPresepsiAntiKorupsi />}</Route>
		</>
	);
}
