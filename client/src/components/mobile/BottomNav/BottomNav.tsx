import React from "react";
import { Link } from "react-router-dom";
import "./bottomNav.css";

export const BottomNav = () => {
	return (
		<div>
			<nav className='mobile-nav'>
				<Link to='/' className='bloc-icon'>
					<i className='fa-solid fa-house'></i>
				</Link>
				<Link to='/' className='bloc-icon'>
					<i className='fa-solid fa-user'></i>
				</Link>
				<Link to='/' className='bloc-icon'>
					<i className='fa-solid fa-users'></i>
				</Link>
				<Link to='/' className='bloc-icon'>
					<i className='fa-brands fa-discourse'></i>
				</Link>
				<Link to='/settings' className='bloc-icon'>
					<i className='fa-solid fa-gear'></i>
				</Link>
			</nav>
		</div>
	);
};
