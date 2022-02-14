import { React, useState, createContext } from 'react';
const dataContext = createContext();
export const DataProvider = ({ children }) => {
	const [checkin, setCheckin] = useState(false);
	const [checkout, setCheckout] = useState(false);
	const [checkinTime, setCheckinTime] = useState('');
	const [checkoutTime, setCheckoutTime] = useState('');
	const [checkinDate, setCheckinDate] = useState(false);
	const [checkoutDate, setCheckoutDate] = useState(false);

	const [info, setInfo] = useState(() => {
		let localStorageItem = JSON.parse(localStorage.getItem('info'));
		if (localStorageItem === null) {
			return [];
		} else return localStorageItem;
	});
	const [loggedUser, setloggedUser] = useState({});
	return (
		<dataContext.Provider
			value={{
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
				loggedUser,
				setloggedUser,
			}}
		>
			{children}
		</dataContext.Provider>
	);
};
export default dataContext;
