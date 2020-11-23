import React, { useState, useEffect, useContext } from "react";
import { Rating } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import { BpipiSurveyContext } from "../context/BpipiSurveyContext";

export default function CustomRating({ question: { pertanyaan, ID_pertanyaan, current_avg_rate }, type }) {
	const { ratingsA, ratingsB, setRatingsA, setRatingsB } = useContext(BpipiSurveyContext);
	const [value, setValue] = useState(0);
	const [hover, setHover] = useState(-1);
	const labels = {
		1: "tidak setuju",
		2: "kurang setuju",
		3: "setuju",
		4: "sangat setuju",
	};
	const handleChange = (e, value) => {
		let rate;
		switch (value) {
			case 1:
				rate = 25;
				break;
			case 2:
				rate = 50;
				break;
			case 3:
				rate = 75;
				break;
			case 4:
				rate = 100;
				break;
		}
		setValue(value);
		if (type === "rating_a") {
			setRatingsA([...ratingsA, { ID_pertanyaan, current_avg_rate, rate: rate.toString() }]);
		} else {
			setRatingsB([...ratingsB, { ID_pertanyaan, current_avg_rate, rate: rate.toString() }]);
		}
	};
	const handleRemove = () => {
		setValue(0);
		if (type === "rating_a") {
			setRatingsA(ratingsA.filter((snap) => snap.ID_pertanyaan !== ID_pertanyaan));
		} else {
			setRatingsB(ratingsB.filter((snap) => snap.ID_pertanyaan !== ID_pertanyaan));
			console.log(ratingsB);
		}
	};
	const handleChangeActive = (e, value) => setHover(value);
	return (
		<div className="my-3 border-b-2 lg:border-none">
			<div className="text-xs lg:text-base">{pertanyaan}</div>
			<div className="flex items-center">
				<div>
					<IconButton className="focus:outline-none" color="secondary" onClick={handleRemove}>
						<RemoveIcon />
					</IconButton>
				</div>
				<Rating name={pertanyaan} value={value} max={4} onChange={handleChange} onChangeActive={handleChangeActive} />
				<div className="ml-2 capitalize">{value !== 0 || hover !== -1 ? value !== null && labels[hover !== -1 ? hover : value] : "belum dinilai"}</div>
			</div>
		</div>
	);
}
