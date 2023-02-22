import React, { useCallback, useEffect, useState } from "react";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Aside, DashboardHeader } from "../../components";
import { User } from "../../components/DashboardHeader/DashboardHeader";
import { BottomNav, MobileHeader } from "../../components/mobile";

export const Dashboard = () => {
	const [user, setUser] = useState<User>();

	const navigate = useNavigate();

	const getData = useCallback(() => {
		const data = localStorage.getItem("user");
		if (!data) {
			navigate("/login");
		} else {
			const userData = JSON.parse(data) as unknown as User;
			setUser(userData);
		}
	}, [navigate]);

	useEffect(() => {
		getData();
		return () => {
			console.log("cleanup useEffect");
		};
	}, [getData]);

	console.log(user);

	return (
		<div className='dashboard__container'>
			<div className='mobileScreenContainer'>
				<MobileHeader />
				<div className='mobile__dashboardCenter'>
					<div className='flex justify-between items-center p-2'>
						<h1>Profile </h1>
						{!user?.isVerified && (
							<Link to='/verify' className='dashboard__SectionCenter__button'>
								Verify Account
							</Link>
						)}
					</div>
					<p className='p-2'>Here are your initial Details</p>
					<div>
						<article>
							<h3>Username :</h3>
							<p className='border'>{user?.name}</p>
						</article>
						<article>
							<h3>Phone Number: </h3>
							<p className='border'>{user?.phone}</p>
						</article>
						<article>
							<h3>Interests :</h3>
							<p className='border'>{user?.interest}</p>
						</article>
						<article>
							<h3>Email :</h3>
							<p className='border'>{user?.email}</p>
						</article>
						<article>
							<h3>Image :</h3>
							<p>
								<img
									className='w-16 h-16 rounded-full'
									src={
										user?.avatar
											? user.avatar
											: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
									}
									alt=''
								/>
							</p>
						</article>
					</div>
				</div>
				<BottomNav />
			</div>
			<div className='bigScreen__container'>
				<DashboardHeader />
				<section className='dashboard__SectionCenter'>
					<Aside />
					<div>
						<div className='flex justify-between items-center'>
							<h1>Profile </h1>
							{!user?.isVerified && (
								<Link to='/verify' className='dashboard__SectionCenter__button'>
									Verify Account
								</Link>
							)}
						</div>
						<p>Here are your initial Details</p>
						<div>
							<article>
								<h3>Username :</h3>
								<p className='border'>{user?.name}</p>
							</article>
							<article>
								<h3>Phone Number: </h3>
								<p className='border'>{user?.phone}</p>
							</article>
							<article>
								<h3>Interests :</h3>
								<p className='border'>{user?.interest}</p>
							</article>
							<article>
								<h3>Email :</h3>
								<p className='border'>{user?.email}</p>
							</article>
							<article>
								<h3>Image :</h3>
								<p>
									<img
										className='w-16 h-16 rounded-full'
										src={
											user?.avatar
												? user.avatar
												: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
										}
										alt=''
									/>
								</p>
							</article>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};
