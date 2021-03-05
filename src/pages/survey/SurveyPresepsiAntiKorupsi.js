import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Select, MenuItem, Button } from "@material-ui/core";
import { BpipiSurveyContext } from "../../context/BpipiSurveyContext";
import CustomRating from "../../shere/CustomRating";
import { motion } from "framer-motion";
import axios from "axios";
import Recaptcha from "react-google-recaptcha";

export default function SurveyPresepsiAntiKorupsi() {
	const { questionsB, servicesB, currentTotalAvgRateB, ratingsB, API_URL, Cors, SITE_KEY } = useContext(BpipiSurveyContext);
	const [isValid, setIsValid] = useState(false);
	const [isLoading, setIsloading] = useState(false);
	const [service, setService] = useState(servicesB[0].ID_layanan);
	const [serviceTitle, setServiceTitle] = useState("");
	const [email, setEmail] = useState("");
	const [company, setCompany] = useState("");
	const [address, setAddress] = useState("");
	const [telephone, setTelephone] = useState("");
	const [validService, setValidService] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	const [validCompany, setValidCompany] = useState(false);
	const [validAddress, setValidAddress] = useState(false);
	const [validTelephone, setValidTelephone] = useState(false);
	const history = useHistory();
	const handleBack = () => history.push("/");
	const handleRecaptcha = (value) => {
		setIsValid(false);
	};
	const handleSubmit = () => {
		const dataTransfer = {
			tipe: "form_b",
			email: email,
			instansi: company,
			alamat: address,
			telepon: telephone,
			umur: "-",
			jenis_kelamin: "-",
			pendidikan: "-",
			ID_review_layanan: service,
			layanan: serviceTitle,
			current_total_avg_rate: currentTotalAvgRateB,
			ID_pertanyaan: ratingsB,
		};
		!serviceTitle ? setValidService(true) : setValidService(false);
		!email ? setValidEmail(true) : setValidEmail(false);
		!company ? setValidCompany(true) : setValidCompany(false);
		!address ? setValidAddress(true) : setValidAddress(false);
		!telephone ? setValidTelephone(true) : setValidTelephone(false);

		if (serviceTitle && email && company && address && telephone && isValid == false) {
			setIsloading(true);
			axios.post(API_URL + "?tipe=form_b", dataTransfer).then((response) => {
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
			<div className="flex justify-center lg:text-3xl text-lg text-white font-semibold mb-4">Tambah Survey Persepsi Anti Korupsi</div>
			<motion.div initial={{ y: 1000 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.5, type: "tween" }} className="lg:w-4/5 lg:mx-auto mx-4 bg-white p-4 lg:p-10 rounded-md">
				<div className="border-b-2 pb-10">
					<div className="text-xl capitalize">data diri</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">kategori layanan *</div>
						<Select value={service} onChange={(e) => setService(e.target.value)} className="flex-1 lg:flex-none lg:w-1/2">
							{servicesB.map((service, index) => (
								<MenuItem key={index} value={service.ID_layanan}>
									{service.layanan}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">judul layanan *</div>
						<TextField error={validService} helperText={validService ? "Judul Layanan Harus Di Isi!" : ""} label="Judul Layanan" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} variant="outlined" size="small" className="flex-1 lg:flex-none lg:w-1/2" />
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">email *</div>
						<TextField error={validEmail} helperText={validEmail ? "Email Harus Di Isi!" : ""} label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" size="small" className="flex-1 lg:flex-none lg:w-1/2" />
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">instansi/perusahaan *</div>
						<TextField error={validCompany} helperText={validCompany ? "Nama Instansi/Perusahaan Harus Di Isi!" : ""} label="Instansi/Perusahaan" value={company} onChange={(e) => setCompany(e.target.value)} variant="outlined" size="small" className="flex-1 lg:flex-none lg:w-1/2" />
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">alamat instansi/perusahaan *</div>
						<TextField error={validAddress} helperText={validAddress ? "Alamat Instansi/Perusahaan Harus Di Isi!" : ""} label="Alamat Instansi/Perusahaan" value={address} onChange={(e) => setAddress(e.target.value)} variant="outlined" size="small" className="flex-1 lg:flex-none lg:w-1/2" />
					</div>
					<div className="flex flex-col lg:flex-row lg:items-center justify-between mt-6">
						<div className="mr-5 capitalize sm:mb-4 lg:mb-0">telepon/HP *</div>
						<TextField error={validTelephone} helperText={validTelephone ? "Telepon/Hp Harus Di Isi!" : ""} label="Telepon/HP" value={telephone} onChange={(e) => setTelephone(e.target.value)} variant="outlined" size="small" className="flex-1 lg:flex-none lg:w-1/2" />
					</div>
				</div>
				<div className="mt-10">
					<div className="text-xl capitalize">nilai dan isi ulasan sesuai penilaian anda</div>
					{questionsB.map((question, index) => (
						<CustomRating key={index} question={question} type={"rating_b"} />
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
