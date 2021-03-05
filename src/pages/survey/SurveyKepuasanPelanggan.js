import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Select, MenuItem, Radio, RadioGroup, FormControlLabel, FormControl, Button } from "@material-ui/core";
import { BpipiSurveyContext } from "../../context/BpipiSurveyContext";
import CustomRating from "../../shere/CustomRating";
import { motion } from "framer-motion";
import axios from "axios";
import Recaptcha from "react-google-recaptcha";

export default function SurveyKepuasanPelanggan() {
	const { questionsA, servicesA, currentTotalAvgRateA, educations, ratingsA, API_URL, Cors, SITE_KEY } = useContext(BpipiSurveyContext);
	const [isValid, setIsValid] = useState(true);
	const [isLoading, setIsloading] = useState(false);
	const [service, setService] = useState(servicesA[0].ID_layanan);
	const [serviceTitle, setServiceTitle] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [education, setEducation] = useState(educations[0]);
	const [validService, setValidService] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	// const [validAge, setValidAge] = useState(false);
	const history = useHistory();
	const handleBack = () => history.push("/");
	const handleRecaptcha = (value) => {
		setIsValid(false);
	};
	const handleSubmit = () => {
		const dataTransfer = {
			tipe: "form_a",
			email: email,
			instansi: "-",
			alamat: "-",
			telepon: "-",
			umur: age,
			jenis_kelamin: gender,
			pendidikan: educations.indexOf(education) + 1,
			ID_review_layanan: service,
			layanan: serviceTitle,
			current_total_avg_rate: currentTotalAvgRateA,
			ID_pertanyaan: ratingsA,
		};
		!serviceTitle ? setValidService(true) : setValidService(false);
		!email ? setValidEmail(true) : setValidEmail(false);
		// !age ? setValidAge(true) : setValidAge(false);
		if (serviceTitle && email && isValid == false) {
			setIsloading(true);
			axios.post(API_URL + "?tipe=form_a", dataTransfer).then((response) => {
				handleBack();
				setIsloading(false);
				// console.log(response);
			});
		}
	};
	return (
		<div className="bg-blue-custom py-10">
			<motion.button onClick={handleBack} initial={{ x: 266 }} whileHover={{ x: 0 }} transition={{ type: "tween" }} className="fixed top-0 right-0 bg-blue-custom bg-opacity-75 py-2 px-4 rounded-l-full mt-20 shadow-md text-sm text-white focus:outline-none z-50">
				<i className="fas fa-home pr-5 text-lg"></i> Klik untuk kembali ke halaman awal
			</motion.button>
			<div className="flex justify-center lg:text-3xl text-lg text-white font-semibold mb-4">Tambah Survey Kepuasan Pelanggan</div>
			<motion.div initial={{ y: 1000 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.5, type: "tween" }} className="lg:w-4/5 lg:mx-auto mx-4 bg-white p-4 lg:p-10 rounded-md">
				<div className="border-b-2 pb-10">
					<div className="text-xl capitalize">data diri</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">kategori layanan *</div>
						<Select value={service} onChange={(e) => setService(e.target.value)} className="flex-1 lg:flex-none lg:w-1/2">
							{servicesA.map((service, index) => (
								<MenuItem key={index} value={service.ID_layanan}>
									{service.layanan}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">judul layanan *</div>
						<TextField
							error={validService}
							helperText={validService ? "Judul Layanan Harus Di Isi!" : ""}
							label="Judul Layanan"
							value={serviceTitle}
							onChange={(e) => {
								setServiceTitle(e.target.value);
							}}
							variant="outlined"
							size="small"
							className="flex-1 lg:flex-none lg:w-1/2"
						/>
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">email *</div>
						<TextField error={validEmail} helperText={validEmail ? "Email Harus Di Isi!" : ""} label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" size="small" className="flex-1 lg:flex-none lg:w-1/2" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">usia peserta *</div>
						{/* <TextField error={validAge} helperText={validAge ? "Usia Peserta Harus Di Isi!" : ""} label="Usia Peserta" value={age} onChange={(e) => setAge(e.target.value)} variant="outlined" size="small" className="flex-1 lg:flex-none lg:w-1/2" /> */}
						<TextField label="Usia Peserta" value={age} onChange={(e) => setAge(e.target.value)} variant="outlined" size="small" className="flex-1 lg:flex-none lg:w-1/2" />
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">Jenis kelamin *</div>
						<FormControl className="flex-1 lg:flex-none lg:w-1/2">
							<RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
								<div className="flex flex-col lg:flex-row">
									<FormControlLabel value="laki-laki" control={<Radio />} label="Laki-Laki" />
									<FormControlLabel value="perempuan" control={<Radio />} label="Perempuan" />
								</div>
							</RadioGroup>
						</FormControl>
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">pendidikan terakhir *</div>
						<Select value={education} onChange={(e) => setEducation(e.target.value)} className="flex-1 lg:flex-none lg:w-1/2">
							{educations.map((education, index) => (
								<MenuItem key={index} value={education}>
									{education}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>
				<div className="mt-10">
					<div className="text-xl capitalize">nilai dan isi ulasan sesuai penilaian anda</div>
					{questionsA.map((question, index) => (
						<CustomRating key={index} question={question} type={"rating_a"} />
					))}
				</div>
				<div>
					{/* <Button variant="outlined" color="primary" className="focus:outline-none" onClick={handleBack}>
						<ArrowBackIcon /> Kembali
					</Button> */}
					<Recaptcha sitekey={SITE_KEY} onChange={handleRecaptcha} className="mb-4" />
					<Button disabled={isValid} onClick={handleSubmit} variant="contained" color="primary" className="focus:outline-none">
						Simpan
					</Button>
					{isLoading && <i class="ml-4 text-blue-custom fas fa-spinner fa-pulse"></i>}
				</div>
			</motion.div>
		</div>
	);
}
