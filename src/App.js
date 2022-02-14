import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider } from './globalContext';
import Register from './components/register';
import Attendance from './components/AttendanceForm';
import Dashboard from './components/Dashboard';
import './App.css';
import '../src/styles/style.css';
export default function App() {
	return (
		<DataProvider>
			<div className='App'>
				<Router>
					<Routes>
						<Route path='/' exact element={<Register />} />
						<Route path='/attendance' element={<Attendance />} />
						<Route path='/dashboard' element={<Dashboard />} />
					</Routes>
				</Router>
			</div>
		</DataProvider>
	);
}
