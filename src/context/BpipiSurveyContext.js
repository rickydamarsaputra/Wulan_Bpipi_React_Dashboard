import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BpipiSurveyContext = createContext();

export const BpipiSurveyContextProvider = ({ children }) => {
	const [servicesA, SetServicesA] = useState([]);
	const [servicesB, SetServicesB] = useState([]);
	const [educations, SetEducations] = useState(["Pilih Pendidikan Terakhir", "SMP Atau Dibawah SMP", "SMA/SMK/Setara", "D1/D2/D3/D4", "S1", "S2 Atau Diatas S2"]);
	const [questionsA, setQuestionsA] = useState([]);
	const [questionsB, setQuestionsB] = useState([]);
	const [currentTotalAvgRateA, setCurrentTotalAvgRateA] = useState(null);
	const [currentTotalAvgRateB, setCurrentTotalAvgRateB] = useState(null);
	const [ratingsA, setRatingsA] = useState([]);
	const [ratingsB, setRatingsB] = useState([]);
	const [API_URL, setAPI_URL] = useState("https://datacenter.bpipi.id/api/survey/");
	const [Cors, setCors] = useState("https://cors-anywhere.herokuapp.com/");
	const [SITE_KEY, setSITE_KEY] = useState("6LdwvdUZAAAAABa_J3sSvSBgCVad273YncgkeLJR");

	useEffect(() => {
		setInterval(() => {
			axios.get(API_URL + "?tipe=form_a").then((response) => {
				const { pertanyaan, layanan, current_total_avg_rate } = response.data;
				SetServicesA(
					layanan.map((snap) => {
						const { ID_layanan, layanan } = snap;
						return { ID_layanan, layanan };
					})
				);
				setQuestionsA(
					pertanyaan.map((snap) => {
						const { pertanyaan, ID_pertanyaan, current_avg_rate } = snap;
						return { pertanyaan, ID_pertanyaan, current_avg_rate };
					})
				);
				setCurrentTotalAvgRateA(current_total_avg_rate);
			});
			axios.get(API_URL + "?tipe=form_b").then((response) => {
				const { pertanyaan, layanan, current_total_avg_rate } = response.data;
				SetServicesB(
					layanan.map((snap) => {
						const { ID_layanan, layanan } = snap;
						return { ID_layanan, layanan };
					})
				);
				setQuestionsB(
					pertanyaan.map((snap) => {
						const { pertanyaan, ID_pertanyaan, current_avg_rate } = snap;
						return { pertanyaan, ID_pertanyaan, current_avg_rate };
					})
				);
				setCurrentTotalAvgRateA(current_total_avg_rate);
			});
		}, 5000);
	}, []);

	return <BpipiSurveyContext.Provider value={{ questionsA, questionsB, currentTotalAvgRateA, currentTotalAvgRateB, servicesA, servicesB, educations, API_URL, Cors, SITE_KEY, ratingsA, ratingsB, setRatingsA, setRatingsB }}>{children}</BpipiSurveyContext.Provider>;
};
