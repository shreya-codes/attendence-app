import React from 'react';
export default function Dropdown({option,status,setStatus}) {
	
    	const handleStatus = (event) => {
				setStatus(event.target.value);
			};
	return (
		<div className='status'>
			<label>
				status
				<select value={status} onChange={handleStatus}>
					{option.map((option,key) => (
						<option key={key} value={option.value}>{option.value}</option>
					))}
				</select>
			</label>
			<p>{status}</p>
		</div>
	);
}
