import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { Aside, DashboardHeader } from "../../components";

export const Dashboard = () => {
	const [user, setUser] = useState<string | null>("");

	const navigate = useNavigate();

	useEffect(() => {
		const data = localStorage.getItem("user");
		if (!data) {
			navigate("/login");
		}
		setUser(data);

		return () => {
			console.log("cleanup useEffect");
		};
	}, [user, navigate]);

	return (
		<div>
			<DashboardHeader />
			<Aside />
		</div>
	);
};
