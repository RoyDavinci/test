import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
	Login,
	Error,
	Dashboard,
	Settings,
	Create,
	Verify,
	Email,
} from "./pages";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Dashboard />,
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "*",
			element: <Error />,
		},
		{
			path: "/settings",
			element: <Settings />,
		},
		{
			path: "/signup",
			element: <Create />,
		},
		{
			path: "/verify",
			element: <Verify />,
		},
		{
			path: "/verify/email",
			element: <Email />,
		},
	]);
	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
