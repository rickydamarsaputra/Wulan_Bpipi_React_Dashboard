import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BpipiContext = createContext();

export const BpipiContextProvider = ({ children }) => {
	const API_URL = "https://datacenter.bpipi.id/review/generate_graphic_json";
	const Cors = "https://cors-anywhere.herokuapp.com/";
	const [iframe, setIframe] = useState(false);
	const [iframeUrl, setIframeUrl] = useState("http://datacenter.bpipi.id/");
	const [charts, setCharts] = useState([]);
	const [buttons, setButtons] = useState([
		{ text: "Katalog Layanan", icon: "fas fa-book-open", link: "http://datacenter.bpipi.id/uploads/katalog/katalog.pdf" },
		{ text: "Big Data Center", icon: "fas fa-database", link: "http://datacenter.bpipi.id/" },
		{ text: "Sistem Informasi Diklat & Lab", icon: "fas fa-layer-group", link: "http://si.bpipi.id/" },
	]);

	useEffect(() => {
		setInterval(async () => {
			axios.get(API_URL).then(async (response) => {
				const {
					this_month_label,
					last_month_label,
					two_months_ago_label,
					three_months_ago_label,
					total_avg_a,
					total_avg_b,
					indikator_a,
					indikator_b,
					jumlah_responden_a,
					jumlah_responden_b,
					disclaimer_a,
					disclaimer_b,
					total_3months_ago_avg_a,
					total_2months_ago_avg_a,
					total_last_month_avg_a,
					total_this_month_avg_a,
					total_3months_ago_avg_b,
					total_2months_ago_avg_b,
					total_last_month_avg_b,
					total_this_month_avg_b,
				} = await response.data;
				const month = await [three_months_ago_label, two_months_ago_label, last_month_label, this_month_label];
				const dataABefore = await [total_3months_ago_avg_a, total_2months_ago_avg_a, total_last_month_avg_a, total_this_month_avg_a];
				const dataBBefore = await [total_3months_ago_avg_b, total_2months_ago_avg_b, total_last_month_avg_b, total_this_month_avg_b];
				const dataAAfter = dataABefore.map((data) => {
					if (data > 0) {
						return Number(Number.parseFloat(data).toFixed(2));
					} else {
						return 2;
					}
				});
				const dataBAfter = dataBBefore.map((data) => {
					if (data > 0) {
						return Number(Number.parseFloat(data).toFixed(2));
					} else {
						return 0;
					}
				});

				await setCharts([
					{
						labels: month,
						avg: Number(Number.parseFloat(total_avg_a).toFixed(2)),
						indicator: indikator_a,
						responden: jumlah_responden_a,
						disclaimer: disclaimer_a,
						title: "Index Kepuasan Pelanggan",
						btnText: "Survey Kepuasan Pelanggan",
						link: "/survey/kepuasanpelanggan",
						datasets: [
							{
								data: dataAAfter,
								backgroundColor: "#13355B",
								borderColor: "#1582AD",
								fill: false,
								lineTension: 0,
							},
						],
					},
					{
						labels: month,
						avg: Number(Number.parseFloat(total_avg_b).toFixed(2)),
						indicator: indikator_b,
						responden: jumlah_responden_b,
						disclaimer: disclaimer_b,
						title: "Index Persepsi Anti Korupsi",
						btnText: "Survey Persepsi Anti Korupsi",
						link: "/survey/antikorupsi",
						datasets: [
							{
								data: dataBAfter,
								backgroundColor: "#13355B",
								borderColor: "#1582AD",
								fill: false,
								lineTension: 0,
							},
						],
					},
				]);
			});
		}, 5000);
	}, []);

	return <BpipiContext.Provider value={{ iframe, setIframe, setIframeUrl, iframeUrl, charts, buttons }}>{children}</BpipiContext.Provider>;
};
