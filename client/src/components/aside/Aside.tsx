import React, { BaseSyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./aside.css";

export const Aside = () => {
	const navigate = useNavigate();

	const onClick = (e: BaseSyntheticEvent) => {
		e.preventDefault();
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div>
			<aside className='h-full' aria-label='Sidenav'>
				<div className='overflow-y-auto py-5 px-3 h-screen bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
					<ul className='space-y-2'>
						<li>
							<Link
								to='/'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
							>
								<svg
									aria-hidden='true'
									className='w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
									<path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
								</svg>
								<span className='ml-3'>Profile</span>
							</Link>
						</li>
						<li>
							<button
								type='button'
								className='flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
								aria-controls='dropdown-pages'
								data-collapse-toggle='dropdown-pages'
							>
								<svg
									aria-hidden='true'
									className='flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z'
										clipRule='evenodd'
									></path>
								</svg>
								<span className='flex-1 ml-3 text-left whitespace-nowrap'>
									Buddies
								</span>
							</button>
						</li>
						<li>
							<button
								type='button'
								className='flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
								aria-controls='dropdown-sales'
								data-collapse-toggle='dropdown-sales'
							>
								<svg
									aria-hidden='true'
									className='flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
										clipRule='evenodd'
									></path>
								</svg>
								<span className='flex-1 ml-3 text-left whitespace-nowrap'>
									Discover
								</span>
							</button>
						</li>
					</ul>
					<ul className='pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700'>
						<li>
							<Link
								to='#'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'
							>
								<svg
									aria-hidden='true'
									className='flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
									<path
										fillRule='evenodd'
										d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
										clipRule='evenodd'
									></path>
								</svg>
								<span className='ml-3'>Docs</span>
							</Link>
						</li>
						<li>
							<Link
								to='#'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'
							>
								<svg
									aria-hidden='true'
									className='flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z'></path>
								</svg>
								<span className='ml-3'>Components</span>
							</Link>
						</li>
						<li>
							<Link
								to='/settings'
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'
							>
								<svg
									aria-hidden='true'
									className='flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z'
										clipRule='evenodd'
									></path>
								</svg>
								<span className='ml-3'>Settings & Privacy</span>
							</Link>
						</li>
						<li>
							<button
								onClick={onClick}
								className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'
							>
								<i className='fa-solid fa-power-off lex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white items-center justify-center'></i>
								<span className='ml-3'>Logout</span>
							</button>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	);
};
