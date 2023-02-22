import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Aside, DashboardHeader } from "../../components";
import "./settings.css";
import { toast, ToastContainer } from "react-toastify";
import { User } from "../../components/DashboardHeader/DashboardHeader";
import axios, { AxiosError } from "axios";
import { useLocalStorage } from "../../helpers/LocalStorage";
import { BottomNav, MobileHeader } from "../../components/mobile";
import { payloadErrorResponse, UserInterface } from "../../interfaces/login";

export interface UpdateUser {
	username: string;
	email: string;
	image: string | Blob;
	password: string;
	id: string;
}

export const Settings = () => {
	const [initial, setInitial] = useState<UpdateUser>({
		username: "",
		email: "",
		image: "",
		password: "",
		id: "",
	});
	const [item, setItem] = useLocalStorage("user");
	const [previewImage, setPreviewImage] = useState<
		string | Blob | ArrayBuffer | null
	>("");

	const onInputChange = (
		e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setInitial({ ...initial, [name]: value });
		const { files } = e.target;

		if (files) {
			setInitial({ ...initial, image: files[0] });
			const fileName = files[0];
			const reader = new FileReader();

			reader.onloadend = (e) => {
				if (fileName.size / 1024 / 1024 > 1) {
					toast.info("File is greater than 1MB");
					return;
				}

				if (
					fileName.type === "image/png" ||
					fileName.type === "image/jpg" ||
					fileName.type === "image/jpeg"
				) {
					e.target && setPreviewImage(e.target.result);
				} else {
					toast.error(".png, .jpg and .jpeg are the only valid file format");
				}
			};
			reader.readAsDataURL(fileName);
		}
	};

	const onSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", initial.username);
		formData.append("email", initial.email);
		initial.password && formData.append("password", initial.password);
		typeof initial.image === "object" &&
			formData.append("image", initial.image);

		try {
			const { data } = await axios.patch(
				`http://localhost:3650/api/v1/user/update-user/${initial.id}`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			const response = data as unknown as UserInterface;
			if (response.success) {
				toast("Update Successful");
				localStorage.removeItem("user");
				localStorage.setItem("user", JSON.stringify(response.user));
			} else {
				toast(response.message);
			}
		} catch (error) {
			const err = error as AxiosError<payloadErrorResponse>;
			toast(err.response?.data.message);
		}
	};

	useEffect(() => {
		const getItems = () => {
			if (item && typeof item === "string") {
				const userData = JSON.parse(item) as unknown as User;
				setInitial({
					email: userData.email,
					image: userData.avatar,
					username: userData.name,
					password: "",
					id: userData.id,
				});
			}
		};
		getItems();
		return () => {
			console.log("cleanup useEffect");
		};
	}, [item]);

	return (
		<div>
			<div className='mobileScreenContainer'>
				<MobileHeader />
				<ToastContainer />
				<div className='mobileContainer__items'>
					<h1>Profile</h1>
					<p>You can update your personal details here</p>
					<form action='' onSubmit={onSubmit}>
						<div className='form__itemContainer'>
							<label htmlFor='username'>Username :</label>
							<input
								type='text'
								value={initial.username}
								onChange={onInputChange}
								name='username'
							/>
						</div>
						<div className='form__itemContainer'>
							<label htmlFor='email'>Email :</label>
							<input
								type='email'
								value={initial.email}
								onChange={onInputChange}
								name='email'
							/>
						</div>
						<div className='form__itemContainer'>
							<label htmlFor='password'>Password :</label>
							<input
								type='password'
								placeholder='......'
								value={initial.password}
								onChange={onInputChange}
								name='password'
								autoComplete='new-password'
							/>
						</div>
						<div className='form__itemContainer'>
							<p>Image :</p>
							<div>
								<label htmlFor='mobile-image'>
									<img
										className='w-16 h-16 rounded-full'
										src={
											typeof previewImage === "string" && previewImage
												? previewImage
												: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
										}
										alt=''
									/>
									<input
										hidden
										id='mobile-image'
										name='image'
										multiple
										type='file'
										onChange={onInputChange}
									/>
								</label>
							</div>
						</div>
						<button className='bg-[#4285F4] text-white p-3 rounded-md'>
							Update
						</button>
					</form>
				</div>
				<BottomNav />
			</div>
			<div className='bigScreenContainer'>
				<ToastContainer />
				<DashboardHeader />
				<section className='dashboard__SectionCenter px-4'>
					<Aside />
					<div>
						<h1>Profile</h1>
						<p>You can update your personal details here</p>
						<form action='' onSubmit={onSubmit}>
							<div className='form__itemContainer'>
								<label htmlFor='username'>Username :</label>
								<input
									type='text'
									value={initial.username}
									onChange={onInputChange}
									name='username'
								/>
							</div>
							<div className='form__itemContainer'>
								<label htmlFor='email'>Email :</label>
								<input
									type='email'
									value={initial.email}
									onChange={onInputChange}
									name='email'
								/>
							</div>
							<div className='form__itemContainer'>
								<label htmlFor='password'>Password :</label>
								<input
									type='password'
									placeholder='......'
									value={initial.password}
									onChange={onInputChange}
									name='password'
									autoComplete='new-password'
								/>
							</div>
							<div className='form__itemContainer'>
								<p>Image :</p>
								<div>
									<label htmlFor='image'>
										<img
											className='w-16 h-16 rounded-full'
											src={
												typeof previewImage === "string" && previewImage
													? previewImage
													: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
											}
											alt=''
										/>
										<input
											hidden
											id='image'
											name='image'
											multiple
											type='file'
											onChange={onInputChange}
										/>
									</label>
								</div>
							</div>
							<button className='bg-[#4285F4] text-white p-3 rounded-md'>
								Update
							</button>
						</form>
					</div>
				</section>
			</div>
		</div>
	);
};
