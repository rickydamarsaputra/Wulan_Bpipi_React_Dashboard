import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { useHistory } from "react-router-dom";
import { BpipiContext } from "../context/BpipiContext";
// import moment from "moment";
// import "moment/locale/id";

export default function Chart({ chart, chart: { title, indicator, avg, btnText, link, responden, disclaimer } }) {
	const { setIframe, setIframeUrl } = useContext(BpipiContext);
	const history = useHistory();
	const handleToSurvey = () => history.push(link);
	// const openIframe = () => {
	// 	setIframeUrl(link);
	// 	setIframe(true);
	// };
	const options = {
		legend: {
			display: false,
		},
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
						stepSize: 1,
					},
				},
			],
		},
	};

	return (
		<div className="shadow-custom rounded-lg p-8 bg-white">
			<div className="flex fhd:items-center justify-between mb-4">
				<div>
					<div className="fhd:text-4xl md:text-2xl font-bold text-gray-custom">{title}</div>
					{/* <div className="w-4/5 h-thin my-2 bg-black"></div> */}
					{/* <div>{indicator}</div> */}
				</div>
				<div className="fhd:text-custom md:text-5xl text-4xl font-bold text-blue-custom">{avg}</div>
			</div>
			<div className="text-center border-b-2 border-t-2 py-5 fhd:py-10 fhd:my-10">
				<div className="capitalize text-lg fhd:text-2xl font-semibold text-gray-custom mb-2">total responden: {responden}</div>
				<div className="capitalize text-sm fhd:text-xl">{disclaimer}</div>
				{/* <div className="flex justify-center capitalize text-sm fhd:text-xl">
					<div>{moment().locale("id").format("dddd")}</div>
					<div>- {moment().locale("id").format("D MMMM y")}</div>
				</div> */}
			</div>
			<div>
				{/* <Line data={chart} options={options} /> */}
				<div className="flex justify-center mt-4">
					<button onClick={handleToSurvey} className="transition duration-500 bg-gray-custom hover:bg-blue-custom focus:outline-none px-4 py-3 fhd:px-5 text-xs font-semibold text-white rounded-full fhd:text-xl">
						{btnText}
					</button>
					{/* <a href={link} className="transition duration-500 bg-gray-custom hover:bg-blue-custom focus:outline-none px-4 py-3 fhd:px-5 text-xs font-semibold text-white rounded-full fhd:text-xl">
						{btnText}
					</a> */}
				</div>
			</div>
		</div>
	);
}
