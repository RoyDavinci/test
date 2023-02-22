import axios, { AxiosError } from "axios";
import React, { BaseSyntheticEvent, ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { payloadErrorResponse, UserInterface } from "../../interfaces/login";

export const Create = () => {
	const [initial, setInitial] = useState({
		email: "",
		name: "",
		password: "",
		phone: "",
		interest: "",
	});
	const [error, setError] = useState<string>();
	const navigate = useNavigate();

	const onChange = (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		setInitial({ ...initial, [name]: value });
	};

	const onSubmit = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		const items = {
			name: initial.name,
			email: initial.email,
			password: initial.password,
			phone: initial.phone,
			interests: initial.interest.split(","),
		};
		try {
			const { data } = await axios.post(
				"http://localhost:3650/api/v1/user/create",
				items
			);
			const response = data as unknown as UserInterface;
			if (response.message.includes("created")) {
				localStorage.setItem("user", JSON.stringify(response.user));
				localStorage.setItem("token", response.token);
				setInitial({
					email: "",
					name: "",
					password: "",
					phone: "",
					interest: "",
				});
				navigate("/");
			}
			setInitial({
				email: "",
				name: "",
				password: "",
				phone: "",
				interest: "",
			});
			setError(response.message);
		} catch (error) {
			const err = error as AxiosError<payloadErrorResponse>;
			setError(err.response?.data.message);
		}
	};

	return (
		<section className='bg-white dark:bg-gray-900 lg:h-screen'>
			<div className='py-8 px-4 mx-auto max-w-2xl lg:py-16'>
				<h2 className='mb-4 text-xl font-bold text-gray-900 dark:text-white'>
					Create Your Account
				</h2>
				<form action='#' autoComplete='chrome-off' onSubmit={onSubmit}>
					{error && (
						<div className='text-red-600 bg-white text-center rounded p-2	w-full'>
							<small>{error && error}</small>
						</div>
					)}
					<div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
						<div className='sm:col-span-2'>
							<label
								htmlFor='name'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								User Name
							</label>
							<input
								type='text'
								name='name'
								id='name'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Davinci Code'
								required={true}
								value={initial.name}
								onChange={onChange}
							/>
						</div>
						<div className='w-full'>
							<label
								htmlFor='email'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Email
							</label>
							<input
								type='email'
								name='email'
								id='email'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='welcome@mail.com'
								required={true}
								value={initial.email}
								onChange={onChange}
							/>
						</div>
						<div className='w-full'>
							<label
								htmlFor='phone'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Phone
							</label>
							<input
								type='number'
								name='phone'
								id='phone'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='09159403602'
								required={true}
								value={initial.phone}
								onChange={onChange}
							/>
						</div>
						<div>
							<label
								htmlFor='password'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Password
							</label>
							<input
								type='password'
								name='password'
								id='password'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='password'
								required={true}
								autoComplete='new-password'
								value={initial.password}
								onChange={onChange}
							/>
						</div>
						<div className='sm:col-span-2'>
							<label
								htmlFor='description'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Interests (seperate with comma)
							</label>
							<textarea
								id='description'
								rows={8}
								name='interest'
								className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='music, football, programming'
								value={initial.interest}
								onChange={onChange}
							></textarea>
						</div>
					</div>
					<button
						type='submit'
						className='inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-[#2463EB] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
					>
						Create Account
					</button>
				</form>
			</div>
		</section>
	);
};
