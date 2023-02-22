import React, { useEffect, useMemo } from "react";
import "./email.css";
import { RevolvingDot } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { UserInterface } from "../../interfaces/login";

export const Email = () => {
	const location = useLocation();
	const searchParams = useMemo(
		() => new URLSearchParams(location.search),
		[location.search]
	);

	const navigate = useNavigate();

	useEffect(() => {
		const getVerification = async () => {
			const token = searchParams.get("token");
			if (token) {
				console.log(token);
				try {
					const data = await fetch(
						"http://localhost:3650/api/v1/user/verify-email-token",
						{
							method: "POST",
							headers: { Authorization: `Bearer ${token}` },
						}
					);
					const response = (await data.json()) as unknown as UserInterface;
					if (response.success) {
						localStorage.removeItem("user");
						localStorage.setItem("user", JSON.stringify(response.user));
						navigate("/");
					}
					console.log(response);
				} catch (error) {
					console.log(error);
				}
			}
		};
		getVerification();

		return () => {
			console.log("clear search");
		};
	}, [navigate, searchParams]);
	return (
		<div className='revolving__divContainer'>
			<h1>Verifying Email, Please Wait...</h1>
			<RevolvingDot
				height='300'
				width='300'
				color='#4fa94d'
				secondaryColor=''
				ariaLabel='revolving-dot-loading'
				wrapperStyle={{}}
				wrapperClass=''
				visible={true}
			/>
		</div>
	);
};
