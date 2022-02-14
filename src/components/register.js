import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import dataContext from '../globalContext';
import AttendanceForm from './AttendanceForm';
export default function Register() {
	const { register, handleSubmit, reset } = useForm({
		mode: 'onChange',
	});
	const [activeLogin, setActiveLogin] = useState(true);
	const { info, loggedUser, setloggedUser } = useContext(dataContext);
	useEffect(() => {
		localStorage.setItem('info', JSON.stringify(info));
	}, [info]);

	console.log(info);

	const onSubmit = (data) => {
		console.log(info[0].username);
		const loggedUser = info.filter((info) => info.username === data.username);
		setloggedUser(loggedUser);
		reset();
	};
	console.log(loggedUser);
	const toggle = () => {
		setActiveLogin(!activeLogin);
		console.log(activeLogin);
	};

	const loginForm = (
		<div className='form'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor='username'>Username</label>
					<div className='input-wrapper'>
						<input
							type='text'
							required={true}
							{...register('username', { required: true })}
						/>
					</div>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<div className='input-wrapper'>
						<input
							type='password'
							required={true}
							{...register('password', { required: true })}
						/>
					</div>
				</div>
				<div>
					<Link to='/dashboard'>
						<button className='btn' type='submit'>
							Login
						</button>
					</Link>
				</div>
			</form>
		</div>
	);

	function Brief() {
		if (activeLogin) {
			const brief = (
				<div className='container'>
					<div className='description-container '>
						<div className='description '>
							<h1>Submit Your Attendance</h1>
							<div>
								<button className='description-btn' onClick={toggle}>
									Submit Attendance
								</button>
							</div>
						</div>
					</div>
					<div className='login-form'>{loginForm}</div>
				</div>
			);
			return brief;
		} else if (!activeLogin) {
			const brief = (
				<div className='container'>
					<div className='description-container '>
						<div className='description '>
							<h1>Welcome Back !</h1>
							<div>Login to view the records</div>
							<div>
								<button className='description-btn' onClick={toggle}>
									Login
								</button>
							</div>
						</div>
					</div>
					<div className='login-form'>
						<AttendanceForm />
					</div>
				</div>
			);
			return brief;
		}
	}

	return (
		<div className='wrapper'>
			<div className='brief'>{Brief()}</div>
		</div>
	);
}
