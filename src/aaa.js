import React, { useState } from 'react';
import Dropdown from './Dropdown';

export default function App() {
	const [errorMesssage, setErrorMessage] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [status, setStatus] = useState('');
	const [info, setInfo] = useState([]);

	const option = [
		{ label: 'checkin', value: 'checkin' },
		{ label: 'checkout', value: 'checkout' },
	];
	const renderErrorMessage = (name) =>
		name === errorMesssage.name && (
			<div className='error'>{errorMesssage.message}</div>
		);
	const store = (userInformation) => {
		localStorage.setItem('userInformation', JSON.stringify(userInformation));
	};
	function showTime() {
		let time = new Date();
		let hour = time.getHours();
		let min = time.getMinutes();
		let sec = time.getSeconds();
		let am_pm = 'AM';
		if (hour > 12) {
			hour -= 12;
			am_pm = 'PM';
		} else if (hour === 0) {
			hour = 12;
			am_pm = 'AM';
		}
		hour = hour < 10 ? '0' + hour : hour;
		min = min < 10 ? '0' + min : min;
		sec = sec < 10 ? '0' + sec : sec;

		let currentTime = hour + ':' + min + ':' + sec + ' ' + am_pm;
		return currentTime;
	}
	const handleSubmit = (event) => {
		event.preventDefault();

		var { username, password } = document.forms[0];
		const userData = database.find((user) => user.username === username.value);
		if (userData) {
			if (userData.password !== password.value) {
				setErrorMessage({
					name: 'password',
					message: errors.password,
				});
				console.log(errorMesssage);
			} else {
				setIsSubmitted(true);
				const username = userData.username;
				const time = showTime();
				setInfo({
					username: { username },
					status: { status },
					time: { time },
				});
				console.log(info);
				// var userInformation = {
				// 	username: { username },
				// 	status: { status },
				// 	time: { time },
				// };

				// // info.push(userInformation);
				// // setInfo(info);
				// const updatedInformation = [...info, userInformation];
				// console.log(updatedInformation)
				// setInfo("updatedInformation");
				// store(updatedInformation)
				// console.log(info);
			}
		} else {
			setErrorMessage({
				name: 'username',
				message: errors.username,
			});
			console.log(errorMesssage);
		}
	};
	const database = [
		{
			username: 'user1',
			password: 'pass1',
		},
		{
			username: 'user2',
			password: 'pass2',
		},
	];
	const errors = {
		username: 'INVALID USERNAME!',
		password: 'INVALID PASSWORD!',
	};

	const renderForm = (
		<div className='form'>
			<form onSubmit={handleSubmit}>
				<div className='input-container'>
					<label> Username</label>
					<input type='text' name='username' required></input>
					{renderErrorMessage('username')}
				</div>
				<div className='input-container'>
					<label>Password</label>
					<input type='password' name='password' required></input>
					{renderErrorMessage('password')}
				</div>

				<Dropdown option={option} status={status} setStatus={setStatus} />
				<div className='button-container'>
					<input type='submit'></input>
				</div>
			</form>
		</div>
	);

	return (
		<div className='app'>
			<div className='login-form'>
				<div className='title'>Sign In</div>
				{isSubmitted ? <div> User is successfully logged in </div> : renderForm}
			</div>
		</div>
	);
}
