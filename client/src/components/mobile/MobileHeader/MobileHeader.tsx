import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { Aside } from "../../aside/Aside";
import { User } from "../../DashboardHeader/DashboardHeader";
import "./mobileHeader.css";

export const MobileHeader = () => {
	const [image, setImage] = useState<string>("");
	const [icon, setIcon] = useState<boolean>(false);

	const setIconFunc = (e: BaseSyntheticEvent) => {
		e.preventDefault();
		setIcon(!icon);
	};

	useEffect(() => {
		const user = localStorage.getItem("user");

		if (user) {
			const userData = JSON.parse(user) as unknown as User;
			setImage(userData.avatar);
		}
	}, []);
	return (
		<div>
			<nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
				<div className='flex flex-wrap justify-between items-center'>
					<div className='flex justify-start items-center'>
						<button onClick={setIconFunc}>
							{!icon ? (
								<i className='fa-solid fa-bars text-white text-xl'></i>
							) : (
								<i className='fa-solid fa-xmark text-white text-xl'></i>
							)}
						</button>
					</div>
					<div className='flex items-center lg:order-2'>
						<button
							type='button'
							className='flex mx-3 text-sm bg-white rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
							id='user-menu-button'
							aria-expanded='false'
							data-dropdown-toggle='dropdown'
						>
							<span className='sr-only'>Open user menu</span>
							<img
								className='w-8 h-8 rounded-full'
								src={
									image
										? image
										: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
								}
								alt='user '
							/>
						</button>
					</div>
				</div>
			</nav>
			<div className='w-56 absolute left-0'>{icon && <Aside />}</div>
		</div>
	);
};
