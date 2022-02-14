import React, { useContext } from 'react';
import dataContext from '../globalContext';

export default function Dashboard() {
	const { info } = useContext(dataContext);
	function tableContent() {
		if (info.length === 0) {
			return <h1 className='container norec'> No records to show</h1>;
		} else {
			return (
				<table>
					<thead>
						<tr>
							<th>Username</th>
							<th> Checkin Time</th>
							<th>CheckOut Time</th>
							<th>Status</th>
						</tr>
					</thead>

					{info.map((val, key) => {
						return (
							<tbody key={key}>
								<tr>
									<td>{val.username}</td>
									<td>{val.checkinTime}</td>
									<td>{val.checkoutTime}</td>
									<td> {val.status} </td>
								</tr>
							</tbody>
						);
					})}
				</table>
			);
		}
	}
	console.log(info);
	if (info.length === 0) {
		console.log('dasf');
	} else {
		console.log('as');
	}
	return (
		<div className='dash-container'>
			<div className='Dashboard'>{tableContent()}</div>
		</div>
	);
}
