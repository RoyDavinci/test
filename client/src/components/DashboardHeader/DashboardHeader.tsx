import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultLogo } from "../../images";

export interface User {
	id: string;
	email: string;
	phone: string;
	interest: string;
	name: string;
	avatar: string;
	isVerified: boolean;
}

export const DashboardHeader = () => {
	const [image, setImage] = useState<string>("");

	useEffect(() => {
		const user = localStorage.getItem("user");

		if (user) {
			const userData = JSON.parse(user) as unknown as User;
			setImage(userData.avatar);
		}
	}, []);

	console.log(image);

	return (
		<header>
			<nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800'>
				<div className='flex flex-wrap justify-between items-center'>
					<div className='flex justify-start items-center'>
						<button
							id='toggleSidebar'
							aria-expanded='true'
							aria-controls='sidebar'
							className='hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'
						>
							<svg
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
									clipRule='evenodd'
								></path>
							</svg>
						</button>
						<Link to='https://flowbite.com' className='flex mr-4'>
							<img
								src='https://flowbite.s3.amazonaws.com/logo.svg'
								className='mr-3 h-8'
								alt='FlowBite Logo'
							/>
							<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
								Flowbite
							</span>
						</Link>
					</div>
					<div className='flex items-center lg:order-2'>
						<button
							id=''
							type='button'
							className='p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
						>
							<span className='sr-only'>Search</span>

							<svg
								aria-hidden='true'
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
									clipRule='evenodd'
								></path>
							</svg>
						</button>

						<button
							type='button'
							data-dropdown-toggle='notification-dropdown'
							className='p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
						>
							<span className='sr-only'>View notifications</span>

							<svg
								aria-hidden='true'
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z'></path>
							</svg>
						</button>
						<button
							type='button'
							data-dropdown-toggle='apps-dropdown'
							className='p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
						>
							<span className='sr-only'>View notifications</span>

							<svg
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
							</svg>
						</button>

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
								src={image ? image : defaultLogo}
								alt='user '
							/>
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};
