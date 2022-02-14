import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import dataContext from '../globalContext';
export default function AttendanceForm() {
	const { register, handleSubmit, reset } = useForm({
		mode: 'onChange',
	});

	const {
		checkin,
		setCheckin,
		checkout,
		setCheckout,
		checkinTime,
		setCheckinTime,
		checkoutTime,
		setCheckoutTime,
		checkinDate,
		setCheckinDate,
		checkoutDate,
		setCheckoutDate,
		info,
		setInfo,
	} = useContext(dataContext);
	useEffect(() => {
		localStorage.setItem('info', JSON.stringify(info));
	}, [info]);
	function findStatus() {
		let status;
		if (checkin && checkout) {
			status = 'Present';
		} else if (!checkin && !checkout) {
			status = 'Absent';
		} else {
			status = 'Missed';
		}
		return status;
	}

	const onSubmit = (data) => {
		const status = findStatus();

		let userInformation = {
			username: data.username,
			password: data.password,
			checkin: checkin,
			checkout: checkout,
			checkinTime: checkinTime,
			checkoutTime: checkoutTime,
			checkinDate: checkinDate,
			checkoutDate: checkoutDate,
			status: status,
		};
		setInfo((info) => [...info, userInformation]);
		setCheckin(false)
		setCheckout(false)
		reset();
	};

	function showTime() {
		let time = new Date();
		const date =
			time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear();
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
		let timeDate = {
			time: hour + ':' + min + ':' + sec + ' ' + am_pm,
			date: date,
		};
		return timeDate;
	}
	const handleCheckin = () => {
		setCheckin(!checkin);
		setCheckinTime(showTime().time);
		setCheckinDate(showTime().date);
	};
	const handleCheckOut = () => {
		setCheckout(!checkout);
		setCheckoutTime(showTime().time);
		setCheckoutDate(showTime().date);
	};
	const renderForm = (
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
					<div onClick={handleCheckin}>
						{!checkin && (
							<div>
								<button className='check' type='submit'>
									{' '}
								</button>
								<span>Check In</span>
							</div>
						)}
					</div>
					{checkin && <div> check in at {checkinTime} </div>}
					<div onClick={handleCheckOut}>
						{checkin && !checkout && (
							<div>
								<button className='check' type='submit'>
									{' '}
								</button>
								<span>Check Out</span>
							</div>
						)}
					</div>
					{checkout && <div> check out at {checkoutTime} </div>}
				</div>

				<div>
					<button className='btn' type='submit'>
						Submit Attendence
					</button>
				</div>
			</form>
		</div>
	);

	return (
		<div className='app'>
			<div className='login-form'>{renderForm}</div>
		</div>
	);
}
