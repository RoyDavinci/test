import axios, { AxiosError } from "axios";
import React, { BaseSyntheticEvent, useState } from "react";
import { Aside, DashboardHeader } from "../../components";
import { payloadErrorResponse, UserInterface } from "../../interfaces/login";
import "./verify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BottomNav, MobileHeader } from "../../components/mobile";

export const Verify = () => {
	const [showPhone, setShowPhone] = useState<boolean>(false);
	const [showEmail, setShowEmail] = useState<boolean>(false);
	const [detail, setDetail] = useState({ email: "", phone: "" });

	const clickPhone = (e: BaseSyntheticEvent) => {
		e.preventDefault();
		if (!showPhone) {
			setShowPhone(true);
			setShowEmail(false);
		}
		return;
	};
	const clickEmail = (e: BaseSyntheticEvent) => {
		e.preventDefault();
		if (!showEmail) {
			setShowEmail(true);
			setShowPhone(false);
		}
		return;
	};
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDetail({ ...detail, [name]: value });
	};

	const onSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		if (showEmail) {
			try {
				const { data } = await axios.post(
					"http://localhost:3650/api/v1/user/verify-by-email",
					{ email: detail.email }
				);
				const response = data as unknown as UserInterface;
				if (response.success) {
					toast("Verification Link Sent, Please Check Mail");
					setDetail({ email: "", phone: "" });
				} else {
					toast(response.message);
				}
			} catch (error) {
				const err = error as AxiosError<payloadErrorResponse>;
				toast(err.response?.data.message);
			}
		}
		if (showPhone) {
			try {
				const { data } = await axios.post(
					"http://localhost:3650/api/v1/user/verify-by-phone",
					{ phone: detail.phone }
				);
				const response = data as unknown as UserInterface;
				if (response.success) {
					toast("Please check Phone For Otp");
					setDetail({ email: "", phone: "" });
				} else {
					toast(response.message);
				}
			} catch (error) {
				const err = error as AxiosError<payloadErrorResponse>;
				toast(err.response?.data.message);
			}
		}
	};

	return (
		<div>
			<div className='mobileScreenContainer'>
				<MobileHeader />
				<ToastContainer />
				<div className='dashboard__SectionCenter__divItemsContainer'>
					<h1 className='text-center'>Choose a verification Method</h1>
					<div className='dashboard__SectionCenter__btnContainer'>
						<button
							onClick={clickPhone}
							className='bg-[#3B71CA] focus:bg-[#3B71CA]'
						>
							Verify Via Phone
						</button>
						<button
							onClick={clickEmail}
							className='bg-[#54B4D3] focus:bg-[#54B4D3]'
						>
							Verify Via Email
						</button>
					</div>
					<ToastContainer />
					<form action='' onSubmit={onSubmit}>
						{showPhone && (
							<div>
								<label htmlFor='phone'>Enter Registered Phone Number</label>
								<input
									type='text'
									name='phone'
									id='phone'
									value={detail.phone}
									onChange={onInputChange}
									required={true}
								/>
								<button className='bg-[#3B71CA] focus:bg-[#3B71CA]'>
									Submit
								</button>
							</div>
						)}
						{showEmail && (
							<div>
								<label htmlFor='phone'>Enter Registered Email</label>
								<input
									type='email'
									name='email'
									id='email'
									value={detail.email}
									onChange={onInputChange}
									required={true}
								/>
								<button className='bg-[#3B71CA] focus:bg-[#3B71CA]'>
									Submit
								</button>
							</div>
						)}
					</form>
				</div>
				<BottomNav />
			</div>
			<div className='bigScreenContainer'>
				<DashboardHeader />
				<section className='dashboard__SectionCenter'>
					<Aside />
					<div className='dashboard__SectionCenter__divItemsContainer'>
						<h1 className='text-center'>Choose a verification Method</h1>
						<div className='dashboard__SectionCenter__btnContainer'>
							<button
								onClick={clickPhone}
								className='bg-[#3B71CA] focus:bg-[#3B71CA]'
							>
								Verify Via Phone
							</button>
							<button
								onClick={clickEmail}
								className='bg-[#54B4D3] focus:bg-[#54B4D3]'
							>
								Verify Via Email
							</button>
						</div>
						<ToastContainer />
						<form action='' onSubmit={onSubmit}>
							{showPhone && (
								<div>
									<label htmlFor='phone'>Enter Registered Phone Number</label>
									<input
										type='text'
										name='phone'
										id='phone'
										value={detail.phone}
										onChange={onInputChange}
										required={true}
									/>
									<button className='bg-[#3B71CA] focus:bg-[#3B71CA]'>
										Submit
									</button>
								</div>
							)}
							{showEmail && (
								<div>
									<label htmlFor='phone'>Enter Registered Email</label>
									<input
										type='email'
										name='email'
										id='email'
										value={detail.email}
										onChange={onInputChange}
										required={true}
									/>
									<button className='bg-[#3B71CA] focus:bg-[#3B71CA]'>
										Submit
									</button>
								</div>
							)}
						</form>
					</div>
				</section>
			</div>{" "}
		</div>
	);
};
